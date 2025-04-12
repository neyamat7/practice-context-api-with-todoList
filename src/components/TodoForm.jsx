import { useState } from "react";
import { useTodo } from "../context";

const TodoForm = () => {
  const [todoMsg, setTodoMsg] = useState("");
  const { addTodo } = useTodo();

  function addSingleTodo(e) {
    e.preventDefault();

    if (!todoMsg) return;

    addTodo({ title: todoMsg, completed: false });
    setTodoMsg("");
  }

  return (
    <div>
      <form
        onSubmit={addSingleTodo}
        className="flex gap-2 items-center p-1 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-300
        w-[520px] mx-auto
        "
      >
        <input
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          type="text"
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-all duration-200 flex items-center gap-2 shadow-blue-100 shadow-sm hover:shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>Add</span>
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
