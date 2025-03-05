document.getElementById("contactForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form reload

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("https://shadow-backend-5xom.onrender.com/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();
        document.getElementById("responseMessage").innerText = data.msg;

        // Clear form on success
        if (response.ok) {
            document.getElementById("contactForm").reset();
        }
    } catch (error) {
        console.error("❌ Contact form submission failed:", error);
        document.getElementById("responseMessage").innerText = "Failed to send message. Try again later.";
    }
});