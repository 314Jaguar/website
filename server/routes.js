const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Message = require('../models/Message');
const VisitorCounter = require('../models/VisitorCounter');

// Visitor Counter
router.get('/visitor-counter', async (req, res) => {
    try {
        let counter = await VisitorCounter.findOne();
        if (!counter) {
            counter = new VisitorCounter({ count: 1 });
        } else {
            counter.count += 1;
        }
        await counter.save();
        res.json({ count: counter.count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update visitor counter' });
    }
});

// Add Friend
router.post('/add-friend', async (req, res) => {
    const { username, friendUsername } = req.body;
    try {
        const user = await User.findOne({ username });
        const friend = await User.findOne({ username: friendUsername });

        if (!user || !friend) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.friends.includes(friendUsername)) {
            return res.status(400).json({ message: 'Friend already added' });
        }

        user.friends.push(friendUsername);
        await user.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add friend' });
    }
});

// Get Friends List
router.get('/friends', async (req, res) => {
    const { username } = req.query;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ friends: user.friends });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve friends list' });
    }
});

// Send Message
router.post('/send-message', async (req, res) => {
    const { username, message } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newMessage = new Message({ username, message });
        await newMessage.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Get Messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json({ messages });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
});

module.exports = router;
