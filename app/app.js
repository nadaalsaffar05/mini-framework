import { createState, createRouter, render } from "../framework/index.js";
import { TodoApp } from "./components/TodoApp.js";

const container = document.getElementById("app");

const state = createState({
  todos: [],
  filter: "All",
});

// Keep the route paths working both locally (/app/...) and on GitHub Pages
// (/repository/app/...).
const appPath = window.location.pathname.replace(/\/(index\.html|active|completed)?$/, "");
const router = createRouter({
  [appPath]: () => setFilter("All"),
  [`${appPath}/index.html`]: () => setFilter("All"),
  [`${appPath}/active`]: () => setFilter("Active"),
  [`${appPath}/completed`]: () => setFilter("Completed"),
});

function setFilter(filter) {
  if (state.getState().filter !== filter) state.setState({ filter });
  else renderApp();
}

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

      onEdit(id, title) {
        const cleanTitle = title.trim();
        if (!cleanTitle) {
          state.setState({
            todos: state.getState().todos.filter((todo) => todo.id !== id),
          });
          return;
        }
        state.setState({
          todos: state.getState().todos.map((todo) =>
            todo.id === id ? { ...todo, title: cleanTitle } : todo,
          ),
        });
      },

      onFilterChange(filter) {
        const route = {
          All: `${appPath}/index.html`,
          Active: `${appPath}/active`,
          Completed: `${appPath}/completed`,
        }[filter];
        router.navigate(route);
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
router.handleRoute();
