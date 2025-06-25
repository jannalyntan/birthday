document.addEventListener("DOMContentLoaded", function () {
  // Total number of steps (adjust if you add/remove sections)
  let selectedImage = null;

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

  // Intro
  const intro = document.querySelector(".intro");
  console.log(intro);

  const howTo = document.querySelector(".how-to");
  console.log(howTo);

  const introbtn = document.querySelector(".intro-btn");
  console.log(introbtn);

  introbtn.addEventListener("click", function () {
    goToNextStep("intro", "how-to");
  });

  // How to
  const howToBtn = document.querySelector(".how-to-btn");
  console.log(howToBtn);

  const task1 = document.querySelector(".task1");
  console.log(task1);

  howToBtn.addEventListener("click", function () {
    goToNextStep("how-to", "simple-right");

    // Simple Right
    const countdownEl = document.getElementById("countdown-1");

    // Start 5-second countdown
    let seconds = 5;
    countdownEl.textContent = `Starting in ${seconds}...`;

    const countdownInterval = setInterval(() => {
      seconds--;
      if (seconds > 0) {
        countdownEl.textContent = `Starting in ${seconds}...`;
      } else {
        clearInterval(countdownInterval);
        goToNextStep("simple-right", "task1");
      }
    }, 1000);
  });

  // Key In
  const task1Btn = document.querySelector(".task-1-btn");
  console.log(task1Btn);

  const task1Input = document.querySelector(".task-1-input");
  console.log(task1Input);

  const popup = document.getElementById("custom-popup");

  const popupMessage = document.getElementById("popup-message");

  const popupClose = document.getElementById("popup-close");

  // Function to show popup
  function showPopup(message) {
    popupMessage.textContent = message;
    popup.classList.remove("hidden");
  }

  // Function to close popup
  popupClose.addEventListener("click", function () {
    popup.classList.add("hidden");
  });

  task1Btn.addEventListener("click", function () {
    const value = task1Input.value.trim().toLowerCase();
    if (value === "kiss" || value === "hug") {
      goToNextStep("task1", "reward1");
    } else {
      showPopup("Hmm... try giving me something I can't resist 😘");
    }
  });

  //too-simple-right
  const reward1btn = document.querySelector(".reward-1-btn");
  console.log(reward1btn);

  reward1btn.addEventListener("click", function () {
    goToNextStep("reward1", "too-simple-right");

    // Simple Right Countdown
    const countdownEl1 = document.getElementById("countdown-2");
    let seconds = 5;
    countdownEl1.textContent = `Continuing in ${seconds}...`;

    const countdownInterval = setInterval(() => {
      seconds--;
      if (seconds > 0) {
        countdownEl1.textContent = `Continuing in ${seconds}...`;
      } else {
        clearInterval(countdownInterval);
        goToNextStep("too-simple-right", "Question1");
      }
    }, 1000);
  });

  //photo-grid
  const question1 = document.querySelector(".Question1");
  console.log(question1);

  const photo1 = document.querySelector("#photo-1");
  console.log(photo1);
  const photo2 = document.querySelector("#photo-2");
  console.log(photo2);
  const photo3 = document.querySelector("#photo-3");
  console.log(photo3);
  const photo4 = document.querySelector("#photo-4");
  console.log(photo4);

  // Select and highlight one photo
  const selectableImages = document.querySelectorAll(".Question1 .selectable");

  selectableImages.forEach((img) => {
    img.addEventListener("click", () => {
      selectableImages.forEach((el) => el.classList.remove("selected"));
      img.classList.add("selected");
      selectedImage = img;
    });
  });

  // Confirm button for Question 1
  const question1Btn = document.querySelector(".question-1-btn");

  question1Btn.addEventListener("click", () => {
    if (!selectedImage) {
      showPopup("Oops! Please select a photo before continuing.");
    } else {
      goToNextStep("Question1", "Question1-reveal");
    }
  });

  // Reveal Answer
  const question1RevealBtn = document.querySelector(".question-1-reveal-btn");
  console.log(question1RevealBtn);

  const question1Reveal = document.querySelector(".Question1-reveal-1");
  console.log(question1Reveal);

  question1RevealBtn.addEventListener("click", function () {
    goToNextStep("Question1-reveal", "Question1-reveal-1");
  });

  const question1Revealbtn1 = document.querySelector(
    ".question-1-reveal-btn-1"
  );
  console.log(question1Revealbtn1);

  const question2 = document.querySelector(".Question2");
  console.log(question2);

  question1Revealbtn1.addEventListener("click", function () {
    goToNextStep("Question1-reveal-1", "Question2");
  });
});
