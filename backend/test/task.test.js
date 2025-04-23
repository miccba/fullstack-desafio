const request = require("supertest");
const { app, server } = require("../server"); // Asegúrate de importar tanto app como server

describe("API de Tarefas", () => {
  let taskId;

  it("Deve retornar a lista de tarefas (GET /tasks)", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array); // Verifica si el cuerpo de la respuesta es un array
  });

  it("Deve adicionar uma nova tarefa (POST /tasks)", async () => {
    const newTask = { title: "Nova tarefa" };
    const response = await request(app).post("/tasks").send(newTask);

    expect(response.status).toBe(201); // Verifica si el status es 201 (Creado)
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe(newTask.title);

    taskId = response.body.id; // Almacena el ID para las pruebas futuras
  });

  it("Deve atualizar o status de uma tarefa (PUT /tasks/:id)", async () => {
    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .send({ done: true });

    expect(response.status).toBe(200);
    expect(response.body.done).toBe(true);
  });

  it("Deve remover uma tarefa (DELETE /tasks/:id)", async () => {
    const response = await request(app).delete(`/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Tarefa removida com sucesso"
    );
  });

  // Cerrar el servidor después de las pruebas
  afterAll(() => {
    server.close();
  });
});
