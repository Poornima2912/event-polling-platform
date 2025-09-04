const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { createEvent, voteOnPoll } = require('../controllers/eventController');

// Route to create a new event
router.post('/create-event', authMiddleware, createEvent);

// Route to vote on a poll option
router.post('/vote', authMiddleware, voteOnPoll);

module.exports = router;
