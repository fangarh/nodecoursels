import * as mongo from 'mongoose'

export const UserSchema = new mongo.Schema({
    Id: { type: mongo.Types.ObjectId, required: true },
    UserName: { type: String, required: true },
    Avatar: { type: String, default: null },
    FirstName: { type: String, required: true },
    MiddleName: { type: String, required: false },
    LastName: { type: String, required: false },
    Password: { type: String, required: true },
    Token: {
        accessToken: { type: String },
        refreshToken: { type: String },
        accessTokenExpiredAt: { type: Date },
        refreshTokenExpiredAt: { type: Date }
    },

    Permissions: {
        Chat: { type: mongo.Types.ObjectId, ref: 'AccessSchema' },
        News: { type: mongo.Types.ObjectId, ref: 'AccessSchema' },
        Settings: { type: mongo.Types.ObjectId, ref: 'AccessSchema' }
    }
})

UserSchema.index({ Id: 1 }, { unique: true });