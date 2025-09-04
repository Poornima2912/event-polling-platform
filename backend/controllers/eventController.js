const Event = require('../models/Event');

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, invitedUsers, pollOptions } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      createdBy: req.user._id,
      invitedUsers,
      pollOptions: pollOptions.map(option => ({ option, votes: [] }))
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

// Vote on a poll option
const voteOnPoll = async (req, res) => {
  try {
    const { eventId, selectedOption } = req.body;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Check if user already voted
    const alreadyVoted = event.pollOptions.some(opt =>
      opt.votes.includes(userId)
    );
    if (alreadyVoted) return res.status(400).json({ message: 'User already voted' });

    // Add vote
    const option = event.pollOptions.find(opt => opt.option === selectedOption);
    if (!option) return res.status(400).json({ message: 'Invalid option' });

    option.votes.push(userId);
    await event.save();

    res.status(200).json({ message: 'Vote recorded', event });
  } catch (error) {
    res.status(500).json({ message: 'Error voting', error });
  }
};

module.exports = {
  createEvent,
  voteOnPoll
};
