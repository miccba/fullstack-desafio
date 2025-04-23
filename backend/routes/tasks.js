const express = require("express");
const router = express.Router();

// Lista de tarefas temporária
let tasks = [
  { id: 1, title: "Comprar leite", done: false },
  { id: 2, title: "Estudar Node.js", done: true },
];

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retorna todas as tarefas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   done:
 *                     type: boolean
 */
router.get("/", (req, res) => {
  res.json(tasks);
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Adiciona uma nova tarefa
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Campo title é obrigatório
 */
router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "O campo title é obrigatório" });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    done: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Alterna o status de uma tarefa (done)
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarefa atualizada
 *       404:
 *         description: Tarefa não encontrada
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  task.done = !task.done;
  res.json(task);
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Remove uma tarefa pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarefa removida com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);

  if (tasks.length < initialLength) {
    res.status(200).json({ message: "Tarefa removida com sucesso" });
  } else {
    res.status(404).json({ error: "Tarefa não encontrada" });
  }
});

module.exports = router;
