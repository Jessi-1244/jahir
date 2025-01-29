// logout.js

document.addEventListener('DOMContentLoaded', function() {
  // Get the logout button
  const logoutButton = document.getElementById('logoutButton');

  // Ensure the button exists before adding an event listener
  if (logoutButton) {
      // Add event listener to the logout button
      logoutButton.addEventListener('click', function() {
          // Redirect the user to the auth-sign-in page
          window.location.href = 'auth-sign-in.html'; 

          // Disable both back and forward navigation after redirection
          disableBackAndForwardNavigation();
      });
  }
});

function disableBackAndForwardNavigation() {
  // Push a new state to replace the current page in the history
  window.history.pushState(null, "", window.location.href);

  // Listen for any popstate event (back or forward navigation)
  window.onpopstate = function() {
      // Push the same state back to the history stack
      window.history.pushState(null, "", window.location.href);
  };
}
