/* eslint-disable no-console */
import { DeepPartial } from 'typeorm';
import { UserData } from './data/user';
import { User } from './entity/user';

import dotenv from 'dotenv';
const parsedConfig = dotenv.config()?.parsed || {};

const dummyUser: DeepPartial<User> = {
  firstName: 'Jane',
  lastName: 'Doe',
  emailId: 'janedoe@example.com',
};

const getUser = async (emailId: string) => {
  try {
    await UserData.add(dummyUser);
    return (await UserData.get({ emailId })) || {};
  } catch (e: unknown) {
    console.log(e);
    return {};
  }
};

import express from 'express';
const app = express();

app.set('json spaces', 2);

app.get('/', (req, res) => res.send('Hello Todo ORM!'));

app.get('/users', (req, res) => {
  getUser('janedoe@example.com')
    .then((data) => res.json(data))
    .catch(() => res.json({}));
});

const listenPort =
  parseInt(parsedConfig['EXPRESS_SERVER_LISTEN_PORT'], 10) || 3000;

app.listen(listenPort);

console.log(`Express started on port : ${listenPort}`);
