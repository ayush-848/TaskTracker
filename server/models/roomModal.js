const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  roomCode: { type: String, unique: true, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Add creator field
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

roomSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Room', roomSchema);
