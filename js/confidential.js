document.addEventListener("DOMContentLoaded", async () => {
    const jobList = document.getElementById("jobList");

    // ✅ Load jobs from backend
    async function loadJobs() {
        try {
            const response = await fetch("https://shadow-backend-5xom.onrender.com/api/jobs");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const jobs = await response.json();
            jobList.innerHTML = ""; // Clear placeholder text

            jobs.forEach(job => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${job.title}</td>
                    <td>${job.location}</td>
                    <td>${job.rate}</td>
                    <td><button onclick="viewDetails('${job._id}')">View</button></td>
                    <td><button onclick="applyForJob('${job._id}')">Apply</button></td>
                `;
                jobList.appendChild(row);
            });

        } catch (error) {
            console.error("❌ Error loading jobs:", error);
            jobList.innerHTML = `<tr><td colspan="5">Failed to load jobs. Try again later.</td></tr>`;
        }
    }

    // ✅ Load jobs on page load
    loadJobs();
});

// ✅ Apply for a job
async function applyForJob(jobId) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in to apply.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(`https://shadow-backend-5xom.onrender.com/api/jobs/apply/${jobId}`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await response.json();
        alert(data.msg);
    } catch (error) {
        console.error("❌ Error applying for job:", error);
        alert("Failed to apply.");
    }
}