// =========================
// SHERATON LOGIN STATUS
// =========================

const sheratonUser =
    JSON.parse(localStorage.getItem("sheratonUser"));

const navLinks =
    document.querySelector(".nav-links");


if (sheratonUser && navLinks) {

    const signInLink =
        navLinks.querySelector('a[href="signin.html"]');


    if (signInLink) {

        signInLink.textContent =
            `Welcome, ${sheratonUser.name}`;

        signInLink.href = "#";

        signInLink.classList.add("user-welcome");


        signInLink.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const logout =
                    confirm(
                        "Do you want to sign out?"
                    );


                if (logout) {

                    localStorage.removeItem(
                        "sheratonUser"
                    );

                    window.location.href =
                        "index.html";

                }

            }
        );

    }

}