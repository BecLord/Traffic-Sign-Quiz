const attemptsSection = document.getElementById("attempts");
const noAttempts = document.getElementById("noAttempts");

const users = JSON.parse(localStorage.getItem("users")) || {};
const user = users[localStorage.getItem("currentUser")];

if (!user) {
    window.location.href = "login.html";
} else {
    showAttempts();
}

function showAttempts() {
    const attempts = user.attempts || [];

    if (attempts.length > 0) {
        noAttempts.hidden = true;
    }

    for (let i = 0; i < attempts.length; i++) {
        const attempt = attempts[i];
        const attemptBox = document.createElement("article");

        const scoreText = document.createElement("p");
        scoreText.innerText = "Score: " + attempt.score + "/10";

        const dateText = document.createElement("p");
        dateText.innerText = "Date: " + attempt.date;

        const resultText = document.createElement("p");
        resultText.innerText = attempt.score >= 8 ? "Passed" : "Failed";

        attemptBox.appendChild(scoreText);
        attemptBox.appendChild(dateText);
        attemptBox.appendChild(resultText);
        attemptsSection.appendChild(attemptBox);
    }
}
