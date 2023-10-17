    const wrapper = document.querySelector(".wrapper");
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        try {
            const response = await fetch("/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token, data.name, data.email);
                window.location.href = "index.html";
            } else {
                console.error("Error:", data.error.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        try {
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "index.html";
            } else {
                console.error("Error:", data.error.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

    const signupHeader = document.querySelector(".signup header");
    const loginHeader = document.querySelector(".login header");

    loginHeader.addEventListener("click", () => {
        wrapper.classList.add("active");
    });
    signupHeader.addEventListener("click", () => {
        wrapper.classList.remove("active");
    });
