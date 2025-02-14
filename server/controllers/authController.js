const bcrypt = require('bcrypt');
const connectDB = require('../config/connectDB');

const checkFormat = (username, email, password) => {
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }
  if (password.length < 4) {
    throw new Error("Password must be at least 4 characters long");
  }
};

const signup = async (request) => {
  try {
    const db = await connectDB();
    const userCollection = db.collection("user");
    await userCollection.createIndex({ username: 1 }, { unique: true });
    await userCollection.createIndex({ email: 1 }, { unique: true });
    const { username, email, password } = await request.json();
    checkFormat(username, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, email, password: hashedPassword };
    const result = await userCollection.insertOne(newUser);
    const responsePayload = { success: true, userId: result.insertedId };
    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    if (error.code === 11000) {
      return new Response(JSON.stringify({ success: false, error: "Username or Email already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

module.exports = signup;
