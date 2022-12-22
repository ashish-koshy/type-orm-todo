/* eslint-disable no-console */

import { EnvironmentConfig } from './EnvironmentConfig';
import { TodoDataSource } from './TodoDataSource';

(async () => {
  EnvironmentConfig.initialize();
  await TodoDataSource.buildSchema();
})();
