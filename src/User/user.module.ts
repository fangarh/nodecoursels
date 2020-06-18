import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserService } from './user.service'
import { UserSchema } from './user.schema'
import { AccessSchema } from './access.schema'

@Module({
    imports: [MongooseModule.forFeature([{ name: "ACL", schema: AccessSchema }, { name: "User", schema: UserSchema }])],
    providers: [UserService],
    controllers: []
})
export class UserModule {

}