// Import styles
import './styles/main.scss';

// Main JavaScript file
// Add your interactive functionality here

console.log('Magyar Közlöny Frontend loaded successfully!');

// Example: Add smooth scrolling to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Example: Button click handler
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('Button clicked!');
    // Add your button functionality here
  });
});

