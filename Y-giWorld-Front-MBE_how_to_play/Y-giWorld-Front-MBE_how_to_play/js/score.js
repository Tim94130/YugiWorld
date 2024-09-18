document.addEventListener("DOMContentLoaded", function() {
  console.log("Le script est bien chargé !");
  
  let timeLeft = 20;
  let timerElement = document.getElementById('timer');
  let interval;
  let currentQuestion = 1;
  const totalQuestions = 10;
  const currentQuestionElement = document.getElementById('current-question');
  const nextButton = document.getElementById('next-btn');
  const answerButtons = document.querySelectorAll('.btn');
  let selectedAnswer = null;
  let score = 0; // Initialisation du score
  
  // Démarrer le timer
  function startTimer() {
      interval = setInterval(() => {
          timeLeft--;
          timerElement.textContent = timeLeft;
          
          if (timeLeft <= 0) {
              clearInterval(interval);
              disableAnswers();
              setTimeout(goToNextQuestion, 2000);
          }
      }, 1000);
  }

  function resetTimer() {
      timeLeft = 20;
      timerElement.textContent = timeLeft;
      clearInterval(interval);
      startTimer();
  }

  function goToNextQuestion() {
      resetTimer();
      updateQuestionNumber();
      enableAnswers();
      selectedAnswer = null;
      // Mettre à jour la question et les réponses ici...
  }

  function updateQuestionNumber() {
      if (currentQuestion < totalQuestions) {
          currentQuestion++;
          currentQuestionElement.textContent = currentQuestion;
      } else {
          nextButton.disabled = true;
          clearInterval(interval);
          // Rediriger vers la page des résultats avec le score
          window.location.href = `resultats.html?score=${score}`;
      }
  }

  function disableAnswers() {
      answerButtons.forEach(button => {
          button.disabled = true;
      });
  }

  function enableAnswers() {
      answerButtons.forEach(button => {
          button.disabled = false;
          button.classList.remove('selected');
      });
  }

  answerButtons.forEach(button => {
      button.addEventListener('click', () => {
          if (selectedAnswer) {
              selectedAnswer.classList.remove('selected');
          }
          button.classList.add('selected');
          selectedAnswer = button;
      });
  });

  startTimer();
  nextButton.addEventListener('click', goToNextQuestion);
});