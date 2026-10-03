import { createElement } from "../../framework/dom.js";
import { TodoItem } from "./TodoItem.js";

export function TodoList(props) {
  const items = props.todos.map((todo) =>
    TodoItem({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      onToggle: props.onToggle,
      onDelete: props.onDelete,
      onEdit: props.onEdit,
    }),
  );

  return createElement("ul", { class: "todo-list" }, items);
}
