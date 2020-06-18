import * as mongo from 'mongoose'

export const AccessSchema = new mongo.Schema({
    Id: { type: mongo.Types.ObjectId, required: true },
    Create: { type: Boolean, required: true, default: false },
    Read: { type: Boolean, required: true, default: false },
    Update: { type: Boolean, required: true, default: false },
    Delete: { type: Boolean, required: true, default: false },
})

AccessSchema.index({ Id: 1 }, { unique: true });