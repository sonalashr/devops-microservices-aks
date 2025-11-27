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

const users = [{ id: 1, name: 'Alice' }];

app.get('/health', (req, res) => res.send({ status: 'ok', service: 'user-service' }));
app.get('/users', (req, res) => res.json(users));
app.post('/users', (req, res) => {
  const { name } = req.body;
  const id = users.length + 1;
  const user = { id, name };
  users.push(user);
  res.status(201).json(user);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`user-service running on port ${port}`));
