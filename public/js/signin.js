const signinForm = document.getElementById("signinForm");
const signinMessage = document.getElementById("signinMessage");

signinForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        signinMessage.textContent = "Please fill in all fields.";
        return;
    }

    if (password.length < 6) {
        signinMessage.textContent =
            "Password must be at least 6 characters.";
        return;
    }

    const user = {
        name: name,
        email: email
    };

    localStorage.setItem(
        "sheratonUser",
        JSON.stringify(user)
    );

    signinMessage.textContent = "Sign in successful!";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);

});