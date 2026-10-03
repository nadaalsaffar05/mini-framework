import { createElement } from "../../framework/dom.js";

export function TodoHeader({ onAddTodo }) {
  const input = createElement("input", {
    class: "new-todo",
    type: "text",
    placeholder: "What needs to be done?",
  });

  return createElement("header", { class: "header" }, [
    createElement("h1", {}, ["todos"]),
    createElement(
      "form",
      {
        onSubmit(event) {
          event.preventDefault();
          onAddTodo(input.value);
          input.value = "";
        },
      },
      [input],
    ),
  ]);
}
