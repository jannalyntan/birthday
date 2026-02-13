// Heart movement system with more dynamic motion
class Heart {
  constructor(element, index) {
    this.element = element;
    this.heart = element.querySelector(".heart");
    this.backPath = element.querySelector(".heart-path-back");
    this.targetColor = this.heart.dataset.color;
    this.isFlipped = false;

    // Random initial position
    this.x = Math.random() * (window.innerWidth - 150);
    this.y = Math.random() * (window.innerHeight - 150);

    // Random velocity for more dynamic movement
    this.vx = (Math.random() - 0.5) * 2; // Speed between -1 and 1
    this.vy = (Math.random() - 0.5) * 2;

    // Acceleration for smoother, more organic movement
    this.ax = 0;
    this.ay = 0;

    // Random wandering target
    this.targetX = Math.random() * window.innerWidth;
    this.targetY = Math.random() * window.innerHeight;
    this.targetChangeTimer = 0;
    this.targetChangeInterval = 100 + Math.random() * 100; // Change target every 100-200 frames

    // Set initial position
    this.updatePosition();

    // Click handler for flipping
    this.heart.addEventListener("click", () => this.flip());
  }

  flip() {
    if (!this.isFlipped) {
      this.isFlipped = true;
      this.heart.classList.add("flipped");
      this.element.dataset.flipped = "true";

      // Stop movement after flip
      this.vx = 0;
      this.vy = 0;
      this.ax = 0;
      this.ay = 0;
      this.targetX = this.x; // Fix target to current position
      this.targetY = this.y;

      // Bring to front
      this.element.style.zIndex = 1000;

      // Change the back heart color after flip
      setTimeout(() => {
        this.backPath.style.fill = this.targetColor;
      }, 400); // Halfway through the flip animation
    } else {
      // Allow flipping back
      this.heart.classList.remove("flipped");
      this.isFlipped = false;

      // Reset z-index
      this.element.style.zIndex = "";

      // Resume random movement
      this.targetX = Math.random() * (window.innerWidth - 150);
      this.targetY = Math.random() * (window.innerHeight - 150);
    }
  }

  update() {
    if (this.isFlipped) {
      // Stop moving if flipped
      this.vx = 0;
      this.vy = 0;
      this.ax = 0;
      this.ay = 0;
      this.x = this.targetX;
      this.y = this.targetY;
    } else {
      // Original wandering logic
      this.targetChangeTimer++;
      if (this.targetChangeTimer >= this.targetChangeInterval) {
        this.targetX = Math.random() * (window.innerWidth - 150);
        this.targetY = Math.random() * (window.innerHeight - 150);
        this.targetChangeTimer = 0;
        this.targetChangeInterval = 100 + Math.random() * 100;
      }

      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 5) {
        this.ax = (dx / distance) * 0.05;
        this.ay = (dy / distance) * 0.05;
      }

      this.vx += this.ax + (Math.random() - 0.5) * 0.1;
      this.vy += this.ay + (Math.random() - 0.5) * 0.1;

      const maxSpeed = 2;
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > maxSpeed) {
        this.vx = (this.vx / speed) * maxSpeed;
        this.vy = (this.vy / speed) * maxSpeed;
      }

      this.vx *= 0.98;
      this.vy *= 0.98;

      this.x += this.vx;
      this.y += this.vy;

      // Bounce logic remains
      if (this.x < 0 || this.x > window.innerWidth - 150) {
        this.vx *= -0.8;
        this.x = Math.max(0, Math.min(window.innerWidth - 150, this.x));
        this.targetX =
          this.x > window.innerWidth / 2 ? 50 : window.innerWidth - 200;
      }
      if (this.y < 0 || this.y > window.innerHeight - 150) {
        this.vy *= -0.8;
        this.y = Math.max(0, Math.min(window.innerHeight - 150, this.y));
        this.targetY =
          this.y > window.innerHeight / 2 ? 50 : window.innerHeight - 200;
      }
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}

// Initialize all hearts
const heartElements = document.querySelectorAll(".heart-container");
const hearts = Array.from(heartElements).map((el, i) => new Heart(el, i));

// Animation loop
function animate() {
  hearts.forEach((heart) => heart.update());
  requestAnimationFrame(animate);
}

// Start animation
animate();

// Handle window resize
window.addEventListener("resize", () => {
  hearts.forEach((heart) => {
    // Keep hearts in bounds on resize
    heart.x = Math.min(heart.x, window.innerWidth - 150);
    heart.y = Math.min(heart.y, window.innerHeight - 150);
    heart.updatePosition();
  });
});
