async function updateJobStatus(jobId, status) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in first.");
        return;
    }

    try {
        const response = await fetch(`https://shadow-backend-5xom.onrender.com/api/jobs/update/${jobId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });

        const data = await response.json();
        alert(data.msg);

        if (response.ok) {
            document.getElementById(`job-status-${jobId}`).innerText = status;
        }
    } catch (error) {
        console.error("Error updating job status:", error);
        alert("Failed to update job status.");
    }
}
// ✅ Ensure this function is globally available
window.hireProvider = hireProvider;