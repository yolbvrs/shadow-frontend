async function hireProvider(providerId) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in to hire a provider.");
        window.location.href = "login.html";
        return;
    }

    const jobDetails = prompt("Enter job details (e.g., location, time, job type):");
    if (!jobDetails) return;

    try {
        const response = await fetch("https://shadow-backend-5xom.onrender.com/api/jobs/request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                customerId: localStorage.getItem("userId"), // ✅ Ensure this is set when logging in
                providerId,
                jobDetails
            })
        });

        const data = await response.json();
        alert(data.msg);
    } catch (error) {
        console.error("Error sending job request:", error);
        alert("Failed to send job request.");
    }
}

// ✅ Ensure this function is globally available
window.hireProvider = hireProvider;