// Creates a router for the application.
export function createRouter(routes) {
  // Find and run the function for the current URL.
  function handleRoute() {
    const path = window.location.pathname;
    const route = routes[path];

    // Run the function connected to this route.
    if (route) {
      route();
    }
  }

  // Navigate to a new route.
  function navigate(path) {
    // Change the URL without refreshing the page.
    window.history.pushState({}, "", path);

    // Handle the new route.
    handleRoute();
  }

  // Handle browser back and forward buttons.
  window.onpopstate = handleRoute;

  // Give the application access to these router functions.
  return {
    navigate,
    handleRoute,
  };
}