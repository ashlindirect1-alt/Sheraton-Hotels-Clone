// Get booking ID from URL

const params =
    new URLSearchParams(window.location.search);

const bookingId =
    params.get("bookingId");


// Load booking information

async function loadConfirmation() {

    const container =
        document.getElementById(
            "confirmationContent"
        );


    if (!bookingId) {

        container.innerHTML = `
            <div class="confirmation-error">

                <h2>
                    Booking not found
                </h2>

                <p>
                    No booking ID was provided.
                </p>

                <br>

                <a
                    href="index.html"
                    class="confirmation-btn primary-btn"
                >
                    Return Home
                </a>

            </div>
        `;

        return;
    }


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


        const booking =
            data.bookings.find(
                (item) =>
                    item.id == bookingId
            );


        if (!booking) {

            container.innerHTML = `
                <div class="confirmation-error">

                    <h2>
                        Booking not found
                    </h2>

                    <p>
                        We could not find this booking.
                    </p>

                    <br>

                    <a
                        href="index.html"
                        class="confirmation-btn primary-btn"
                    >
                        Return Home
                    </a>

                </div>
            `;

            return;
        }


        // Display confirmation

        container.innerHTML = `

            <div class="confirmation-card">


                <div class="success-icon">
                    ✅
                </div>


                <h1>
                    Booking Confirmed!
                </h1>


                <p class="confirmation-message">

                    Your hotel booking has been successfully
                    created.

                </p>


                <div class="booking-info">


                    <h2>
                        Booking Details
                    </h2>


                    <div class="info-row">

                        <span class="info-label">
                            Booking ID
                        </span>

                        <span class="info-value">
                            #${booking.id}
                        </span>

                    </div>


                    <div class="info-row">

                        <span class="info-label">
                            Hotel
                        </span>

                        <span class="info-value">
                            ${booking.hotelName}
                        </span>

                    </div>


                    <div class="info-row">

                        <span class="info-label">
                            Guest Name
                        </span>

                        <span class="info-value">
                            ${booking.guestName}
                        </span>

                    </div>


                    <div class="info-row">

                        <span class="info-label">
                            Email
                        </span>

                        <span class="info-value">
                            ${booking.email}
                        </span>

                    </div>


                    <div class="info-row">

                        <span class="info-label">
                            Phone
                        </span>

                        <span class="info-value">
                            ${booking.phone}
                        </span>

                    </div>


                    <div class="info-row">

                        <span class="info-label">
                            Check-in
                        </span>

                        <span class="info-value">
                            ${booking.checkIn}
                        </span>

                    </div>


                    <div class="info-row">

                        <span class="info-label">
                            Check-out
                        </span>

                        <span class="info-value">
                            ${booking.checkOut}
                        </span>

                    </div>


                    <div class="info-row">

                        <span class="info-label">
                            Guests
                        </span>

                        <span class="info-value">
                            ${booking.guests}
                        </span>

                    </div>


                    <div class="info-row">

                        <span class="info-label">
                            Status
                        </span>

                        <span class="info-value">
                            ${booking.status}
                        </span>

                    </div>


                    <div class="confirmation-total">

                        <span>
                            Total Price
                        </span>

                        <span class="total-value">
                            $${booking.totalPrice}
                        </span>

                    </div>


                </div>


                <div class="confirmation-actions">

                    <a
                        href="bookings.html"
                        class="confirmation-btn primary-btn"
                    >
                        View My Bookings
                    </a>


                    <a
                        href="index.html"
                        class="confirmation-btn secondary-btn"
                    >
                        Return Home
                    </a>

                </div>


            </div>

        `;

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="confirmation-error">

                <h2>
                    Unable to load confirmation
                </h2>

                <p>
                    Please try again later.
                </p>

            </div>
        `;

    }

}


// Start

loadConfirmation();