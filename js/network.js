document.addEventListener("DOMContentLoaded", async () => {
    const jobList = document.getElementById("jobList");

    // ✅ Load posted jobs from the backend
    async function loadJobs() {
        try {
            const response = await fetch("https://shadow-backend-5xom.onrender.com/api/jobs");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const jobs = await response.json();
            jobList.innerHTML = "";

            jobs.forEach(job => {
                const div = document.createElement("div");
                div.className = "job-card";
                div.innerHTML = `
                    <h3>${job.title}</h3>
                    <p><strong>Location:</strong> ${job.location}</p>
                    <p><strong>Description:</strong> ${job.description}</p>
                    <p><strong>Requirements:</strong> ${job.requirements}</p>
                    <p><strong>Rate:</strong> ${job.rate}</p>
                    <button onclick="applyForJob('${job._id}')">Apply</button>
                `;
                jobList.appendChild(div);
            });

        } catch (error) {
            console.error("❌ Error loading jobs:", error);
            jobList.innerHTML = `<p>Failed to load jobs. Try again later.</p>`;
        }
    }

    // ✅ Job Posting Function
    document.getElementById("jobPostForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to post a job.");
            window.location.href = "login.html";
            return;
        }

        const jobData = {
            title: document.getElementById("title").value,
            location: document.getElementById("location").value,
            description: document.getElementById("description").value,
            requirements: document.getElementById("requirements").value,
            rate: document.getElementById("rate").value,
            providerId: localStorage.getItem("userId")
        };

        try {
            const response = await fetch("https://shadow-backend-5xom.onrender.com/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(jobData)
            });

            const data = await response.json();
            alert(data.msg);

            document.getElementById("jobPostForm").reset();
            loadJobs(); // Refresh job list

        } catch (error) {
            console.error("❌ Error posting job:", error);
            alert("Failed to post job.");
        }
    });

    // ✅ Load jobs when page loads
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