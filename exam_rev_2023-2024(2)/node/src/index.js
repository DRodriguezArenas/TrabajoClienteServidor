const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");
const bodyParser = require('body-parser');

const { WebSocketServer } = require('ws');

const config = require("./config/config");
const UserRouter = require('./routes/user.route');
const UrlRouter = require('./routes/url.route');

// Create the express app
const app = express();
const port = config.PORT;

var cors = require('cors');
app.use(cors());

// Swagger options
const options = {
  swaggerDefinition: {
    info: {
      title: "User API",
      version: "1.0.0",
      description: "API para administrar usuarios y enlaces recortados",
    },
    host: "api.fmesasc.com",
    basePath: "/v1",
    schemes: ["https"],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);


// Use body parser middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Use the user router
app.use('/api/users', UserRouter);

// Use the URL router
app.use('/api/urls', UrlRouter);

// Use swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Start the server
const server = app.listen(port, () => {
  console.log(`API server is listening on port ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(JSON.parse(message)));
    });
  });
});