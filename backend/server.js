const express = require("express");
const app = express();
const port = 3000;

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// Importando as rotas de tarefas
const tasksRoutes = require("./routes/tasks");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware para parsing de JSON
app.use(express.json());

// Usando as rotas de tarefas
app.use("/tasks", tasksRoutes);

// Iniciar o servidor
const server = app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação Swagger: http://localhost:${port}/api-docs`);
});

module.exports = { app, server };
