import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'your name is required'],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, 'your last name is required'],
      trim: true,
    },

    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'your email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },

    passwordHash: {
      type: String,
      required: [true, 'password is required'],
    },
  },

  { timestamps: true }
)

export default model('User', userSchema)
