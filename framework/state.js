// Creates a state manager for the application.
export function createState(initialState = {}) {
  // Store the current state.
  let state = initialState;

  // Store functions that should run when the state changes.
  const listeners = [];

  // Return the current state.
  function getState() {
    return state;
  }

  // Update the state.
  function setState(newState) {
    // Keep the old state and replace only the values that changed.
    state = {
      ...state,
      ...newState,
    };

    // Notify everyone listening that the state has changed.
    listeners.forEach((listener) => listener(state));
  }

  // Subscribe a function to state changes.
  function subscribe(listener) {
    listeners.push(listener);
  }

  // These are the functions available to users of our framework.
  return {
    getState,
    setState,
    subscribe,
  };
}
