/* eslint-disable no-console */
import {
  createFileSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from 'fs-extra';

export abstract class EnvironmentConfig {
  /** Initialize `dotenv` compatible environment config file */
  public static initialize(): void {
    try {
      if (!existsSync('.env')) {
        createFileSync('.env');
        writeFileSync(
          '.env',
          readFileSync('.env.SAMPLE', { encoding: 'utf-8' })
        );
      }
    } catch (e: unknown) {
      console.log('Environment configuration failed', e);
    }
  }
}
