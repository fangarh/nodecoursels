import { Controller, Get, Redirect } from '@nestjs/common';

const uri = 'http://localhost:3030/';

@Controller()
export class AppController {
  @Get(':data')
  @Redirect(uri)
  redirectToClient(): void {
    return;
  }
}
