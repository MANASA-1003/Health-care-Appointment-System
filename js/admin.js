// ======================================
// ADMIN AUTHENTICATION
// ======================================

let loggedInUser =
    JSON.parse(
        localStorage.getItem("loggedInUser")
    );


if (
    !loggedInUser ||
    loggedInUser.role !== "admin"
) {

    window.location.href =
        "../login.html";
}



// ======================================
// DEFAULT DOCTORS
// ======================================

let doctors =
    JSON.parse(
        localStorage.getItem("doctors")
    );


if (!doctors) {

    doctors = [

        {
            id: 1,
            name: "Dr. Ravi Kumar",
            specialization: "Cardiologist",
            experience: "10 years"
        },

        {
            id: 2,
            name: "Dr. Priya Sharma",
            specialization: "Dermatologist",
            experience: "7 years"
        },

        {
            id: 3,
            name: "Dr. Arjun Rao",
            specialization: "Pediatrician",
            experience: "8 years"
        }

    ];


    localStorage.setItem(
        "doctors",
        JSON.stringify(doctors)
    );
}



// ======================================
// DASHBOARD COUNTS
// ======================================

let doctorCount =
    document.getElementById(
        "doctorCount"
    );


if (doctorCount) {

    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    let appointments =
        JSON.parse(
            localStorage.getItem("appointments")
        ) || [];


    let doctors =
        JSON.parse(
            localStorage.getItem("doctors")
        ) || [];


    doctorCount.innerText =
        doctors.length;


    document.getElementById(
        "userCount"
    ).innerText =
        users.length;


    document.getElementById(
        "appointmentCount"
    ).innerText =
        appointments.length;

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