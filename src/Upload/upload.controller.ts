import { Get, Param, Res, Controller } from '@nestjs/common';

@Controller('upload')
export class UploadController {
  @Get(':data')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  uploadImg(@Param() p: any, @Res() res): any {
    console.log('!!!');
    const img = p.data;
    return res.sendFile(img, { root: './upload' });
  }
}
