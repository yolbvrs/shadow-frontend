document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // ✅ Prevent form reload

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://shadow-backend-5xom.onrender.com/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // ✅ Store token, user ID, and role
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("role", data.role);

            alert("Login successful!");

            // ✅ Redirect based on role
            if (data.role === "provider") {
                window.location.href = "provider-dashboard.html";
            } else {
                window.location.href = "customer-dashboard.html";
            }
        } else {
            alert("Error: " + data.msg);
        }
    } catch (error) {
        console.error("❌ Login request failed:", error);
        alert("Failed to log in. Please try again.");
    }
});