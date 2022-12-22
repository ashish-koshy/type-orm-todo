/* eslint-disable no-console */
import { DeepPartial } from 'typeorm';
import { UserData } from './data/user';
import { User } from './entity/user';

const dummyUser: DeepPartial<User> = {
  firstName: 'Jane',
  lastName: 'Doe',
  emailId: 'janedoe@example.com',
};

(async () => {
  try {
    await UserData.add(dummyUser);
    const readUser = await UserData.get({ emailId: 'janedoe@example.com' });
    console.log(readUser);
  } catch (e: unknown) {
    console.log(e);
  }
})();
