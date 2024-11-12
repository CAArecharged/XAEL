const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game Variables
const hedgehog = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  speed: 2,
  size: 20,  // Approximate size for drawing
};

// Cursor position tracking
let cursor = { x: canvas.width / 2, y: canvas.height / 2 };

// Berry variables
let berries = [];
const berryCount = 10;  // Number of berries to start with

// Load berries randomly
function loadBerries() {
  for (let i = 0; i < berryCount; i++) {
    berries.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 10,  // Berry size
    });
  }
}

// Update cursor position on mouse move
canvas.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX;
  cursor.y = event.clientY;
});

// Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move hedgehog toward cursor
  const dx = cursor.x - hedgehog.x;
  const dy = cursor.y - hedgehog.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 1) {  // Only move if the cursor is far enough
    hedgehog.x += (dx / distance) * hedgehog.speed;
    hedgehog.y += (dy / distance) * hedgehog.speed;
  }

  // Draw hedgehog (temporary placeholder as a circle)
  ctx.fillStyle = 'brown';
  ctx.beginPath();
  ctx.arc(hedgehog.x, hedgehog.y, hedgehog.size, 0, Math.PI * 2);
  ctx.fill();

  // Draw berries and check for collisions
  berries = berries.filter(berry => {
    const distToBerry = Math.sqrt((hedgehog.x - berry.x) ** 2 + (hedgehog.y - berry.y) ** 2);
    if (distToBerry < hedgehog.size + berry.size) {
      return false;  // Berry is eaten
    }
    // Draw berry
    ctx.fillStyle = 'purple';
    ctx.beginPath();
    ctx.arc(berry.x, berry.y, berry.size, 0, Math.PI * 2);
    ctx.fill();
    return true;
  });

  requestAnimationFrame(gameLoop);
}

// Start the game
loadBerries();
gameLoop();
