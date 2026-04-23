import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    sku: { type: String, required: true, unique: true, trim: true, uppercase: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    title: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: 'General' },
    price: { type: Number },
    imageUrl: { type: String, trim: true },
    imageKey: { type: String, trim: true },
    cta: { type: String, trim: true },
  },
  { timestamps: true, versionKey: false },
)

export const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema, 'products')
