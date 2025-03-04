document.getElementById("signupForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const experience = document.getElementById("experience").value;
    const specialties = document.getElementById("specialties").value;
    const idNumber = document.getElementById("idNumber").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const response = await fetch("https://shadow-backend-5xom.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, experience, specialties, idNumber, password, role: "provider" })
    });

    const data = await response.json();

    if (response.ok) {
        alert("Sign-up successful! Redirecting to login...");
        window.location.href = "login.html";
    } else {
        alert("Error signing up: " + data.msg);
    }
});