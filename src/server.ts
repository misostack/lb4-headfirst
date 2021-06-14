import express from 'express';
import {ApplicationConfig, Lb4HeadfirstApplication} from './application';

export {ApplicationConfig};

export class ExpressServer {
  public readonly app: express.Application;
  public readonly lbApp: Lb4HeadfirstApplication;

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.lbApp = new Lb4HeadfirstApplication(options);
    this.app.use('/v1', this.lbApp.requestHandler);
  }
}
