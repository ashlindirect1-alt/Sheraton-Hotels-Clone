const sqlite3 = require("sqlite3").verbose();

console.log("database.js is running...");

const db = new sqlite3.Database("./sheraton.db", (err) => {

    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }

});


db.serialize(() => {

    // =========================
    // HOTELS TABLE
    // =========================

    db.run(`
        CREATE TABLE IF NOT EXISTS hotels (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            description TEXT,
            image TEXT,
            price INTEGER NOT NULL,
            rating REAL NOT NULL,
            reviews INTEGER DEFAULT 0,
            amenities TEXT,
            type TEXT
        )
    `, (err) => {

        if (err) {
            console.error(
                "Error creating hotels table:",
                err.message
            );
        } else {
            console.log(
                "Hotels table created successfully."
            );
        }

    });


    // =========================
    // CHECK HOTEL DATA
    // =========================

    db.get(
        "SELECT COUNT(*) AS count FROM hotels",
        (err, row) => {

            if (err) {

                console.error(
                    "Error checking hotel records:",
                    err.message
                );

                return;
            }


            if (row.count === 0) {

                const hotels = [

                    [
                        "Sheraton Grand Lahore",
                        "Lahore",
                        "A luxurious hotel in the heart of Lahore with modern rooms and excellent facilities.",
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
                        150,
                        4.9,
                        1250,
                        "Free WiFi,Swimming Pool,Restaurant,Gym,Parking",
                        "Luxury"
                    ],

                    [
                        "Sheraton Islamabad Hotel",
                        "Islamabad",
                        "A comfortable luxury stay surrounded by the beauty of Islamabad.",
                        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
                        180,
                        4.8,
                        980,
                        "Free WiFi,Restaurant,Gym,Room Service,Parking",
                        "Luxury"
                    ],

                    [
                        "Sheraton Karachi Hotel",
                        "Karachi",
                        "A premium hotel offering comfortable rooms and modern amenities.",
                        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
                        130,
                        4.7,
                        850,
                        "Free WiFi,Swimming Pool,Restaurant,Gym",
                        "Business"
                    ],

                    [
                        "Sheraton Murree Resort",
                        "Murree",
                        "A beautiful mountain resort perfect for a relaxing getaway.",
                        "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
                        120,
                        4.6,
                        720,
                        "Free WiFi,Mountain View,Restaurant,Parking,Room Service",
                        "Resort"
                    ],

                    [
                        "Sheraton Dubai Hotel",
                        "Dubai",
                        "A stylish hotel offering premium accommodation in Dubai.",
                        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
                        220,
                        4.9,
                        2100,
                        "Free WiFi,Swimming Pool,Spa,Gym,Restaurant",
                        "Luxury"
                    ],

                    [
                        "Sheraton London Hotel",
                        "London",
                        "Modern accommodation with excellent service in London.",
                        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
                        250,
                        4.8,
                        1750,
                        "Free WiFi,Restaurant,Gym,Room Service,Parking",
                        "Business"
                    ]

                ];


                const stmt = db.prepare(`
                    INSERT INTO hotels
                    (
                        name,
                        location,
                        description,
                        image,
                        price,
                        rating,
                        reviews,
                        amenities,
                        type
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `);


                hotels.forEach((hotel) => {

                    stmt.run(hotel);

                });


                stmt.finalize((err) => {

                    if (err) {

                        console.error(
                            "Error inserting hotels:",
                            err.message
                        );

                    } else {

                        console.log(
                            "Hotel data inserted successfully."
                        );

                    }

                });

            } else {

                console.log(
                    `Hotels already exist (${row.count} records).`
                );

            }

        }
    );


    // =========================
    // BOOKINGS TABLE
    // =========================

    db.run(`
        CREATE TABLE IF NOT EXISTS bookings (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            hotelId INTEGER NOT NULL,

            hotelName TEXT NOT NULL,

            guestName TEXT NOT NULL,

            email TEXT NOT NULL,

            phone TEXT NOT NULL,

            checkIn TEXT NOT NULL,

            checkOut TEXT NOT NULL,

            guests INTEGER NOT NULL,

            totalPrice INTEGER NOT NULL,

            status TEXT DEFAULT 'Confirmed',

            createdAt TEXT DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (hotelId) REFERENCES hotels(id)

        )
    `, (err) => {

        if (err) {

            console.error(
                "Error creating bookings table:",
                err.message
            );

        } else {

            console.log(
                "Bookings table created successfully."
            );

        }

    });

});


module.exports = db;