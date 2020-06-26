import * as mongo from 'mongoose'

export const NewsSchema = new mongo.Schema({
    Id: { type: mongo.Types.ObjectId, index: true, unique: true, auto: true },
    Title: { type: String, required: true },
    Text: { type: String, required: true }
})

NewsSchema.index({ Id: 1 }, { unique: true });