const canvas = document.getElementById('artCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables for colour and effect settings
const colours = ['#FF5733', '#33FFBD', '#FF33F6', '#FFF233', '#3375FF', '#75FF33'];
let shapes = [];

// Resize canvas on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Function to create a new random shape at a specified position
function createShape(x, y) {
  const size = Math.random() * 50 + 10;  // Random size
  const colour = colours[Math.floor(Math.random() * colours.length)];
  const type = Math.random() > 0.5 ? 'circle' : 'square';
  shapes.push({ x, y, size, colour, type, opacity: 1 });
}

// Function to draw shapes
function drawShapes() {
  shapes.forEach((shape, index) => {
    ctx.globalAlpha = shape.opacity;  // Set shape opacity
    ctx.fillStyle = shape.colour;
    
    if (shape.type === 'circle') {
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape.type === 'square') {
      ctx.fillRect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
    }
    
    shape.opacity -= 0.01;  // Gradually fade out
    if (shape.opacity <= 0) shapes.splice(index, 1);  // Remove faded shapes
  });
  ctx.globalAlpha = 1;  // Reset global alpha for future shapes
}

// Add a new shape where the mouse moves
canvas.addEventListener('mousemove', (event) => {
  createShape(event.clientX, event.clientY);
});

// Add a burst of shapes on click
canvas.addEventListener('click', (event) => {
  for (let i = 0; i < 5; i++) {
    createShape(event.clientX + Math.random() * 50 - 25, event.clientY + Math.random() * 50 - 25);
  }
});

// Main animation loop
function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';  // Slight background fade for a trailing effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawShapes();
  
  requestAnimationFrame(animate);
}

// Start the animation
animate();
