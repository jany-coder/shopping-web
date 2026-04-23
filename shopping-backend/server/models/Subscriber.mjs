import mongoose from 'mongoose'

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    subscribedAt: { type: Date, default: Date.now },
  },
  { timestamps: false, versionKey: false },
)

export const Subscriber =
  mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema, 'subscriber')
