import {DefaultSequence, ExpressRequestHandler} from '@loopback/rest';
import helmet from 'helmet'; // For security
import morgan from 'morgan'; // For http access logging

const middlewareList: ExpressRequestHandler[] = [
  helmet({}), // options for helmet is fixed and cannot be changed at runtime
  morgan('combined', {}), // options for morgan is fixed and cannot be changed at runtime
  (req, res, next) => {
    console.error('AAAAAA');

    next();
  },
];

export class MySequence extends DefaultSequence {
  // MUST RECHECK THIS TO PREVENT MISSING OPENAPI.JSON
  // async handle(context: RequestContext): Promise<void> {
  //   try {
  //     const {request, response} = context;
  //     // `this.invokeMiddleware` is an injected function to invoke a list of
  //     // Express middleware handler functions
  //     const finished = await this.invokeMiddleware(context, middlewareList);
  //     if (finished) {
  //       // The http response has already been produced by one of the Express
  //       // middleware. We should not call further actions.
  //       return;
  //     }
  //     const route = this.findRoute(request);
  //     const args = await this.parseParams(request, route);
  //     const result = await this.invoke(route, args);
  //     this.send(response, result);
  //   } catch (error) {
  //     this.reject(context, error);
  //   }
  // }
}
