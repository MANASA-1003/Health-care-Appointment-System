// ================= ADMIN CHECK =================

function checkAdmin() {

    const user =
        JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user || user.role !== "admin") {
        window.location.href = "../login.html";
        return false;
    }

    return true;
}


// ================= ADMIN APPOINTMENTS =================

function loadAdminAppointments() {

    if (!checkAdmin()) return;

    const appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    const tableBody =
        document.getElementById("adminAppointmentList");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (appointments.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    No appointments available.
                </td>
            </tr>
        `;

        return;
    }

    appointments.forEach(appointment => {

        let statusClass = "pending";

        if (appointment.status === "Accepted") {
            statusClass = "accepted";
        }

        if (appointment.status === "Rejected") {
            statusClass = "rejected";
        }

        tableBody.innerHTML += `

            <tr>

                <td>${appointment.patientName}</td>

                <td>${appointment.patientEmail}</td>

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
                        appointment.status === "Pending"
                        ? `
                            <button
                                class="accept-btn"
                                onclick="updateAppointment(${appointment.id}, 'Accepted')">
                                Accept
                            </button>

                            <button
                                class="reject-btn"
                                onclick="updateAppointment(${appointment.id}, 'Rejected')">
                                Reject
                            </button>
                          `
                        : `
                            <button
                                class="delete-btn"
                                onclick="deleteAppointment(${appointment.id})">
                                Delete
                            </button>
                          `
                    }

                </td>

            </tr>

        `;
    });
}


// ================= ACCEPT / REJECT =================

function updateAppointment(id, newStatus) {

    let appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    const appointment =
        appointments.find(a => a.id === id);

    if (!appointment) return;

    appointment.status = newStatus;

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    alert("Appointment " + newStatus + ".");

    loadAdminAppointments();
}


// ================= DELETE =================

function deleteAppointment(id) {

    let appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    appointments = appointments.filter(
        appointment => appointment.id !== id
    );

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    loadAdminAppointments();
}


// ================= ADMIN FEEDBACK =================

function loadAdminFeedback() {

    if (!checkAdmin()) return;

    const feedbacks =
        JSON.parse(localStorage.getItem("feedbacks")) || [];

    const tableBody =
        document.getElementById("feedbackList");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (feedbacks.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    No feedback received.
                </td>
            </tr>
        `;

        return;
    }

    feedbacks.forEach(feedback => {

        tableBody.innerHTML += `

            <tr>

                <td>${feedback.name}</td>

                <td>${feedback.email}</td>

                <td>
                    <span class="rating">
                        ${"★".repeat(Number(feedback.rating))}
                    </span>
                </td>

                <td>${feedback.message}</td>

                <td>${feedback.date}</td>

            </tr>

        `;
    });
}


// ================= ADMIN DASHBOARD COUNTS =================

function loadAdminDashboard() {

    if (!checkAdmin()) return;

    const appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    const users =
        JSON.parse(localStorage.getItem("users")) || [];

    const feedbacks =
        JSON.parse(localStorage.getItem("feedbacks")) || [];

    const totalAppointments =
        document.getElementById("totalAppointments");

    const totalUsers =
        document.getElementById("totalUsers");

    const totalFeedback =
        document.getElementById("totalFeedback");

    if (totalAppointments) {
        totalAppointments.textContent =
            appointments.length;
    }

    if (totalUsers) {
        totalUsers.textContent =
            users.length;
    }

    if (totalFeedback) {
        totalFeedback.textContent =
            feedbacks.length;
    }
}