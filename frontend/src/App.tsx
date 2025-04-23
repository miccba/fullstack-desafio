import { useApps } from "./hooks/useApps";
import styled from "styled-components";
import { FaCheck, FaTrashAlt } from "react-icons/fa";

const Container = styled.div`
  min-height: 100vh;
  background-color: #f3f4f6; /* bg-gray-100 */
  padding: 16px;
`;

const Title = styled.h1`
  font-size: 1.875rem; /* text-3xl */
  font-weight: bold; /* font-bold */
  text-align: center;
  margin-bottom: 24px; /* mb-6 */
`;

const InputContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  justify-content: center;
`;

const Input = styled.input`
  border: 1px solid #d1d5db; /* border */
  padding: 8px 12px; /* px-3 py-2 */
  border-radius: 8px; /* rounded */
  width: 50%; /* w-1/2 */
`;

const Button = styled.button`
  background-color: #3b82f6; /* bg-blue-500 */
  color: white; /* text-white */
  padding: 8px 16px; /* px-4 py-2 */
  border-radius: 8px; /* rounded */
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #2563eb; /* hover:bg-blue-600 */
  }
`;

const TaskList = styled.ul`
  max-width: 320px;
  margin: 0 auto;
`;

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* shadow */
`;

const TaskText = styled.span<{ done: boolean }>`
  cursor: pointer;
  text-decoration: ${(props) => (props.done ? "line-through" : "none")};
  color: ${(props) => (props.done ? "#6b7280" : "inherit")};
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #3b82f6; /* Color azul */
  font-size: 1.25rem; /* Tamaño de los íconos */

  &:hover {
    color: #2563eb;
  }
`;

export default function App() {
  const { tasks, input, setInput, addTask, toggleDone, removeTask } = useApps();

  return (
    <Container>
      <Title>Minha Lista de Tarefas</Title>
      <InputContainer>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Adicionar tarefa"
        />
        <Button onClick={addTask}>Adicionar</Button>
      </InputContainer>
      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task.id}>
            <TaskText done={task.done} onClick={() => toggleDone(task.id)}>
              {task.title}
            </TaskText>
            <ActionContainer>
              <ActionButton onClick={() => toggleDone(task.id)}>
                <FaCheck style={{ color: task.done ? "green" : "#3b82f6" }} />
              </ActionButton>
              <ActionButton onClick={() => removeTask(task.id)}>
                <FaTrashAlt />
              </ActionButton>
            </ActionContainer>
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
}
