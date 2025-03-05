console.log("✅ Marketplace.js is loaded!");

document.addEventListener("DOMContentLoaded", async () => {
    const providerList = document.getElementById("providerList");

    try {
        const response = await fetch("https://shadow-backend-5xom.onrender.com/api/auth/providers");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const providers = await response.json();
        providerList.innerHTML = ""; // ✅ Clear placeholder text

        providers.forEach(provider => {
            const div = document.createElement("div");
            div.className = "provider-card";
            div.innerHTML = `
                <h3>${provider.name}</h3>
                <p><strong>Experience:</strong> ${provider.experience}</p>
                <p><strong>Specialties:</strong> ${provider.specialties}</p>
                <button onclick="hireProvider('${provider._id}')">Hire</button>
            `;
            providerList.appendChild(div);
        });

    } catch (error) {
        console.error("❌ Failed to load providers:", error);
        providerList.innerHTML = `<p>Failed to load providers. Try again later.</p>`;
    }
});

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
        console.error("❌ Error sending job request:", error);
        alert("Failed to send job request.");
    }
}
