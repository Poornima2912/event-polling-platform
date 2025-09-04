const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  invitedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  pollOptions: [{ option: String, votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] }]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);

