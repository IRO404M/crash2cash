// Backend Setup (server.js) with Improved Logging & Performance
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { createServer } from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';
import compression from 'compression';
import auctionRoutes from './routes/auctionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { verifyToken } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Security & Performance Middleware
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());

// Image Upload Setup
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const upload = multer({ dest: 'uploads/' });

app.use('/api/auth', authRoutes);
app.use('/api/auctions', verifyToken, auctionRoutes);
app.use('/api/payments', verifyToken, paymentRoutes);
app.use('/api/admin', verifyToken, adminRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('placeBid', (bidData) => {
    io.emit('newBid', bidData);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => console.log('Server running on port 5000'));
