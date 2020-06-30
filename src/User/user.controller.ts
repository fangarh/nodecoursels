import {
  Controller,
  Get,
  Body,
  Patch,
  Headers,
  UseInterceptors,
  UploadedFile,
  Param,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

import { TokenService } from '../Auth/token.service';

import { ResponseUserDto } from '../Model/DTO/User/responseuser.dto';
import { UpdateProfileDto } from '../Model/DTO/User/updateprofile.dto';
import { UserRepository } from '../Repository/user.repository';
import { UserAclDto } from '../Model/DTO/User/useracl.dto';

@Controller('api')
export class UserController {
  DOMAIN: string;
  constructor(
    private readonly userService: UserRepository,
    private readonly tokenService: TokenService,
  ) {
    this.DOMAIN = process.env.SERVER;
  }

  @Get('profile')
  async getUserProfile(
    @Body('userName') user: string,
  ): Promise<ResponseUserDto> {
    const userObj = await this.userService.find(user);

    return new ResponseUserDto(userObj);
  }

  @Get('users')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async getAllUsers(): Promise<ResponseUserDto[]> {
    return this.userService.getAllUsers();
  }

  @Delete('users/:id')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async deleteUser(@Param() param): Promise<ResponseUserDto[]> {
    await this.userService.deleteUser(param.id);
    return this.userService.getAllUsers();
  }

  @Patch('users/:id/permission')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async updatePermissions(
    @Body() perm: UserAclDto,
    @Param() params,
  ): Promise<ResponseUserDto> {
    return this.userService.updateUserAcl(params.id, perm.permission);
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
    @Headers() headers: any,
    @Body() profile: UpdateProfileDto,
  ): Promise<ResponseUserDto> {
    const user = await this.tokenService.getUserFromPayload(
      headers['authorization'],
    );

    console.log('FROM HEADER: >>> ', headers.host);
    let host = headers.host;

    if (!host.includes('http://')) host = 'http://' + host;
    if (avatar) profile.avatar = host + '/' + avatar.path;

    //console.log(user, profile, avatar.path);
    return new ResponseUserDto(
      await this.userService.updateUserProfile(user, profile),
    );
  }
}
