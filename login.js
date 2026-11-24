const signup = document.getElementById("signupForm");
const login = document.getElementById("loginForm");
const signupMessage = document.getElementById("signupMessage");
const loginMessage = document.getElementById("loginMessage");

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || {};
}

signup.onsubmit = function (event) {
    event.preventDefault();

    const email = document.getElementById("signupemail").value.trim().toLowerCase();
    const password = document.getElementById("signuppassword").value;
    const users = getUsers();

    if (users[email]) {
        signupMessage.innerText = "An account with that email already exists";
        return;
    }

    users[email] = { email: email, password: password, attempts: [] };
    localStorage.setItem("users", JSON.stringify(users));

    signupMessage.innerText = "Account created, please log in";
    signup.reset();
};

login.onsubmit = function (event) {
    event.preventDefault();

    const email = document.getElementById("loginemail").value.trim().toLowerCase();
    const password = document.getElementById("loginpassword").value;
    const savedUser = getUsers()[email];

    if (!savedUser) {
        loginMessage.innerText = "Please create an account";
    } else if (password === savedUser.password) {
        localStorage.setItem("currentUser", email);
        window.location.href = "quiz.html";
    } else {
        loginMessage.innerText = "Email or password is incorrect";
    }
};
