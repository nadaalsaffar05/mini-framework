# Mini Framework

A small UI framework built with native JavaScript and DOM APIs. It provides helpers to create and render elements, handle events, store state, and route between paths.

## Example

```js
import { createElement, render } from "./framework/index.js";

const button = createElement("button", {
  class: "save-button", // HTML attribute
  onClick: () => console.log("Saved"), // Event handler
}, ["Save"]); // Child text

const page = createElement("main", {}, [
  createElement("h1", {}, ["My page"]),
  button, // Nested element
]);

render(document.getElementById("app"), page);
```

`createElement` builds DOM elements and their children. `render` replaces a container's contents. `createState` stores data and notifies subscribers when it changes. `createRouter` runs a function for the current URL path and supports navigation.

The TodoMVC example is in `app/`. Serve the repository over HTTP and open `app/index.html` to run it.
