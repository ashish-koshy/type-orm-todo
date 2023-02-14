import dotenv from 'dotenv';

/** Load environment specific configuration */
dotenv.config();

import express, { Express } from 'express';

import { AppDataSource } from './data-source';
import { setupApp } from './setup';

/** Instantiate the express app */
const app: Express = express();

/** Set a global body parser type */
app.use(express.json());

/** Initialize Type-ORM data source */
AppDataSource.initialize()
  /** Setup the express application */
  .then(() => setupApp(app))
  // eslint-disable-next-line no-console
  .catch((error) => console.log(error));
