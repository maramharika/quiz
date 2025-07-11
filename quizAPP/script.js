const questions = [

      {
        question: "HTML stands for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        correct: 0
      },
      {
        question: "CSS stands for?",
        options:["casscading style sheet","casscading styles short","correct style sheet"],
        correct: 0
      },
     {
        question:"JS stand for?",
        options:["java script","java sheet","java style"],
        correct: 0
      },
      {
        question:"what kind of tag is used to connect links?",
        options:["img tag","div tag","anchor tag"],
        correct:2
      },
      {
        question: "Which language is used for web development?",
        options: ["Python", "HTML", "Java"],
        correct: 1
      },
       {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain"],
        correct: 1
        },
        {
         question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter"],
        correct: 2
        },
        {
         question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "South Korea"],
         correct: 1
         },
         {
            question:"which tag is used to break the line?",
            options:["pre","br","div"],
            correct:1
         },
         { question: "What unit is used for relative font sizing?",
             options: ["em", "px", "%"], 
             correct: 0 },
      { question: "How do you link an external CSS file?",
         options: ["link rel=stylesheet", "style src=style.css", "css href='style.css"], 
         correct: 0 },
      { question: "What is the default display of <div>?", 
        options: ["block", "inline", "inline-block", "none"],
         correct: 0 },
          { question: "What does CSS stand for?", 
            options: ["Creative Style Sheet", "Computer Style Sheet", "Cascading Style Sheets", "Colorful Style Syntax"], 
            correct: 0 
        },
      { question: "Which property changes text color in CSS?",
         options: ["color", "font-color", "text-style", "text-color"],
           correct: 0
         },
      { question: "How do you add a background color in CSS?", 
        options: ["background-color", "bg-color", "color-bg", "back-color"], 
         correct: 0
         }
    
    
    ];

    let currentIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 10;

    function loadQuestion() {
      if (currentIndex >= questions.length) return showResult();

      const q = questions[currentIndex];
      document.getElementById("question").textContent = `${currentIndex + 1}. ${q.question}`;
      const answersDiv = document.getElementById("answers");
      answersDiv.innerHTML = "";

      q.options.forEach((opt, i) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="answer" value="${i}" /> ${opt}`;
        answersDiv.appendChild(label);
      });

      timeLeft = 10;
      updateProgressBar();
      clearInterval(timer);
      timer = setInterval(() => {
        timeLeft--;
        updateProgressBar();
        if (timeLeft <= 0) {
          clearInterval(timer);
          submitAnswer();
        }
      }, 1000);

      document.getElementById("submit-btn").disabled = false;
    }

    function updateProgressBar() {
      const percent = (timeLeft / 10) * 100;
      document.getElementById("progress-bar").style.width = percent + "%";
    }

    function submitAnswer() {
      clearInterval(timer);
      const selected = document.querySelector('input[name="answer"]:checked');
      const submitBtn = document.getElementById("submit-btn");
      submitBtn.disabled = true;

      if (selected && parseInt(selected.value) === questions[currentIndex].correct) {
        score++;
      }
      currentIndex++;
      setTimeout(() => {
        loadQuestion();
      }, 300);
    }
    function submitAnswer() {
  clearInterval(timer);
  const selected = document.querySelector('input[name="answer"]:checked');
  const answerLabels = document.querySelectorAll('#answers label');
  const correctIndex = questions[currentIndex].correct;

  answerLabels.forEach((label, index) => {
    const input = label.querySelector('input');

    if (index === correctIndex) {
      label.classList.add('correct'); 
    }
    if (input.checked && index !== correctIndex) {
      label.classList.add('incorrect');  
    }

    input.disabled = true;
  });

  if (selected && parseInt(selected.value) === correctIndex) {
    score++;
  }

  document.getElementById("submit-btn").disabled = true;

  currentIndex++;
  setTimeout(() => {
    loadQuestion();
  }, 1200); 
}
    function showResult() {
  document.querySelector(".quiz-container").style.display = "none";
  document.getElementById("result-modal").style.display = "flex";
  document.getElementById("score").textContent = `${score} / ${questions.length}`;

  let starCount = Math.round((score / questions.length) * 5);
  let stars = "★".repeat(starCount) + "☆".repeat(5 - starCount);
  document.getElementById("stars").textContent = stars;

  let scores = JSON.parse(localStorage.getItem("topScores") || "[]");
  scores.push(score);
  scores.sort((a, b) => b - a);
  scores = scores.slice(0, 5);
  localStorage.setItem("topScores", JSON.stringify(scores));

  // Display scores
  const list = document.getElementById("score-list");
  list.innerHTML = "";
  scores.forEach((s, i) => {
    const li = document.createElement("li");
    li.textContent = `#${i + 1}: ${s}`;
    list.appendChild(li);
  });
}

    loadQuestion();
  
