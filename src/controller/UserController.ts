/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id, 10);
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return !user ? 'User is not registered' : user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, age } = request.body;
    const user = Object.assign(new User(), {
      firstName,
      lastName,
      age,
    });
    return this.userRepository.save(user);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id, 10);
    const userToRemove = await this.userRepository.findOneBy({ id });
    if (!userToRemove) return 'User does not exist';
    await this.userRepository.remove(userToRemove);
    return 'User has been removed';
  }
}
