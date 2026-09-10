async function loadFeaturedHotels() {

    const container = document.getElementById("featuredHotels");

    try {

        const response = await fetch("/api/hotels");

        const data = await response.json();

        if (!data.success) {
            throw new Error("Failed to load hotels");
        }

        // Show first 3 hotels
        const hotels = data.hotels.slice(0, 3);

        container.innerHTML = "";

        hotels.forEach((hotel) => {

            const card = document.createElement("div");

            card.className = "hotel-card";

            card.innerHTML = `
                <img
                    src="${hotel.image}"
                    alt="${hotel.name}"
                >

                <div class="hotel-card-content">

                    <h3>
                        ${hotel.name}
                    </h3>

                    <p class="location">
                        ${hotel.location}
                    </p>

                    <p class="rating">
                        ⭐ ${hotel.rating}
                        (${hotel.reviews} reviews)
                    </p>

                    <p class="price">
                        $${hotel.price} / night
                    </p>

                    <a
                        class="view-btn"
                        href="hotel-details.html?id=${hotel.id}"
                    >
                        View Details
                    </a>

                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <p>
                Unable to load hotels. Please try again.
            </p>
        `;
    }
}


// Search hotels
function searchHotels() {

    const destination =
        document.getElementById("destination").value.trim();

    const checkIn =
        document.getElementById("checkIn").value;

    const checkOut =
        document.getElementById("checkOut").value;


    const params = new URLSearchParams();

    if (destination) {
        params.set("location", destination);
    }

    if (checkIn) {
        params.set("checkIn", checkIn);
    }

    if (checkOut) {
        params.set("checkOut", checkOut);
    }


    window.location.href =
        `hotels.html?${params.toString()}`;
}


// Load hotels when page opens
loadFeaturedHotels();

// =========================
// NAVBAR SIGN IN STATUS
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

                    window.location.reload();

                }

            }
        );

    }

}