import { Controller, Get, Redirect, Param } from '@nestjs/common';

const uri = 'http://localhost:3030/';

@Controller()
export class AppController {
  @Get(':param')
  @Redirect(uri)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  redirectToClient(@Param() param: any): any {
    console.log(param);
    return uri;
  }

  @Get('/')
  @Redirect(uri)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  redirectToClient1(@Param() param: any): any {
    console.log(param);
    return uri;
  }
}
