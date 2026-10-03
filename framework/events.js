// Attaches an event handler to an element.
export function on(element, eventName, handler) {
  // Convert "onClick" into "onclick", "onInput" into "oninput", etc.
  const eventHandlerKey = eventName.toLowerCase();

  // Make sure the element supports this event.
  if (eventHandlerKey in element) {
    element[eventHandlerKey] = handler;
  } else {
    console.warn(`Event "${eventName}" is not supported on this element.`);
  }
}
