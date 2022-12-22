/* eslint-disable no-console */

import { ensureFileSync, readFileSync } from 'fs-extra';
import { join } from 'path';
import { DataSource } from 'typeorm';

import dotenv from 'dotenv';
const parsedConfig = dotenv.config()?.parsed || {};

let dataSource!: DataSource;
const dataSourcePath = join(__dirname, '../todo.db');

export abstract class TodoDataSource {
  public static async initialize(): Promise<DataSource | undefined> {
    try {
      ensureFileSync(dataSourcePath);
      if (!dataSource?.isInitialized) {
        dataSource = new DataSource({
          database: dataSourcePath,
          type: 'sqlite',
          logging: parsedConfig['ENABLE_DATASOURCE_LOGS'] === 'true',
          synchronize:
            parsedConfig['ENABLE_DATASOURCE_SYNCHRONIZATION'] === 'true',
          entities: [`${join(__dirname, '/entity/**.ts')}`],
          migrations: [`${join(__dirname, '/migrations/**.ts')}`],
        });
        await dataSource?.initialize();
      }
      return dataSource?.isInitialized ? dataSource : undefined;
    } catch (ex) {
      console.log('Datasource initialization failed', ex);
      return undefined;
    }
  }

  public static async buildSchema(): Promise<void> {
    let ds: DataSource | undefined;
    try {
      ds = await TodoDataSource.initialize();
      const schema = readFileSync(join(__dirname, '/TodoSchema.sql'), {
        encoding: 'utf-8',
      });
      await ds?.query(schema);
      console.log('Datasource schema build successful');
      await dataSource?.destroy();
    } catch (ex) {
      console.log('Datasource schema build unsuccessful', ex);
    }
  }
}
