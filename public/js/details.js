// Get hotel ID from URL

const params = new URLSearchParams(window.location.search);

const hotelId = params.get("id");


// Load hotel details

async function loadHotelDetails() {

    const container =
        document.getElementById("hotelDetails");


    if (!hotelId) {

        container.innerHTML = `
            <div class="details-error">
                <h2>Hotel not found</h2>
                <p>No hotel ID was provided.</p>
            </div>
        `;

        return;
    }


    try {

        const response =
            await fetch("/api/hotels");

        const data =
            await response.json();


        if (!data.success) {

            throw new Error("Failed to load hotels");

        }


        const hotel =
            data.hotels.find(
                (item) => item.id == hotelId
            );


        if (!hotel) {

            container.innerHTML = `
                <div class="details-error">
                    <h2>Hotel not found</h2>
                    <p>The selected hotel does not exist.</p>
                </div>
            `;

            return;
        }


        // Convert amenities into separate items

        const amenities =
            hotel.amenities
                .split(",")
                .map(
                    (amenity) => `
                        <span class="amenity-item">
                            ${amenity}
                        </span>
                    `
                )
                .join("");


        // Display hotel

        container.innerHTML = `

            <div class="hotel-details-card">

                <img
                    src="${hotel.image}"
                    alt="${hotel.name}"
                    class="hotel-details-image"
                >


                <div class="hotel-details-content">

                    <h1>
                        ${hotel.name}
                    </h1>


                    <p class="hotel-location">
                        📍 ${hotel.location}
                    </p>


                    <p class="hotel-rating">
                        ⭐ ${hotel.rating}
                        (${hotel.reviews} reviews)
                    </p>


                    <p class="hotel-description">
                        ${hotel.description}
                    </p>


                    <div class="hotel-amenities">

                        <h2>
                            Amenities
                        </h2>

                        <div class="amenities-list">
                            ${amenities}
                        </div>

                    </div>


                    <div class="hotel-details-bottom">

                        <div class="hotel-price">

                            $${hotel.price}

                            <small>
                                / night
                            </small>

                        </div>


                        <a
                            href="booking.html?hotelId=${hotel.id}"
                            class="book-now-btn"
                        >
                            Book Now
                        </a>

                    </div>

                </div>

            </div>

        `;

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="details-error">
                <h2>Unable to load hotel</h2>
                <p>Please try again later.</p>
            </div>
        `;

    }
}


// Start

loadHotelDetails();