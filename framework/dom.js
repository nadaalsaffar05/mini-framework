import { on } from "./events.js";

// Creates an HTML element with attributes, events, and children.
export function createElement(tag, attributes = {}, children = []) {
  // Create the HTML element.
  const element = document.createElement(tag);

  // Add attributes and events.
  for (const [name, value] of Object.entries(attributes)) {
    // Functions beginning with "on" are treated as events.
    if (name.startsWith("on") && typeof value === "function") {
      on(element, name, value);
    } else {
      // Everything else is a normal HTML attribute.
      element.setAttribute(name, value);
    }
  }

  // Add children.
  for (const child of children) {
    if (typeof child === "string" || typeof child === "number") {
      element.appendChild(document.createTextNode(String(child)));
    } else {
      element.appendChild(child);
    }
  }

  return element;
}

// Renders an element inside a container.
export function render(container, element) {
  container.innerHTML = "";
  container.appendChild(element);
}
