import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as ld from 'lodash'

import { IUser } from './User';
import { CreateUserDto } from './createuser.dto';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {
        console.log(this.userModel)
    }

    async create(createUser: CreateUserDto): Promise<IUser> {
        const saltCnt = 10;
        const salt = await bcrypt.genSalt(saltCnt);
        console.log(">>", createUser.password, salt)
        const hash = await bcrypt.hash(createUser.password, salt);
        console.log(hash)
        const newUser = new this.userModel(ld.assignIn(createUser, { password: hash }));
        return await newUser.save();
    }

    async find(id: string): Promise<IUser> {
        return await this.userModel.findById(id).exec();
    }
}