/* eslint-disable no-console */

import { createFileSync } from 'fs-extra';
import { join } from 'path';
import { DataSource } from 'typeorm';

export const DB_TYPE = 'sqlite';
export const DB_PATH = join(__dirname, '../todo.db');
export const getDataSource = async () => {
  try {
    createFileSync(DB_PATH);
    const SQLiteDataSource = new DataSource({
      type: DB_TYPE,
      database: DB_PATH,
    });
    await SQLiteDataSource.initialize();
    return SQLiteDataSource.isInitialized ? SQLiteDataSource : undefined;
  } catch (ex) {
    console.log('SQLite database creation failed', ex);
    return undefined;
  }
};
