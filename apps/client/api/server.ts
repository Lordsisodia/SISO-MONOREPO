import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import clerkWebhook from './webhooks/clerk';

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware - IMPORTANT: Use raw body for webhook verification
app.use('/api/webhooks/clerk', bodyParser.raw({ type: 'application/json' }));
app.use(bodyParser.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Clerk webhook endpoint
app.post('/api/webhooks/clerk', clerkWebhook);

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📡 Clerk webhook endpoint: http://localhost:${PORT}/api/webhooks/clerk`);
});
