const express = require('express');
const request = require('superagent');
const app = express();
app.use(express.json());

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:3001';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://order-service:3002';

app.get('/health', (req, res) => res.send({ status: 'ok', service: 'api-gateway' }));

// Proxy to user-service
app.get('/users', async (req, res) => {
  try {
    const response = await request.get(`${USER_SERVICE_URL}/users`);
    res.json(response.body);
  } catch (err) {
    res.status(500).json({ error: 'user-service unavailable' });
  }
});

// Proxy to order-service
app.get('/orders', async (req, res) => {
  try {
    const response = await request.get(`${ORDER_SERVICE_URL}/orders`);
    res.json(response.body);
  } catch (err) {
    res.status(500).json({ error: 'order-service unavailable' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`api-gateway running on port ${port}`));
