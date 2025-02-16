const express=require('express');
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')
const connectDB=require('./config/connectDB')
const cors=require('cors')
const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/userRoutes')
const authenticated=require('./middlewares/authenticated')
const User=require('./models/userModal')

const app=express();
require('dotenv').config();

connectDB();

const port=process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())
app.use(
  cors({
    origin: [
      "https://task-tracker-ivory-psi.vercel.app",
      `http://localhost:5173`,
    ],
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get('/',(req,res)=>{
    res.send('This is TaskTracker API')
})

app.get('/protected', authenticated, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({
    success: true,
    message: 'User authenticated',
    user,
  });
});

app.use("/auth", authRoutes);
app.use("/api", userRoutes);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});  