import * as mongo from 'mongoose'

export const NewsSchema = new mongo.Schema({
    Id: { type: mongo.Types.ObjectId, index: true, unique: true, auto: true },
    Title: { type: String, required: true },
    Text: { type: String, required: true },
    CreatedAt: { type: Date, required: true },
    User: {
        firstName: { type: String, required: true },
        id: { type: String, required: true },
        image: { type: String, required: false },
        middleName: { type: String, required: true },
        surName: { type: String, required: false },
        username: { type: String, required: true },
    }
})

NewsSchema.index({ Id: 1 }, { unique: true });