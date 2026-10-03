import { createElement } from "../../framework/dom.js";

export function TodoFooter(props) {
  const activeCount = props.todos.filter((todo) => !todo.completed).length;

  return createElement("footer", { class: "todo-footer" }, [
    createElement("span", {}, [
      `${activeCount} ${activeCount === 1 ? "item" : "items"} left`,
    ]),

    createElement(
      "button",
      {
        onClick: () => props.onFilterChange("All"),
      },
      ["All"],
    ),

    createElement(
      "button",
      {
        onClick: () => props.onFilterChange("Active"),
      },
      ["Active"],
    ),

    createElement(
      "button",
      {
        onClick: () => props.onFilterChange("Completed"),
      },
      ["Completed"],
    ),

    createElement(
      "button",
      {
        onClick: props.onClearCompleted,
      },
      ["Clear completed"],
    ),
  ]);
}
