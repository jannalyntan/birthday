document.addEventListener("DOMContentLoaded", function () {
  // Total number of steps
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
  const introbtn = document.querySelector(".intro-btn");
  introbtn.addEventListener("click", function () {
    goToNextStep("intro", "how-to");
  });

  // How-to
  const howToBtn = document.querySelector(".how-to-btn");
  howToBtn.addEventListener("click", function () {
    goToNextStep("how-to", "simple-right");

    // Countdown
    const countdownEl = document.getElementById("countdown-1");
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

  // Task 1
  const task1Btn = document.querySelector(".task-1-btn");
  const task1Input = document.querySelector(".task-1-input");
  const popup = document.getElementById("custom-popup");
  const popupMessage = document.getElementById("popup-message");
  const popupClose = document.getElementById("popup-close");

  function showPopup(message) {
    popupMessage.textContent = message;
    popup.classList.remove("hidden");
  }

  popupClose.addEventListener("click", function () {
    popup.classList.add("hidden");
  });

  task1Btn.addEventListener("click", function () {
    const value = task1Input.value.trim().toLowerCase();
    if (value === "kiss" || value === "Kiss") {
      goToNextStep("task1", "reward1");
    } else {
      showPopup("Hmm... try giving me something I can't resist 😘");
    }
  });

  // Reward 1
  const reward1btn = document.querySelector(".reward-1-btn");
  reward1btn.addEventListener("click", function () {
    goToNextStep("reward1", "too-simple-right");

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

  // Question 1 – Photo selection
  const selectableImages = document.querySelectorAll(".Question1 .selectable");

  selectableImages.forEach((img) => {
    img.addEventListener("click", () => {
      selectableImages.forEach((el) => el.classList.remove("selected"));
      img.classList.add("selected");
      selectedImage = img;
    });
  });

  const question1Btn = document.querySelector(".question-1-btn");
  question1Btn.addEventListener("click", () => {
    if (!selectedImage) {
      showPopup("Oops! Please select a photo before continuing.");
    } else {
      goToNextStep("Question1", "Question1-reveal");
    }
  });

  // Reveal
  const question1RevealBtn = document.querySelector(".question-1-reveal-btn");
  question1RevealBtn.addEventListener("click", function () {
    goToNextStep("Question1-reveal", "Question1-reveal-1");
  });

  const question1Revealbtn1 = document.querySelector(".question-1-reveal-btn-1");
  question1Revealbtn1.addEventListener("click", function () {
    goToNextStep("Question1-reveal-1", "Question2");
  });

  // Question 2
  const question2Input = document.querySelector(".Question2 input");
  const question2Btn = document.querySelector(".Question2 button");
  const finalPresent = document.querySelector(".FinalPresent");

  question2Btn.addEventListener("click", function () {
    const answer = question2Input.value.trim().toLowerCase();

    if (answer === "girlfriend") {
      goToNextStep("Question2", "FinalPresent");
    } else {
      showPopup("Awww... close but not quite. Try the word I want to hear from you 🥺");
    }
  });
});


  // Final Present → Sike
  const finalBtn = document.getElementById("final-btn");
  const sikeScreen = document.getElementById("sike-screen");
  const continueScreen = document.getElementById("continue-screen");
  const finalPresent = document.querySelector(".FinalPresent");

  finalBtn.addEventListener("click", function () {
    // Hide FinalPresent, show Sike
    finalPresent.classList.add("hidden");
    sikeScreen.classList.remove("hidden");

    // After 3 seconds, switch to Continue
    setTimeout(() => {
      sikeScreen.classList.add("hidden");
      continueScreen.classList.remove("hidden");
    }, 1500);
  });

  // Optional: your existing final reveal logic
  const finalRevealBtn = document.querySelector(".final-reveal-btn");
  if (finalRevealBtn) {
    finalRevealBtn.addEventListener("click", function () {
      goToNextStep("Question1-reveal", "Question1-reveal-1");
    });
  }


