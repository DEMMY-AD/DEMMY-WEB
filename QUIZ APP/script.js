const questions = [
    {
      question: "Who is the CEO of 8th Gear Hub and Venture Studio?",
      answers: [
        { text: "Khadija", correct: false },
        { text: "Oluwademilade Adeyemo", correct: true },
        { text: "Opeyemi", correct: false },
        { text: "Aisha", correct: false },
      ],
    },
    {
      question: "What year was Demmy born?",
      answers: [
        { text: "1990", correct: false },
        { text: "2000", correct: false },
        { text: "2019", correct: false },
        { text: "2005", correct: true },
      ],
    },
    {
      question: "Who is Demmy sef?",
      answers: [
        { text: "A first born girl", correct: true },
        { text: "Just a girl", correct: false },
        { text: "Just a first", correct: false },
        { text: "Neither", correct: false },
      ],
    },
  ];
  
  const loginSection = document.getElementById("login");
  const quizSection = document.getElementById("quiz");
  const teamInput = document.getElementById("team");
  const nameInput = document.getElementById("name");
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const startButton = document.getElementById("start-btn");
  const nextButton = document.getElementById("next-btn");
  const endButton = document.getElementById("end-btn");
  const scoreDisplay = document.getElementById("score-display");
  const storedScoreDisplay = document.getElementById("stored-score-display");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  startButton.addEventListener("click", startQuiz);
  nextButton.addEventListener("click", showNextQuestion);
  endButton.addEventListener("click", showScore);
  
  function startQuiz() {
    loginSection.style.display = "none";
    quizSection.style.display = "block";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    endButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
      selectedButton.classList.add("correct");
      score++;
    } else {
      selectedButton.classList.add("incorrect");
      const correctButton = Array.from(answerButtons.children).find(
        (button) => button.dataset.correct === "true"
      );
      if (correctButton) {
        correctButton.classList.add("correct");
      }
    }
    Array.from(answerButtons.children).forEach((button) => {
      button.disabled = true;
    });
  
    if (currentQuestionIndex === questions.length - 1) {
      nextButton.style.display = "none";
      endButton.style.display = "block";
    }else{
        nextButton.style.display = "block";
        endButton.style.display = "block";
    }
  }
  
  function showNextQuestion() {
    currentQuestionIndex++;
    showQuestion();
  }
  
  function showScore() {
    resetState();
    questionElement.innerHTML = `Omooo...     ${nameInput.value} scored ${score} out of ${questions.length} sha`;
    nextButton.style.display = "none";

    // Store the score locally
    const quizResults = {
      timestamp: new Date().toLocaleString(),
      score: score,
      totalQuestions: questions.length,
    };
    localStorage.setItem("quizResults", JSON.stringify(quizResults));
  
    // Retrieve and display the stored score
    const storedResultsString = localStorage.getItem("quizResults");
    const storedResults = JSON.parse(storedResultsString);
    storedScoreDisplay.textContent = `Stored Score: ${storedResults.score} out of ${storedResults.totalQuestions}`;
    storedScoreDisplay.style.display = "block";
  
    // Display stored team and name, if available
    const storedTeam = localStorage.getItem("selectedTeam");
    const storedName = localStorage.getItem("selectedName");
    const teamDisplay = document.getElementById("team-display");
    const nameDisplay = document.getElementById("name-display");
    teamDisplay.textContent = `Team: ${storedTeam}`;
    nameDisplay.textContent = `Name: ${storedName}`;
  }
  
  function storeDataAndStartQuiz() {
    const selectedTeam = teamInput.value;
    const selectedName = nameInput.value;
  
    localStorage.setItem("selectedTeam", selectedTeam);
    localStorage.setItem("selectedName", selectedName);
  
    startQuiz();
}
  
  startButton.addEventListener("click", storeDataAndStartQuiz);
  startButtonhandler
  
  // Retrieve stored team and name from local storage
  const storedTeam = localStorage.getItem("selectedTeam");
  const storedName = localStorage.getItem("selectedName");
  
 