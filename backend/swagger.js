// backend/swagger.js
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Tarefas",
      version: "1.0.0",
      description: "Uma API simples para gerenciar tarefas",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], // <- Aquí indicamos dónde están los comentarios para Swagger
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
