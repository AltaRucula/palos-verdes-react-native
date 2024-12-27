import { model, Schema } from 'mongoose';

export default model(
  'Claim',
  new Schema(
    {
      author: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
      },
      content: {
        type: String,
        required: true,
      },
      tags: [String],
      title: {
        type: String,
        required: true,
      },
      votes: {
        type: Number,
        required: false,
      },
      messages: [{
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: () => Date.now(),
          immutable: true,
        },
      }]
    },
    {
      id: true,
      toJSON: {
        transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
        },
      },
    }
  )
);
