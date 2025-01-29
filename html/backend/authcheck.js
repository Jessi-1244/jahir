// Function to log out the user and prevent them from going back to the current page
function logout() {
    // Clear user session data (localStorage, sessionStorage, cookies, etc.)
    localStorage.removeItem('auth_token');  // Example for localStorage
    sessionStorage.clear();                 // Clear sessionStorage
    document.cookie = 'auth_token=; Max-Age=-99999999;'  // Clear any cookies related to auth

    // Optional: Display a notification to the user (you can replace with a more advanced solution)
    alert('You have logged out successfully.');

    // Redirect the user to the login page or homepage
    window.location.replace("auth-sign-in.html");  // Change this to your desired page

    // Disable the back button by manipulating the browser history
    window.history.forward();  // Prevent going back to the current page
    setTimeout(function() {
        window.history.forward();  // This prevents the user from using the back button
    }, 0);
}

// Event listener for the logout button (useful if you have multiple logout buttons on different pages)
function setupLogoutButton() {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
}

// Call this function to bind the logout functionality when the page is ready
document.addEventListener("DOMContentLoaded", setupLogoutButton);
const logoutButton = document.getElementById('logoutButton');

// Add event listener to the logout button
logoutButton.addEventListener('click', function() {
  // Simply redirect the user to the auth-sign-in page
  window.location.href = 'auth-sign-in.html';
});