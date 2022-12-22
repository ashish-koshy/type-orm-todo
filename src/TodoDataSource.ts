/* eslint-disable no-console */

import { ensureFileSync } from 'fs-extra';
import { join } from 'path';
import { DataSource } from 'typeorm';

let dataSource!: DataSource;
const dataSourceType = 'sqlite' as const;
const dataSourcePath = join(__dirname, '../todo.db');

export abstract class TodoDataSource {
  
  public static async initialize(): Promise<DataSource | undefined> {
    try {
      ensureFileSync(dataSourcePath);
      if (!dataSource?.isInitialized) {
        dataSource = new DataSource({
          type: dataSourceType,
          database: dataSourcePath,
        });
        await dataSource?.initialize();
      }
      return dataSource?.isInitialized ? dataSource : undefined;
    } catch (ex) {
      console.log('Datasource initialization failed', ex);
      return undefined;
    }
  }

  public static async seed(): Promise<void> {
    let ds: DataSource | undefined;
    try {
      ds = await TodoDataSource.initialize();
      await ds?.query(`
        CREATE TABLE IF NOT EXISTS Users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstName TEXT NOT NULL,
          lastName TEXT NULL,
          emailId TEXT NULL,
          isActive TEXT NULL 
        );`);
      const seed: unknown[] = await dataSource?.query(`
        SELECT * FROM 
          Users
        WHERE
          firstName="Jane" AND
          lastName="Doe" AND
          emailId="janedoe@abc.com"
      `) || [];
      if (seed?.length === 0) {
        await dataSource?.query(`
          INSERT INTO Users VALUES (
            NULL, 
            'Jane', 
            'Doe', 
            'janedoe@abc.com', 
            'false'
          );`);
        console.log('Datasource seeding successful');
      } else
        console.log('Datasource already seeded');
      await dataSource?.destroy();
    } catch (ex) {
      console.log('Error whille seeding datasource', ex);
    }
  }
}
