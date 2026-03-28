const express = require('express');
const cors = require('cors');
const authRoutes = require('../routes/auth');

function createApp() {
  const app = express();

  const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
  app.use(
    cors({
      origin: (origin, cb) => {
        if (!origin) return cb(null, true);
        if (allowedOrigins.includes(origin)) return cb(null, true);
        return cb(new Error('Not allowed by CORS'));
      }
    })
  );
  app.use(express.json());

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/auth', authRoutes);

  return app;
}

module.exports = createApp;
