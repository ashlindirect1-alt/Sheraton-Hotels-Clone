// Load all bookings

async function loadBookings() {

    const container =
        document.getElementById("bookingsList");


    try {

        const response =
            await fetch("/api/bookings");


        const data =
            await response.json();


        if (!data.success) {

            throw new Error(
                "Failed to load bookings"
            );

        }


        displayBookings(data.bookings);


    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="empty-bookings">

                <h2>
                    Unable to load bookings
                </h2>

                <p>
                    Please try again later.
                </p>

            </div>
        `;

    }

}


// Display bookings

function displayBookings(bookings) {

    const container =
        document.getElementById("bookingsList");


    if (bookings.length === 0) {

        container.innerHTML = `

            <div class="empty-bookings">

                <h2>
                    No Bookings Yet
                </h2>

                <p>
                    You don't have any hotel bookings yet.
                </p>

                <a
                    href="hotels.html"
                    class="browse-hotels-btn"
                >
                    Browse Hotels
                </a>

            </div>

        `;

        return;
    }


    container.innerHTML = `

        <div class="bookings-list">

            ${bookings.map((booking) => `

                <div class="booking-card">


                    <div class="booking-card-header">

                        <div>

                            <h2>
                                ${booking.hotelName}
                            </h2>

                            <span class="booking-id">
                                Booking #${booking.id}
                            </span>

                        </div>


                        <span class="booking-status">
                            ${booking.status}
                        </span>

                    </div>


                    <div class="booking-details">


                        <div class="booking-detail">

                            <strong>
                                Guest Name
                            </strong>

                            <span>
                                ${booking.guestName}
                            </span>

                        </div>


                        <div class="booking-detail">

                            <strong>
                                Email
                            </strong>

                            <span>
                                ${booking.email}
                            </span>

                        </div>


                        <div class="booking-detail">

                            <strong>
                                Phone
                            </strong>

                            <span>
                                ${booking.phone}
                            </span>

                        </div>


                        <div class="booking-detail">

                            <strong>
                                Check-in
                            </strong>

                            <span>
                                ${booking.checkIn}
                            </span>

                        </div>


                        <div class="booking-detail">

                            <strong>
                                Check-out
                            </strong>

                            <span>
                                ${booking.checkOut}
                            </span>

                        </div>


                        <div class="booking-detail">

                            <strong>
                                Guests
                            </strong>

                            <span>
                                ${booking.guests}
                            </span>

                        </div>


                    </div>


                    <div class="booking-price">

                        <span class="booking-price-label">
                            Total Price
                        </span>

                        <span class="booking-price-value">
                            $${booking.totalPrice}
                        </span>

                    </div>


                    <button
                        class="delete-booking-btn"
                        onclick="deleteBooking(${booking.id})"
                    >
                        Delete Booking
                    </button>


                </div>

            `).join("")}

        </div>

    `;

}


// Delete booking

async function deleteBooking(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this booking?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `/api/bookings/${id}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (!data.success) {

            alert(data.message);

            return;
        }


        alert(
            "Booking deleted successfully."
        );


        loadBookings();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to delete booking."
        );

    }

}


// Start

loadBookings();