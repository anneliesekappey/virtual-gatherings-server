import { Schema, model } from 'mongoose'

const meetingSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'description is required'],
      trim: true,
    },

    days: {
      type: String,
      required: [true, 'meeting days are required'],
    },

    time: {
      type: String,
      required: [true, 'meeting times are required'],
    },

    frequency: {
      type: String,
      lowercase: true,
    },

    price: {
      type: String,
      required: [true, 'price is required'],
      lowercase: true,
    },
  },
  { timestamps: true }
)

export default model('Meeting', meetingSchema)
