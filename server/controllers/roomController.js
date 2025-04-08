const Room = require('../models/roomModal');
const createRoom = async (req, res) => {
  try {
    const { roomName, taskIds, durationHours } = req.body;
    const userId = req.user.id; // Get user ID from authenticated request

    // Generate unique room code
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const expiresAt = new Date(Date.now() + durationHours * 60 * 60 * 1000); // Set expiry time

    const newRoom = new Room({
      roomName,
      roomCode,
      tasks: taskIds,
      employees: [],
      createdBy: userId,
      expiresAt
    });

    await newRoom.save();
    res.json({ success: true, roomCode, expiresAt });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Failed to create room.' });
  }
};


// ✅ Join Room
const joinRoom = async (req, res) => {
  try {
    const { roomCode, employeeId } = req.body;
    const room = await Room.findOne({ roomCode });

    if (!room) {
      return res.status(404).json({ error: 'Room not found!' });
    }

    // Check if the employee has already joined
    if (!room.employees.includes(employeeId)) {
      room.employees.push(employeeId);
      await room.save();
    }

    res.json({ success: true, message: 'Joined the room!' });
  } catch (error) {
    console.error('Error joining room:', error);
    res.status(500).json({ error: 'Failed to join room.' });
  }
};

// ✅ Get Room Details
const getRoomDetails = async (req, res) => {
  try {
    const { roomCode } = req.params;
    console.log('Fetching room with code:', roomCode); // Debug log

    const room = await Room.findOne({ roomCode }).populate('tasks');

    if (!room) {
      return res.status(404).json({ error: 'Room not found!' });
    }

    res.json(room);
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ error: 'Failed to fetch room details.' });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { roomCode } = req.params;
    const userId = req.user.id; // Get user ID from authenticated request

    const room = await Room.findOne({ roomCode });

    if (!room) {
      return res.status(404).json({ error: 'Room not found!' });
    }

    // Check if the user is the creator
    if (room.createdBy.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized! You can only delete rooms you created.' });
    }

    await Room.deleteOne({ roomCode });
    res.json({ success: true, message: 'Room deleted!' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ error: 'Failed to delete room.' });
  }
};




module.exports = {
  createRoom,
  joinRoom,
  getRoomDetails,
  deleteRoom
};
