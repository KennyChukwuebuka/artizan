const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Send message
router.post('/', async (req, res) => {
  const message = new Message(req.body);
  await message.save();
  res.status(201).json(message);
});

// Get messages between two users
router.get('/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;
  const messages = await Message.find({
    $or: [
      { senderId: user1, receiverId: user2 },
      { senderId: user2, receiverId: user1 }
    ]
  }).sort('timestamp');
  res.json(messages);
});

module.exports = router;
