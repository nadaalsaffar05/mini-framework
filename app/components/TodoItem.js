import { createElement } from "../../framework/dom.js";

export function TodoItem(props) {
  const checkbox = createElement("input", {
    type: "checkbox",
    onChange() {
      props.onToggle(props.id);
    },
  });

  // Set checked as a DOM property so false stays unchecked.
  checkbox.checked = props.completed;

  return createElement(
    "li",
    { class: props.completed ? "todo-item completed" : "todo-item" },
    [
      checkbox,
      createElement("span", {}, [props.title]),
      createElement(
        "button",
        {
          type: "button",
          "aria-label": `Delete ${props.title}`,
          onClick() {
            props.onDelete(props.id);
          },
        },
        ["×"],
      ),
    ],
  );
}
