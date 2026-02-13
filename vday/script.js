let maxZIndex = 1; // global tracker for top-most heart

class Heart {
  constructor(element) {
    this.element = element;
    this.heart = element.querySelector('.heart');
    this.backPath = element.querySelector('.heart-path-back');
    this.isFlipped = false;

    // Random initial position
    this.x = Math.random() * (window.innerWidth - 150);
    this.y = Math.random() * (window.innerHeight - 150);

    // Constant velocity for straight movement (slow)
    const speed = 0.5 + Math.random() * 0.5; // slower speed
    const angle = Math.random() * 2 * Math.PI;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;

    this.updatePosition();

    this.heart.addEventListener('click', () => this.flip());
  }

flip() {
  if (!this.isFlipped) {
    this.isFlipped = true;
    this.heart.classList.add('flipped');

    // Stop movement
    this.vx = 0;
    this.vy = 0;

    // Bring this heart to the front
    maxZIndex++;
    this.element.style.zIndex = maxZIndex;

    // Show back color/message
    setTimeout(() => {
      this.backPath.style.fill = this.heart.dataset.color;
      this.element.style.pointerEvents = 'none';  // ← ADD THIS LINE!
    }, 400);
  }
}

  update() {
    if (!this.isFlipped) {
      // Move in straight line
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off walls
      if (this.x < 0 || this.x > window.innerWidth - 150) {
        this.vx *= -1;
        this.x = Math.max(0, Math.min(window.innerWidth - 150, this.x));
      }

      if (this.y < 0 || this.y > window.innerHeight - 150) {
        this.vy *= -1;
        this.y = Math.max(0, Math.min(window.innerHeight - 150, this.y));
      }
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}

// Initialize
const heartElements = document.querySelectorAll('.heart-container');
const hearts = Array.from(heartElements).map(el => new Heart(el));

function animate() {
  hearts.forEach(h => h.update());
  requestAnimationFrame(animate);
}

// Start animation
animate();

// Handle window resize
window.addEventListener("resize", () => {
  hearts.forEach((heart) => {
    heart.x = Math.min(heart.x, window.innerWidth - 150);
    heart.y = Math.min(heart.y, window.innerHeight - 150);
    heart.updatePosition();
  });
});
