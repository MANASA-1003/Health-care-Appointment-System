// ================= USER NAME =================

function loadUserName() {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user || user.role !== "user") {
        window.location.href = "../login.html";
        return;
    }

    const userName = document.getElementById("userName");

    if (userName) {
        userName.textContent = user.name;
    }
}


// ================= BOOK APPOINTMENT =================

function bookAppointment() {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
        alert("Please login first.");
        window.location.href = "../login.html";
        return;
    }

    const doctor = document.getElementById("doctor").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const reason = document.getElementById("reason").value.trim();

    if (doctor === "" || date === "" || time === "" || reason === "") {
        alert("Please fill all appointment details.");
        return;
    }

    let appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    const appointment = {

        id: Date.now(),

        patientName: user.name,

        patientEmail: user.email,

        doctor: doctor,

        date: date,

        time: time,

        reason: reason,

        status: "Pending"

    };

    appointments.push(appointment);

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    alert("Appointment booked successfully!");

    window.location.href = "appointments.html";
}


// ================= DISPLAY USER APPOINTMENTS =================

function loadUserAppointments() {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user || user.role !== "user") {
        window.location.href = "../login.html";
        return;
    }

    const appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    const userAppointments = appointments.filter(
        appointment => appointment.patientEmail === user.email
    );

    const tableBody = document.getElementById("appointmentList");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (userAppointments.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    No appointments found.
                </td>
            </tr>
        `;

        return;
    }

    userAppointments.forEach(appointment => {

        let statusClass = "pending";

        if (appointment.status === "Accepted") {
            statusClass = "accepted";
        }

        if (appointment.status === "Rejected") {
            statusClass = "rejected";
        }

        tableBody.innerHTML += `
            <tr>

                <td>${appointment.doctor}</td>

                <td>${appointment.date}</td>

                <td>${appointment.time}</td>

                <td>${appointment.reason}</td>

                <td>
                    <span class="status ${statusClass}">
                        ${appointment.status}
                    </span>
                </td>

                <td>
                    ${
                        appointment.status === "Accepted"
                        ? "✅ Confirmed"
                        : appointment.status === "Rejected"
                        ? "❌ Not Approved"
                        : "⏳ Waiting"
                    }
                </td>

            </tr>
        `;
    });
}


// ================= FEEDBACK =================

function submitFeedback() {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user || user.role !== "user") {
        alert("Please login first.");
        return;
    }

    const rating = document.getElementById("rating").value;
    const message = document.getElementById("message").value.trim();

    if (rating === "" || message === "") {
        alert("Please provide rating and feedback.");
        return;
    }

    let feedbacks =
        JSON.parse(localStorage.getItem("feedbacks")) || [];

    feedbacks.push({

        id: Date.now(),

        name: user.name,

        email: user.email,

        rating: rating,

        message: message,

        date: new Date().toLocaleDateString()

    });

    localStorage.setItem(
        "feedbacks",
        JSON.stringify(feedbacks)
    );

    alert("Thank you! Your feedback has been submitted.");

    document.getElementById("message").value = "";

    window.location.href = "dashboard.html";
}