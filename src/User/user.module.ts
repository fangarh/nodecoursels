import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserService } from './user.service'
import { UserSchema } from './schema/user.schema'
import { AccessSchema } from './schema/access.schema'

@Module({
    imports: [MongooseModule.forFeature([{ name: "ACL", schema: AccessSchema }, { name: "User", schema: UserSchema }])],
    providers: [UserService],
    controllers: [],
    exports: [UserService]
})
export class UserModule {

}