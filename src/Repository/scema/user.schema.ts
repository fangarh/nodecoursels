import * as mongo from 'mongoose';

export const UserSchema = new mongo.Schema({
  id: { type: mongo.Types.ObjectId, index: true, unique: true, auto: true },
  username: { type: String, required: true, unique: true },
  avatar: { type: String, default: null },
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  surName: { type: String, required: false },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  refreshToken: { type: String, required: false },

  token: {
    accessToken: { type: String },
    refreshToken: { type: String },
    accessTokenExpiredAt: { type: Date },
    refreshTokenExpiredAt: { type: Date },
  },

  permissions: {
    chat: {
      C: { type: Boolean, required: true, default: false },
      R: { type: Boolean, required: true, default: false },
      U: { type: Boolean, required: true, default: false },
      D: { type: Boolean, required: true, default: false },
    },
    news: {
      C: { type: Boolean, required: true, default: false },
      R: { type: Boolean, required: true, default: false },
      U: { type: Boolean, required: true, default: false },
      D: { type: Boolean, required: true, default: false },
    },
    settings: {
      C: { type: Boolean, required: true, default: false },
      R: { type: Boolean, required: true, default: false },
      U: { type: Boolean, required: true, default: false },
      D: { type: Boolean, required: true, default: false },
    },
  },
});
