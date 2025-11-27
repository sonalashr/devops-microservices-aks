const appInsights = require("applicationinsights");

if (process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
  appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
    .setAutoCollectRequests(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectConsole(true, true)
    .start();
  console.log("Application Insights connected");
}

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const orders = [{ id: 1, userId: 1, product: 'Book' }];

app.get('/health', (req, res) => res.send({ status: 'ok', service: 'order-service' }));
app.get('/orders', (req, res) => res.json(orders));
app.post('/orders', (req, res) => {
  const { userId, product } = req.body;
  const id = orders.length + 1;
  const newOrder = { id, userId, product };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`order-service running on port ${port}`));
