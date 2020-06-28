import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as ld from 'lodash'

import { IUser } from './model/User';
import { CreateUserDto } from './dto/createuser.dto';
import passport from 'passport';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {
        console.log(this.userModel)
    }

    async create(createUser: CreateUserDto): Promise<IUser> {
        const saltCnt = 10;
        const salt = await bcrypt.genSalt(saltCnt);
        console.log("> >", createUser.password, salt)
        const hash = await bcrypt.hash(createUser.password, salt);
        console.log(hash)
        const newUser = new this.userModel(ld.assignIn(createUser, { password: hash, salt: salt }));
        return await newUser.save();
    }

    async find(userName: string): Promise<IUser> {
        let users = await this.userModel.where('username').equals(userName).exec();
        return users[0];
    }

    async signIn(userName: string, password: string): Promise<IUser> {
        let user: IUser = await this.find(userName);

        console.log("USER: ", user, password)

        if (!user) {
            throw new UnauthorizedException()
        }
        let valid = await this.validatePassword(password, user);
        if (valid === true)
            return user;

        throw new UnauthorizedException();
    }

    async validatePassword(password: string, user: IUser): Promise<boolean> {
        const hash = await bcrypt.hash(password, user.salt)
        return hash === user.password
    }
}