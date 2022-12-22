/* eslint-disable no-console */
import { DeepPartial } from 'typeorm';
import { User } from '../entity/user';
import { TodoDataSource } from '../TodoDataSource';

export abstract class UserData {
  public static async get(data: DeepPartial<User>): Promise<User | undefined> {
    try {
      const ds = await TodoDataSource.initialize();
      const userRepository = ds?.manager?.getRepository(User);
      const user = await userRepository?.findOne({
        where: data,
      });
      return user ? user : undefined;
    } catch (e: unknown) {
      console.log(e);
      return undefined;
    }
  }

  public static async add(data: DeepPartial<User>): Promise<void> {
    try {
      const ds = await TodoDataSource.initialize();
      const user = await UserData.get(data);
      if (user) return;
      const newUser = ds?.manager?.create(User, data);
      await ds?.manager?.save(newUser);
    } catch (e: unknown) {
      console.log(e);
    }
  }
}
