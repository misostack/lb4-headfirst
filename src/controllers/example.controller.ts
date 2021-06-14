// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {api, get, RequestContext, RestBindings} from '@loopback/rest';
import path from 'path';

@api({basePath: '/example'})
export class ExampleController {
  constructor(
    // @inject(RestBindings.Http.REQUEST) private request: Request,
    // @inject(RestBindings.Http.RESPONSE) private response: Response,
    @inject(RestBindings.Http.CONTEXT) private requestCtx: RequestContext,
    @inject('basePath') private basePath: string,
  ) {}
  @get('')
  home() {
    const {request, response} = this.requestCtx;
    response.set('Content-Type', 'text/html');
    response.send(
      Buffer.from(`
    <!doctype html>
    <html lang="en">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">

        <title>Hello, world!</title>
      </head>
      <body>
        <h1>Hello, world!</h1>
        <p>${this.basePath}</p>
        <p><a class="btn btn-primary" href="/example/1.pdf">DOWNLOAD</a></p>

        <!-- Optional JavaScript; choose one of the two! -->

        <!-- Option 1: Bootstrap Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>

        <!-- Option 2: Separate Popper and Bootstrap JS -->
        <!--
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>
        -->
      </body>
    </html>
    `),
    );
    return response;
  }
  @get('/image')
  image() {
    const {request, response} = this.requestCtx;
    response.sendFile(path.resolve(this.basePath, 'uploads', '2phut-logo.png'));
    return response;
  }

  @get('/1.pdf')
  txt() {
    const {request, response} = this.requestCtx;
    response.download(path.resolve(this.basePath, 'uploads', '1.pdf'));
    return response;
  }
}
