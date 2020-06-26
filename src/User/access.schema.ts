import * as mongo from 'mongoose'

export const AccessSchema = new mongo.Schema({
    C: { type: Boolean, required: true, default: false },
    R: { type: Boolean, required: true, default: false },
    U: { type: Boolean, required: true, default: false },
    D: { type: Boolean, required: true, default: false },
})

AccessSchema.index({ Id: 1 }, { unique: true });