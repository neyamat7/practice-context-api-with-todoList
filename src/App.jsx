import { useEffect, useState } from "react";
import { TodoProvider } from "./context";
import { TodoForm, TodoItem } from "./components";

const App = () => {
  const [todos, setTodos] = useState([]);

  function addTodo(todo) {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  }

  function updateTodo(id, todo) {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  }

  function deleteTodo(id) {
    const newTodo = (prev) => prev.filter((prevTodo) => prevTodo.id !== id);
    setTodos(newTodo);
  }

  function toggleComplete(id) {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : false
      )
    );
  }

  // get todo data to localStorage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // set todo data to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <h1 className="text-5xl text-center text-green-600 font-bold mt-10">
        Manage Your Daily Task
      </h1>

      <div className="text-center mt-10">
        <TodoForm></TodoForm>
      </div>
      <div className="text-center mt-10">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo}></TodoItem>
        ))}
      </div>
    </TodoProvider>
  );
};

export default App;
