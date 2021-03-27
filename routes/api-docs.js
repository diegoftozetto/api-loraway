const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "LoRa Gateway API",
      description: "-",
      contact: {
        name: "Devs"
      },
      servers: ["http://localhost:5000"]
    }
  },

  apis: ["./app.js", "./routes/reading.js", "./routes/device.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = [swaggerUi.serve, swaggerUi.setup(swaggerDocs)];
