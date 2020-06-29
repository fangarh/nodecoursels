import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as ld from 'lodash';

import { User } from '../Model/User/User';
import { CreateUserDto } from '../Model/DTO/User/createuser.dto';
import { UpdateProfileDto } from '../Model/DTO/User/updateprofile.dto';
import { ResponseUserDto } from '../Model/DTO/User/responseuser.dto';
import { Permissions } from '../Model/User/ACL';

@Injectable()
export class UserRepository {
  saltCnt = 10;
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    console.log(this.userModel);
  }

  async create(createUser: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(this.saltCnt);
    console.log('>>', createUser.password, salt);
    const hash = await bcrypt.hash(createUser.password, salt);
    console.log(hash);
    const newUser = new this.userModel(
      ld.assignIn(createUser, { password: hash, salt: salt }),
    );
    return await newUser.save();
  }

  async find(userName: string): Promise<User> {
    const users = await this.userModel
      .where('username')
      .equals(userName)
      .exec();
    return users[0];
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userModel.findOne({ id: id }).exec();
    user.remove();
  }

  async updateUserAcl(id: string, acl: Permissions): Promise<ResponseUserDto> {
    const user = await this.userModel.findOne({ id: id }).exec();

    console.log(user.permissions.chat, acl);

    user.permissions = acl;

    console.log('User:', user.permissions);

    await user.save();

    return new ResponseUserDto(user);
  }

  async getAllUsers(): Promise<ResponseUserDto[]> {
    const allUsers = await this.userModel.find({}).exec();
    const resultSet = [];

    allUsers.forEach(elm => resultSet.push(new ResponseUserDto(elm)));

    return resultSet;
  }

  async signIn(userName: string, password: string): Promise<User> {
    const user: User = await this.find(userName);

    console.log('USER: ', user, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    const valid = await this.validatePassword(password, user);
    if (valid === true) return user;

    throw new UnauthorizedException();
  }

  async validatePassword(password: string, user: User): Promise<boolean> {
    const hash = await bcrypt.hash(password, user.salt);
    return hash === user.password;
  }

  async updateUserProfile(
    user: string,
    newData: UpdateProfileDto,
  ): Promise<User> {
    const userData = await this.userModel.findOne({ username: user }).exec();
    const newSalt = await bcrypt.genSalt(this.saltCnt);

    userData.firstName = newData.firstName;
    userData.surName = newData.surName;
    userData.middleName = newData.middleName;

    if (newData.newPassword !== newData.oldPassword) {
      userData.password = await bcrypt.hash(newData.newPassword, newSalt);
      userData.salt = newSalt;
    }
    //userData.permissions.
    if (newData.avatar) userData.avatar = newData.avatar;

    await userData.save();

    return userData;
  }
}
