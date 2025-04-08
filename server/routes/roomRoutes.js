const express = require('express');
const router = express.Router();
const authenticated = require("../middlewares/authenticated");
const { createRoom, joinRoom, getRoomDetails, deleteRoom } = require('../controllers/roomController');

// Create Room
router.post('/create', authenticated, createRoom);

// Join Room
router.post('/join', authenticated, joinRoom);

// Get Room Details
router.get('/:roomCode', authenticated, getRoomDetails);

// Delete Room with roomCode
router.delete('/delete/:roomCode', authenticated, deleteRoom);

module.exports = router;
