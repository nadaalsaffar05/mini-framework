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

  function createTitle() {
    return createElement("span", {
      onDblClick(event) {
        const editor = createElement("input", {
          class: "edit",
          type: "text",
          value: props.title,
          "aria-label": "Edit todo",
        });
        let editing = true;

        function finishEdit() {
          if (!editing) return;
          editing = false;
          props.onEdit(props.id, editor.value);
        }

        function cancelEdit() {
          if (!editing) return;
          editing = false;
          editor.replaceWith(createTitle());
        }

        editor.onblur = finishEdit;
        editor.onkeydown = (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            finishEdit();
          } else if (event.key === "Escape") {
            event.preventDefault();
            cancelEdit();
          }
        };

        event.currentTarget.replaceWith(editor);
        editor.focus();
        editor.select();
      },
    }, [props.title]);
  }

  return createElement(
    "li",
    { class: props.completed ? "todo-item completed" : "todo-item" },
    [
      checkbox,
      createTitle(),
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
