import { join } from 'path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

const dataSourcePath = join(__dirname, '../database.sqlite');

export const AppDataSource = new DataSource({
  database: dataSourcePath,
  type: 'sqlite',
  logging: true,
  synchronize: true,
  entities: [User],
  migrations: [],
  subscribers: [],
});
