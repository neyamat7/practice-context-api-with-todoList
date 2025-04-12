import { useState } from "react";
import { useTodo } from "../context";

const TodoItem = ({ todo }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.title);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  function editTodo() {
    updateTodo(todo.id, { ...todo, title: todoMsg });
    setIsEditable(false);
  }
  function deleteSingleTodo() {
    deleteTodo(todo.id);
  }
  function toggleCompleted() {
    toggleComplete(todo.id);
  }
  return (
    <div className="flex justify-center gap-2 items-center">
      <input
        type="checkbox"
        checked={todo.completed}
        className="checkbox checkbox-success"
        onChange={toggleCompleted}
      />
      <input
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        type="text"
        className={` border-none outline-none max-w-[400px] w-full py-3 rounded-lg transition-all duration-200
    focus:outline px-2
    ${
      isEditable
        ? `
          bg-white border-2 border-neutral-200
          focus:border-primary-500 focus:ring-primary-200
          text-neutral-800
          shadow-sm
        `
        : `
          bg-transparent border-2 border-transparent
          ${
            todo.completed
              ? "line-through text-neutral-400"
              : "text-neutral-700"
          }
          hover:bg-neutral-50
        `
    }
    ${todo.completed && !isEditable ? "opacity-75" : ""}
    font-medium
  `}
        readOnly={!isEditable}
      />
      <button
        onClick={() => {
          if (todo.completed) return;
          if (isEditable) {
            editTodo();
          } else {
            setIsEditable((prevValue) => !prevValue);
          }
        }}
        disabled={todo.completed}
        className={`
    p-2 rounded-full transition-all duration-200
    ${
      todo.completed
        ? "text-gray-400 bg-gray-100 cursor-not-allowed"
        : isEditable
        ? "text-white bg-green-500 hover:bg-green-600 shadow-md"
        : "text-gray-700 bg-gray-200 hover:bg-gray-300"
    }
    flex items-center justify-center
    focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50
    ${isEditable ? "transform hover:scale-105" : ""}
  `}
      >
        {isEditable ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        )}
      </button>
      <button
        onClick={deleteSingleTodo}
        className="
    p-2 rounded-full transition-all duration-200
    bg-red-100 hover:bg-red-200 text-red-600
    hover:text-red-700 hover:shadow-sm
    focus:outline-none focus:ring-2 focus:ring-red-300
    active:bg-red-300 active:scale-95
    flex items-center justify-center
  "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;
