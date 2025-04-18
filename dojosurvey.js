let currentQuestion = 0;
const questions = document.querySelectorAll(".question");
const progressBar = document.getElementById("progress");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    questions[currentQuestion].classList.remove("active");
    currentQuestion++;
    questions[currentQuestion].classList.add("active");
    updateButtons();
    updateProgressBar();
  } else {
    alert("Survey completed!");
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    questions[currentQuestion].classList.remove("active");
    currentQuestion--;
    questions[currentQuestion].classList.add("active");
    updateButtons();
    updateProgressBar();
  }
}

function updateButtons() {
  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "Submit" : "Next";
}

function updateProgressBar() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = progress + "%";
}

function showOtherInput(selectElement, inputId) {
  const inputField = document.getElementById(inputId);
  if (selectElement.value === "Other") {
    inputField.style.display = "block";
  } else {
    inputField.style.display = "none";
  }
}