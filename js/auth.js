// ================= SIGNUP =================

function signup() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (name === "" || email === "" || password === "") {
        alert("Please fill all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("Email already registered.");
        return;
    }

    users.push({
        name: name,
        email: email,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login.");
    window.location.href = "login.html";
}


// ================= LOGIN =================

function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Admin login
    if (email === "admin@gmail.com" && password === "admin123") {

        localStorage.setItem("loggedInUser", JSON.stringify({
            name: "Administrator",
            email: email,
            role: "admin"
        }));

        window.location.href = "admin/dashboard.html";
        return;
    }

    // User login
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        alert("Invalid email or password.");
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify({
        name: user.name,
        email: user.email,
        role: "user"
    }));

    window.location.href = "user/dashboard.html";
}


// ================= LOGOUT =================

function logout() {

    localStorage.removeItem("loggedInUser");

    alert("You have been logged out.");

    window.location.href = "../index.html";
}