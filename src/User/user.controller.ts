import {
  Controller,
  Get,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

import { TokenService } from '../Auth/token.service';
import { AuthStrategy } from '../Auth/auth.strategy';
import { ResponseUserDto } from '../Model/DTO/User/responseuser.dto';
import { UpdateProfileDto } from '../Model/DTO/User/updateprofile.dto';
import { UserRepository } from '../Repository/user.repository';

@Controller('api')
export class UserController {
  constructor(
    private readonly userService: UserRepository,
    private readonly tokenService: TokenService,
    private readonly strategy: AuthStrategy,
  ) {}

  @Get('profile')
  async getUserProfile(
    @Body('userName') user: string,
  ): Promise<ResponseUserDto> {
    const userObj = await this.userService.find(user);

    return new ResponseUserDto(userObj);
  }

  @Patch('profile')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async updateProfile(
    @UploadedFile() avatar,
    @Body() profile: UpdateProfileDto,
  ): Promise<void> {
    console.log('1:', avatar);

    console.log(profile);
  }
}
