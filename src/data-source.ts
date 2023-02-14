import { join } from 'path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/user';

const dataSourcePath = join(__dirname, '../db.sqlite');

export const AppDataSource = new DataSource({
  database: dataSourcePath,
  type: 'sqlite',
  logging: true,
  synchronize: true,
  entities: [User],
  migrations: [],
  subscribers: [],
});
