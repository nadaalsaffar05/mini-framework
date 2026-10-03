import { createState, render } from "../framework/index.js";
import { TodoApp } from "./components/TodoApp.js";

const container = document.getElementById("app");

const state = createState({
  todos: [],
  filter: "All",
});

function renderApp() {
  const current = state.getState();

  render(
    container,
    TodoApp({
      todos: current.todos,
      filter: current.filter,

      onAddTodo(title) {
        const cleanTitle = title.trim();
        if (!cleanTitle) return;

        state.setState({
          todos: [
            ...state.getState().todos,
            {
              id: Date.now() + Math.random(),
              title: cleanTitle,
              completed: false,
            },
          ],
        });
      },

      onToggle(id) {
        state.setState({
          todos: state
            .getState()
            .todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
        });
      },

      onDelete(id) {
        state.setState({
          todos: state.getState().todos.filter((todo) => todo.id !== id),
        });
      },

      onFilterChange(filter) {
        state.setState({ filter });
      },

      onClearCompleted() {
        state.setState({
          todos: state.getState().todos.filter((todo) => !todo.completed),
        });
      },
    }),
  );
}

state.subscribe(renderApp);
renderApp();
