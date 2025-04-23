import { useState } from "react";

export type Task = {
  id: number;
  title: string;
  done: boolean;
};

export function useApps() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: input,
        done: false,
      };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const toggleDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return {
    tasks,
    input,
    setInput,
    addTask,
    toggleDone,
    removeTask,
  };
}
