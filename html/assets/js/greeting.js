// Get current hour
const currentHour = new Date().getHours();
const greetingElement = document.getElementById('greeting');

// Determine greeting based on the time of day
let greetingMessage;
if (currentHour >= 5 && currentHour < 12) {
    greetingMessage = 'Good Morning';
} else if (currentHour >= 12 && currentHour < 17) {
    greetingMessage = 'Good Afternoon';
} else {
    greetingMessage = 'Good Evening';
}

// Set the greeting message dynamically
greetingElement.textContent = `Hi Jack, ${greetingMessage}`;
