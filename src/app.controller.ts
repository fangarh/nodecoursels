import { Controller, Get, Redirect, Param, Res } from '@nestjs/common';

const uri = 'http://localhost:3030/';

@Controller()
export class AppController {
  @Get(':data')
  @Redirect(uri)
  redirectToClient(): void {
    return;
  }

  @Get('upload/:data')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  uploadImg(@Param() p: any, @Res() res): any {
    const img = p.data;
    return res.sendFile(img, { root: './upload' });
  }
}
