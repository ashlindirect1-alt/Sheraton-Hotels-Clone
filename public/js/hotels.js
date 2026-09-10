let allHotels = [];


// Load hotels from API
async function loadHotels() {

    try {

        const response = await fetch("/api/hotels");

        const data = await response.json();

        if (!data.success) {
            throw new Error("Unable to load hotels");
        }

        allHotels = data.hotels;

        loadSearchValues();

        displayHotels(allHotels);

    } catch (error) {

        console.error(error);

        document.getElementById("hotelResults").innerHTML = `
            <p>
                Unable to load hotels.
            </p>
        `;
    }
}


// Load search values from URL
function loadSearchValues() {

    const params = new URLSearchParams(window.location.search);

    const location = params.get("location");
    const checkIn = params.get("checkIn");
    const checkOut = params.get("checkOut");

    if (location) {
        document.getElementById("destination").value = location;
    }

    if (checkIn) {
        document.getElementById("checkIn").value = checkIn;
    }

    if (checkOut) {
        document.getElementById("checkOut").value = checkOut;
    }
}


// Display hotels
function displayHotels(hotels) {

    const container =
        document.getElementById("hotelResults");

    const resultCount =
        document.getElementById("resultCount");


    resultCount.textContent =
        `${hotels.length} hotel(s) found`;


    if (hotels.length === 0) {

        container.innerHTML = `
            <div class="no-results">
                <h3>No hotels found</h3>
                <p>Try changing your search or filters.</p>
            </div>
        `;

        return;
    }


    container.innerHTML = "";


    hotels.forEach((hotel) => {

        const card = document.createElement("div");

        card.className = "result-card";

        card.innerHTML = `
            <img
                src="${hotel.image}"
                alt="${hotel.name}"
            >

            <div class="result-content">

                <h3>
                    ${hotel.name}
                </h3>

                <p class="result-location">
                    📍 ${hotel.location}
                </p>

                <p class="result-rating">
                    ⭐ ${hotel.rating}
                    (${hotel.reviews} reviews)
                </p>

                <p class="result-description">
                    ${hotel.description}
                </p>

                <p class="amenities">
                    🛎️ ${hotel.amenities}
                </p>

                <div class="result-bottom">

                    <div class="result-price">
                        $${hotel.price}
                        <small>/ night</small>
                    </div>

                    <a
                        href="hotel-details.html?id=${hotel.id}"
                        class="details-btn"
                    >
                        View Details
                    </a>

                </div>

            </div>
        `;

        container.appendChild(card);
    });
}


// Apply filters
function applyFilters() {

    const destination =
        document.getElementById("destination")
        .value
        .trim()
        .toLowerCase();


    const maxPrice =
        Number(document.getElementById("priceFilter").value);


    const minRating =
        Number(document.getElementById("ratingFilter").value);


    const type =
        document.getElementById("typeFilter").value;


    const selectedAmenities =
        Array.from(
            document.querySelectorAll(".amenity-filter:checked")
        ).map((checkbox) => checkbox.value);


    let filteredHotels = allHotels.filter((hotel) => {

        const matchesLocation =
            !destination ||
            hotel.location.toLowerCase().includes(destination);


        const matchesPrice =
            hotel.price <= maxPrice;


        const matchesRating =
            hotel.rating >= minRating;


        const matchesType =
            !type ||
            hotel.type === type;


        const matchesAmenities =
            selectedAmenities.every((amenity) =>
                hotel.amenities.includes(amenity)
            );


        return (
            matchesLocation &&
            matchesPrice &&
            matchesRating &&
            matchesType &&
            matchesAmenities
        );
    });


    // Sorting

    const sort =
        document.getElementById("sortFilter").value;


    if (sort === "price-low") {

        filteredHotels.sort(
            (a, b) => a.price - b.price
        );

    } else if (sort === "price-high") {

        filteredHotels.sort(
            (a, b) => b.price - a.price
        );

    } else if (sort === "rating") {

        filteredHotels.sort(
            (a, b) => b.rating - a.rating
        );
    }


    displayHotels(filteredHotels);
}


// Update price label
function updatePriceLabel() {

    const value =
        document.getElementById("priceFilter").value;

    document.getElementById("priceValue").textContent =
        value;
}


// Start
loadHotels();