// Total number of steps (adjust if you add/remove sections)
const totalSteps = 8;
let currentStep = 1;

const progressBar = document.getElementById("progress-bar");

// Helper: go to the next section
function goToNextStep(currentClass, nextClass) {
  document.querySelector(`.${currentClass}`).classList.add("hidden");
  document.querySelector(`.${nextClass}`).classList.remove("hidden");
  currentStep++;
  updateProgressBar();
}

// Progress bar updater
function updateProgressBar() {
  const progress = (currentStep / totalSteps) * 100;
  progressBar.style.width = `${progress}%`;
}

const intro = document.querySelector(".intro");
console.log(intro);

const howTo = document.querySelector(".how-to");
console.log(howTo);

const introbtn = document.querySelector(".intro-btn");
console.log(introbtn);

introbtn.addEventListener("click", function () {
  intro.classList.add("hidden");
  howTo.classList.remove("hidden");
});

const howToBtn = document.querySelector(".how-to-btn");
console.log(howToBtn);

const task1 = document.querySelector(".task1");
console.log(task1);

howToBtn.addEventListener("click", function () {
  howTo.classList.add("hidden");
  task1.classList.remove("hidden");
});
