/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Express, Request, Response } from 'express';
import { Routes } from './routes';

const port = process?.env?.EXPRESS_SERVER_LISTEN_PORT || 3000;

/** Setup express app here */
export const setupApp = (app: Express) => {
  /** Register express routes from defined application routes */
  Routes.forEach((route) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
    (app as any)[route.method](
      route.route,
      (req: Request, res: Response, next: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
        const result = new (route.controller as any)()[route.action](
          req,
          res,
          next
        );
        if (result instanceof Promise)
          result.then((result) =>
            result !== null && result !== undefined
              ? res.send(result)
              : undefined
          );
        else if (result !== null && result !== undefined) res.json(result);
      }
    );
  });

  /** Start express server */
  app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`
    Express server has started on port ${port}. 
    Open 'http://localhost:${port}/users' to see results
  `);
};
