/* eslint-disable no-console */
import { createFileSync, existsSync, writeFileSync } from 'fs-extra';

export abstract class EnvironmentConfig {
  /** Initialize `dotenv` compatible environment config file */
  public static initialize(): void {
    try {
      if (!existsSync('.env')) {
        createFileSync('.env');
        writeFileSync('.env', `# ADD ENVIRONMENT VARIABLES HERE`);
      }
    } catch(e: unknown) {
      console.log('Environment configuration failed', e);
    }
  }
}
