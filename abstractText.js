const canvas = document.getElementById('textCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const text = "XAEL";
const fontSize = 150;
const interval = 50; // Interval between animations
let animationCounter = 0;

// Function to draw abstract XAEL
function drawAbstractXAEL() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set random positions and styles for each character
  const positions = [];
  const sizeVariance = Math.sin(animationCounter / 20) * 20;
  for (let i = 0; i < text.length; i++) {
    positions.push({
      x: canvas.width / 2 - 150 + i * (fontSize + 10) + Math.sin(animationCounter / 10 + i) * 30,
      y: canvas.height / 2 + Math.cos(animationCounter / 10 + i) * 30,
      color: i % 2 === 0 ? '#000000' : '#FFFFFF',
      fontSize: fontSize + sizeVariance,
      angle: Math.sin(animationCounter / 30) * 20
    });
  }

  // Draw each character with varying styles
  positions.forEach((pos, index) => {
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.rotate(pos.angle * Math.PI / 180);
    ctx.font = `bold ${pos.fontSize}px Arial`;
    ctx.fillStyle = pos.color;
    ctx.fillText(text[index], 0, 0);
    ctx.restore();
  });

  // Draw random lines and circles to add to the abstract effect
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineWidth = Math.random() * 5;
    ctx.strokeStyle = Math.random() > 0.5 ? '#000000' : '#FFFFFF';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 10, 0, Math.PI * 2);
    ctx.fillStyle = Math.random() > 0.5 ? '#000000' : '#FFFFFF';
    ctx.fill();
  }

  // Update animation counter and loop
  animationCounter++;
  requestAnimationFrame(drawAbstractXAEL);
}

// Start animation
drawAbstractXAEL();

