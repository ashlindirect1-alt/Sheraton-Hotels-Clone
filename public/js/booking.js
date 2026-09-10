// Get hotel ID from URL

const params =
    new URLSearchParams(window.location.search);

const hotelId =
    params.get("hotelId");


// Store selected hotel

let selectedHotel = null;


// Load hotel information

async function loadBookingPage() {

    const container =
        document.getElementById("bookingContent");


    if (!hotelId) {

        container.innerHTML = `
            <div class="booking-error">

                <h2>
                    Hotel not found
                </h2>

                <p>
                    No hotel was selected.
                </p>

            </div>
        `;

        return;
    }


    try {

        const response =
            await fetch(`/api/hotels/${hotelId}`);

        const data =
            await response.json();


        if (!data.success) {

            throw new Error(
                "Hotel could not be loaded"
            );

        }


        selectedHotel =
            data.hotel;


        displayBookingPage();


    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="booking-error">

                <h2>
                    Unable to load hotel
                </h2>

                <p>
                    Please try again later.
                </p>

            </div>
        `;

    }

}


// Display booking page

function displayBookingPage() {

    const container =
        document.getElementById("bookingContent");


    container.innerHTML = `

        <div class="booking-layout">


            <!-- Booking Form -->

            <div class="booking-form-card">

                <h1>
                    Book Your Stay
                </h1>

                <p>
                    Enter your details to reserve this hotel.
                </p>


                <form id="bookingForm">


                    <!-- Guest Name -->

                    <div class="form-group">

                        <label for="guestName">
                            Guest Name
                        </label>

                        <input
                            type="text"
                            id="guestName"
                            placeholder="Enter your full name"
                            required
                        >

                    </div>


                    <!-- Email -->

                    <div class="form-group">

                        <label for="email">
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                        >

                    </div>


                    <!-- Phone -->

                    <div class="form-group">

                        <label for="phone">
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            id="phone"
                            placeholder="Enter your phone number"
                            required
                        >

                    </div>


                    <!-- Dates -->

                    <div class="form-row">


                        <div class="form-group">

                            <label for="checkIn">
                                Check-in
                            </label>

                            <input
                                type="date"
                                id="checkIn"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label for="checkOut">
                                Check-out
                            </label>

                            <input
                                type="date"
                                id="checkOut"
                                required
                            >

                        </div>


                    </div>


                    <!-- Guests -->

                    <div class="form-group">

                        <label for="guests">
                            Number of Guests
                        </label>

                        <select
                            id="guests"
                            required
                        >

                            <option value="">
                                Select guests
                            </option>

                            <option value="1">
                                1 Guest
                            </option>

                            <option value="2">
                                2 Guests
                            </option>

                            <option value="3">
                                3 Guests
                            </option>

                            <option value="4">
                                4 Guests
                            </option>

                            <option value="5">
                                5 Guests
                            </option>

                            <option value="6">
                                6 Guests
                            </option>

                        </select>

                    </div>


                    <!-- Total Price -->

                    <div class="form-group">

                        <label>
                            Total Price
                        </label>

                        <input
                            type="text"
                            id="totalPrice"
                            value="$0"
                            readonly
                        >

                    </div>


                    <button
                        type="submit"
                        class="confirm-booking-btn"
                    >
                        Confirm Booking
                    </button>


                </form>

            </div>


            <!-- Hotel Summary -->

            <div class="hotel-summary">

                <img
                    src="${selectedHotel.image}"
                    alt="${selectedHotel.name}"
                >


                <div class="hotel-summary-content">

                    <h2>
                        ${selectedHotel.name}
                    </h2>


                    <p class="summary-location">
                        📍 ${selectedHotel.location}
                    </p>


                    <p class="summary-rating">
                        ⭐ ${selectedHotel.rating}
                        (${selectedHotel.reviews} reviews)
                    </p>


                    <div class="summary-price">

                        $${selectedHotel.price}

                        <small>
                            / night
                        </small>

                    </div>

                </div>

            </div>


        </div>

    `;


    // Form events

    document
        .getElementById("bookingForm")
        .addEventListener(
            "submit",
            submitBooking
        );


    document
        .getElementById("checkIn")
        .addEventListener(
            "change",
            calculateTotal
        );


    document
        .getElementById("checkOut")
        .addEventListener(
            "change",
            calculateTotal
        );

}


// Calculate total price

function calculateTotal() {

    const checkIn =
        document.getElementById("checkIn").value;

    const checkOut =
        document.getElementById("checkOut").value;


    const totalPriceInput =
        document.getElementById("totalPrice");


    if (!checkIn || !checkOut) {

        totalPriceInput.value = "$0";

        return;
    }


    const startDate =
        new Date(checkIn);

    const endDate =
        new Date(checkOut);


    const difference =
        endDate - startDate;


    const nights =
        difference / (1000 * 60 * 60 * 24);


    if (nights <= 0) {

        totalPriceInput.value =
            "$0";

        return;
    }


    const total =
        nights * selectedHotel.price;


    totalPriceInput.value =
        `$${total}`;

}


// Submit booking

async function submitBooking(event) {

    event.preventDefault();


    const guestName =
        document.getElementById("guestName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const checkIn =
        document.getElementById("checkIn").value;

    const checkOut =
        document.getElementById("checkOut").value;

    const guests =
        Number(
            document.getElementById("guests").value
        );


    const startDate =
        new Date(checkIn);

    const endDate =
        new Date(checkOut);


    const difference =
        endDate - startDate;


    const nights =
        difference / (1000 * 60 * 60 * 24);


    if (nights <= 0) {

        alert(
            "Check-out date must be after check-in date."
        );

        return;
    }


    const totalPrice =
        nights * selectedHotel.price;


    try {

        const response =
            await fetch("/api/bookings", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    hotelId:
                        selectedHotel.id,

                    hotelName:
                        selectedHotel.name,

                    guestName:
                        guestName,

                    email:
                        email,

                    phone:
                        phone,

                    checkIn:
                        checkIn,

                    checkOut:
                        checkOut,

                    guests:
                        guests,

                    totalPrice:
                        totalPrice

                })

            });


        const data =
            await response.json();


        if (!data.success) {

            alert(data.message);

            return;
        }


        // Redirect to confirmation page

        window.location.href =
            `confirmation.html?bookingId=${data.bookingId}`;

    } catch (error) {

        console.error(error);

        alert(
            "Something went wrong while creating the booking."
        );

    }

}


// Start

loadBookingPage();