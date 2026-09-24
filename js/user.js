// ======================================
// GET LOGGED-IN USER
// ======================================

let currentUser =
    JSON.parse(
        localStorage.getItem(
            "loggedInUser"
        )
    );


// ======================================
// CHECK USER LOGIN
// ======================================

if (
    !currentUser ||
    currentUser.role !== "user"
) {

    window.location.href =
        "../login.html";
}


// ======================================
// DISPLAY USER NAME
// ======================================

let userName =
    document.getElementById(
        "userName"
    );


if (userName) {

    userName.innerText =
        currentUser.name;

}


// ======================================
// LOGOUT
// ======================================

function logout() {

    localStorage.removeItem(
        "loggedInUser"
    );


    window.location.href =
        "../login.html";
}