const quizData = [
    {
        //Question 1 Stop Sign
        question: "What does this sign mean?",
        image: "signs/q1.png",
        options: ["You must come to a complete halt",
            "You have the right of way",
            "You must yield to traffic"
        ],
        answer: "You must come to a complete halt"
    },
    {
        //Question 2. Yield Sign
        question: "What does this sign mean?",
        image: "signs/q2.png",
        options: ["You must give way to traffic or other road users who have right of way",
            "You must stop here",
            "Parking is permitted here"],
        answer: "You must give way to traffic or other road users who have right of way"

    },
    {
        //Question 3. Speed Limit Sign
        question: "What does this sign mean?",
        image: "signs/q3.png",
        options: ["The minimum speed here is 50km/h",
            "The maximum speed here is 50km/h",
            "Parking is permitted here for 50 minutes"],
        answer: "The maximum speed here is 50km/h"

    },
    {
        //Question 4. Roundabout Ahead Sign
        question: "What does this sign mean?",
        image: "signs/q4.png",
        options: ["There is a mini-roundabout ahead",
            "The road ahead turns back on itself in a tight loop",
            "There is a roundabout ahead"],
        answer: "There is a roundabout ahead"

    },
    {   //Question 5. Two-way Traffic Sign
        question: "What does this sign mean?",
        image: "signs/q5.png",
        options: ["Traffic is going in both directions",
            "Traffic is going in one direction",
            "You can drive what ever dirction you like"],
        answer: "Traffic is going in both directions"

    },
    {   //Question 6. No Parking Sign
        question: "What does this sign mean?",
        image: "signs/q6.png",
        options: ["You must not stop or park here during the hours shown",
            "Parking is permitted here",
            "Parking is not permitted here"],
        answer: "Parking is not permitted here"

    },
    {   //Question 7. Road words ahead Sign
        question: "What does this sign mean?",
        image: "signs/q7.png",
        options: ["The roadworks finish at this point",
            "There are roadworks on the road ahead",
            "A flagman is controlling traffic ahead"],
        answer: "There are roadworks on the road ahead"

    },
    {   //Question 8. Cul-de-sac Sign
        question: "What does this sign mean?",
        image: "signs/q8.png",
        options: ["Motorway rules no longer apply from this point",
            "There is a hospital 500 meters ahead",
            "The road ahead has no through road"],
        answer: "The road ahead has no through road"

    },
    {   //Question 9. Dangerous Bend Ahead Sign
        question: "What does this sign mean?",
        image: "signs/q9.png",
        options: ["There is a dangerous corner to the left ahead",
            "There is a sharp change of direction to the left",
            "There is a dangerous bend to the left ahead"],
        answer: "There is a dangerous bend to the left ahead"

    },
    {   //Question 10. 200 Meters to the Next Exit Sign
        question: "What does this sign mean?",
        image: "signs/q10.png",
        options: ["The next exit is 200 meters away",
            "The motorway ends in 200 meters",
            "Motorway rules no longer apply from this point"],
        answer: "The next exit is 200 meters away"
    }
];


const currentEmail = localStorage.getItem("currentUser");
if (!currentEmail || !getUsers()[currentEmail]) {
    window.location.href = "login.html";
}

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || {};
}

let quizFinished = false;
let currentQuestion = 0;
let answers = [];
let timeLeft = 180;
let countdown = null;

const timer = document.getElementById("timer");
const questionNumber = document.getElementById("questionNumber");
const question = document.getElementById("question");
const image = document.getElementById("image");
const optionsSection = document.getElementById("options");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const submit = document.getElementById("submit");
const result = document.getElementById("result");
const wrongAnswers = document.getElementById("wrongAnswers");
const tryAgain = document.getElementById("tryAgain");

function showQuestion() {
    const current = quizData[currentQuestion];

    questionNumber.innerText = "Question " + (currentQuestion + 1) + " of " + quizData.length;
    question.innerText = current.question;
    image.src = current.image;

    optionsSection.innerHTML = "";

    current.options.forEach(function (option) {
        const button = document.createElement("button");
        button.innerText = option;

        if (answers[currentQuestion] === option) {
            button.style.backgroundColor = "pink";
        }

        button.disabled = quizFinished;
        button.onclick = function () {
            answers[currentQuestion] = option;
            showQuestion();
        };
        optionsSection.appendChild(button);
    });

    previous.disabled = quizFinished || currentQuestion === 0;
    next.disabled = quizFinished || currentQuestion === quizData.length - 1;
}

next.onclick = function () {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        showQuestion();
    }
};

previous.onclick = function () {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
};

submit.onclick = function () {
    finishQuiz();
};

function updateTimerText() {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    timer.innerText = "Time Left: 0" + minutes + ":" + seconds;
}

function startTimer() {
    clearInterval(countdown);
    updateTimerText();

    countdown = setInterval(function () {
        timeLeft--;
        updateTimerText();

        if (timeLeft <= 0) {
            clearInterval(countdown);
            finishQuiz();
        }
    }, 1000);
}

function finishQuiz() {
    if (quizFinished) {
        return;
    }
    quizFinished = true;
    clearInterval(countdown);

    let score = 0;
    wrongAnswers.innerHTML = "";

    for (let i = 0; i < quizData.length; i++) {
        if (answers[i] === quizData[i].answer) {
            score++;
        } else {
            const wrongQuestion = document.createElement("p");
            wrongQuestion.innerText = "Question " + (i + 1) + ": the correct answer is \"" + quizData[i].answer + "\"" +
                (answers[i] === undefined ? " (not answered)" : "");
            wrongAnswers.appendChild(wrongQuestion);
        }
    }

    const users = getUsers();
    const user = users[currentEmail];
    if (user) {
        if (user.attempts === undefined) {
            user.attempts = [];
        }
        user.attempts.push({
            score: score,
            date: new Date().toLocaleString()
        });
        localStorage.setItem("users", JSON.stringify(users));
    }

    if (score >= 8) {
        result.innerText = "You passed with a score of " + score + "/10";
        tryAgain.hidden = true;
    } else {
        result.innerText = "You failed with a score of " + score + "/10";
        tryAgain.hidden = false;
    }

    submit.disabled = true;
    showQuestion(); 
}

tryAgain.onclick = function () {
    quizFinished = false;
    currentQuestion = 0;
    answers = [];
    timeLeft = 180;

    result.innerText = "";
    wrongAnswers.innerHTML = "";
    tryAgain.hidden = true;
    submit.disabled = false;

    showQuestion();
    startTimer();
};

showQuestion();
startTimer();
