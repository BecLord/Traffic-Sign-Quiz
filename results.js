const attemptsElement = document.getElementById("attempts");
const users = JSON.parse(localStorage.getItem("users")) || {};
const user = users[localStorage.getItem("currentUser")];

if (!user) {
    window.location.href = "login.html";
} else if (!user.attempts || user.attempts.length === 0) {
    attemptsElement.innerText = "You have no previous attempts";
} else {
    for (let i = 0; i < user.attempts.length; i++) {
        const attempt = document.createElement("p");
        attempt.innerText = "Attempt " + (i + 1) + " - " + user.attempts[i].score + "/10 on " + user.attempts[i].date;
        attemptsElement.appendChild(attempt);
    }
}
