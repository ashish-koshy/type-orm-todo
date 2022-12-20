/* eslint-disable no-console */

import { createFileSync, existsSync, writeFileSync } from 'fs-extra';
import { DataSource } from 'typeorm';
import { DB_PATH, getDataSource } from './create-connection';

const initializeDatabase = async () => {
  console.log('SQLite database initializing...');
  try {
    const SQLiteDataSource: DataSource | undefined = await getDataSource();
    if (!SQLiteDataSource) return 'SQLite database instance unavailable';
    await SQLiteDataSource?.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NULL,
        emailId TEXT NULL,
        isActive TEXT NULL 
      );`);
    await SQLiteDataSource?.query(
      `INSERT INTO Users VALUES (
        NULL, 
        'Jane', 
        'Doe', 
        'janedoe@abc.com', 
        'false'
      );`
    );
    console.log('SQLite database test query results : ');
    return (await SQLiteDataSource?.query(
      `SELECT * FROM Users WHERE id = 1;`
    )) as unknown[];
  } catch (ex) {
    console.log('SQLite database initialization failed', ex);
    return undefined;
  }
};

(async () => {
  /** Create a dotenv compatible environment config file */
  if (!existsSync('.env')) {
    createFileSync('.env');
    writeFileSync('.env', `# ADD ENVIRONMENT VARIABLES HERE`);
  }

  /** Create a DB if it does not exist */
  if (!existsSync(DB_PATH)) console.log(await initializeDatabase());
  else console.log('SQLite database creation skipped : Already exists...');
})();
