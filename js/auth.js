// ========================================
// SIGNUP
// ========================================

let signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            let name =
                document.getElementById("name").value.trim();

            let email =
                document.getElementById("email").value.trim();

            let password =
                document.getElementById("password").value;

            let confirmPassword =
                document.getElementById("confirmPassword").value;


            // Check password

            if (password !== confirmPassword) {

                alert("Passwords do not match!");

                return;
            }


            // Get existing users

            let users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];


            // Check existing email

            let existingUser =
                users.find(
                    user => user.email === email
                );


            if (existingUser) {

                alert(
                    "This email is already registered!"
                );

                return;
            }


            // Create user

            let newUser = {

                name: name,

                email: email,

                password: password,

                role: "user"
            };


            // Add user

            users.push(newUser);


            // Save to Local Storage

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );


            alert(
                "Signup successful! Please login."
            );


            window.location.href =
                "login.html";
        }
    );
}



// ========================================
// LOGIN
// ========================================

let loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            let email =
                document
                .getElementById("loginEmail")
                .value
                .trim();


            let password =
                document
                .getElementById("loginPassword")
                .value;


            // ====================================
            // ADMIN LOGIN
            // ====================================

            if (
                email === "admin@gmail.com" &&
                password === "admin123"
            ) {

                let admin = {

                    name: "Administrator",

                    email: email,

                    role: "admin"
                };


                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(admin)
                );


                window.location.href =
                    "admin/dashboard.html";


                return;
            }


            // ====================================
            // USER LOGIN
            // ====================================

            let users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];


            let user =
                users.find(
                    user =>
                        user.email === email &&
                        user.password === password
                );


            if (!user) {

                alert(
                    "Invalid email or password!"
                );

                return;
            }


            // Save logged-in user

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(user)
            );


            // Redirect to User Module

            window.location.href =
                "user/dashboard.html";
        }
    );
}