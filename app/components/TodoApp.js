import { createElement } from "../../framework/dom.js";
import { TodoHeader } from "./TodoHeader.js";
import { TodoList } from "./TodoList.js";
import { TodoFooter } from "./TodoFooter.js";

export function TodoApp(props) {
  const visibleTodos = props.todos.filter((todo) => {
    if (props.filter === "Active") return !todo.completed;
    if (props.filter === "Completed") return todo.completed;
    return true;
  });

  return createElement("main", { class: "todo-app" }, [
    TodoHeader({
      onAddTodo: props.onAddTodo,
    }),

    TodoList({
      todos: visibleTodos,
      onToggle: props.onToggle,
      onDelete: props.onDelete,
    }),

    TodoFooter({
      todos: props.todos,
      onFilterChange: props.onFilterChange,
      onClearCompleted: props.onClearCompleted,
    }),
  ]);
}
