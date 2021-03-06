const { Schema } = require('mongoose');

const volumeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    book: { type: Schema.Types.ObjectId, required: true },
    chapters: [{ type: Schema.Types.ObjectId }],
    volNumber: { type: Schema.Types.Number, default: 0 },
    cover: { type: String, required: true },
    releaseTime: { type: Schema.Types.Date },
    created_at: { type: Schema.Types.Date, default: Date.now },
    available: { type: Schema.Types.Boolean, default: true },
    timerAvailable: { type: Schema.Types.Date },
    downloadFolder: { type: String },
  },
  { versionKey: false, timestamps: { updatedAt: 'updated_at' } },
);

module.exports = volumeSchema;
