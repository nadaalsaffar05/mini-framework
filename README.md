# Mini Framework

A small JavaScript framework for building browser interfaces with native DOM APIs. It provides a few focused tools for creating elements, attaching events, rendering into the page, storing application state, and handling client-side routes. It does not depend on React, Vue, Angular, or another UI framework.

## Features

- `createElement` creates DOM elements from a tag name, attributes, event handlers, and children.
- `render` replaces a container's current contents with an element tree.
- `on` attaches a browser event handler to an element.
- `createState` stores state and notifies subscribers when state changes.
- `createRouter` maps URL paths to functions and supports browser back and forward navigation.
- The TodoMVC example is in the `app/` directory and is composed from small components.

## Creating elements

Import the DOM helpers from the framework's public entry point:

```js
import { createElement, render } from "./framework/index.js";

const message = createElement("p", {}, ["Hello, world!"]);
render(document.getElementById("app"), message);
```

`createElement` takes three arguments:

1. The HTML tag name.
2. An object of attributes and event handlers.
3. An array of child nodes or text.

Text is converted into text nodes. DOM elements can also be nested in the children array:

```js
const page = createElement("main", { class: "page" }, [
  createElement("h1", {}, ["My page"]),
  createElement("p", {}, ["This paragraph is nested inside main."]),
]);

render(document.getElementById("app"), page);
```

## Adding attributes

Pass regular HTML attributes in the second argument. Use `class` for the element's CSS class:

```js
const input = createElement("input", {
  class: "new-todo",
  type: "text",
  placeholder: "What needs to be done?",
  "aria-label": "New todo",
});
```

The framework applies these values with `setAttribute`.

## Adding events

Use an attribute whose name begins with `on`, followed by the event name in camel case. The framework turns it into the matching DOM event property:

```js
const button = createElement("button", {
  onClick() {
    console.log("Button clicked");
  },
}, ["Click me"]);

const form = createElement("form", {
  onSubmit(event) {
    event.preventDefault();
    console.log("Form submitted");
  },
}, [button]);
```

The event handler receives the browser's event object. The `on` helper can also be imported and used directly:

```js
import { on } from "./framework/index.js";

on(button, "onClick", () => console.log("Clicked"));
```

## State

`createState` returns `getState`, `setState`, and `subscribe`. `setState` shallow-merges the supplied object into the current state, then calls each subscriber with the updated state.

```js
import { createState } from "./framework/index.js";

const state = createState({ count: 0 });

state.subscribe((currentState) => {
  console.log("Count is now", currentState.count);
});

state.setState({ count: state.getState().count + 1 });
```

In an application, a subscriber can re-render the view when state changes. The framework does not automatically connect state to DOM elements; the application decides what to render.

## Routing

`createRouter` receives an object whose keys are URL paths and whose values are functions to run for those paths. Call `navigate` to change the path without reloading the page. The router also handles browser back and forward events.

```js
import { createRouter } from "./framework/index.js";

const router = createRouter({
  "/home": () => showPage("Home"),
  "/about": () => showPage("About"),
});

// Render the route matching the current URL.
router.handleRoute();

// Navigate after a user action.
router.navigate("/about");
```

Routes match `window.location.pathname` exactly. The framework does not define a fallback route for paths that are not in the route table.

## How the framework works

The framework uses the browser's built-in `document.createElement`, `setAttribute`, and text-node APIs. `createElement` builds a DOM tree recursively through the child elements supplied by the application. `render` clears a container and appends the new tree. Event handlers are assigned to the corresponding DOM event properties.

State and routing are separate utilities. State changes notify subscribers, while route changes run the matching route callback. Application code connects these tools to its UI by deciding when to call `render` and what elements to create.

## Running the TodoMVC example

Serve the repository directory over HTTP, then open `app/index.html`. For example, if Python is available:

```sh
python -m http.server 5500
```

Then visit `http://localhost:5500/app/index.html`. The example's components are in `app/components/`, its entry point is `app/app.js`, and its styles are in `app/styles.css`.
