import * as mongo from 'mongoose'
import { AccessSchema } from './access.schema';

export const UserSchema = new mongo.Schema({
    id: { type: mongo.Types.ObjectId, index: true, unique: true, auto: true },
    userName: { type: String, required: true, unique: true },
    avatar: { type: String, default: null },
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: false },
    password: { type: String, required: true },

    token: {
        accessToken: { type: String },
        refreshToken: { type: String },
        accessTokenExpiredAt: { type: Date },
        refreshTokenExpiredAt: { type: Date }
    },

    permissions: {
        chat: { type: AccessSchema, default: { id: new mongo.Types.ObjectId() } },
        news: { type: AccessSchema, default: { id: new mongo.Types.ObjectId() } },
        settings: { type: AccessSchema, default: { id: new mongo.Types.ObjectId() } },
    }
})

