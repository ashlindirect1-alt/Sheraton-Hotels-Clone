const express = require("express");
const path = require("path");
const cors = require("cors");

const db = require("./database");

const app = express();

const PORT = 3000;


// Middleware

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// Serve frontend

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// =========================
// TEST API
// =========================

app.get("/api/test", (req, res) => {

    res.json({

        success: true,

        message:
            "Sheraton Hotels Clone API is working!"

    });

});


// =========================
// GET ALL HOTELS
// =========================

app.get("/api/hotels", (req, res) => {

    db.all(
        "SELECT * FROM hotels",
        [],
        (err, rows) => {

            if (err) {

                console.error(
                    "Database error:",
                    err.message
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to fetch hotels",

                    error:
                        err.message

                });

            }


            res.json({

                success: true,

                count: rows.length,

                hotels: rows

            });

        }
    );

});


// =========================
// GET SINGLE HOTEL
// =========================

app.get("/api/hotels/:id", (req, res) => {

    const hotelId = req.params.id;


    db.get(
        "SELECT * FROM hotels WHERE id = ?",
        [hotelId],
        (err, row) => {

            if (err) {

                console.error(
                    "Database error:",
                    err.message
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to fetch hotel",

                    error:
                        err.message

                });

            }


            if (!row) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Hotel not found"

                });

            }


            res.json({

                success: true,

                hotel: row

            });

        }
    );

});


// =========================
// CREATE BOOKING
// =========================

app.post("/api/bookings", (req, res) => {

    const {

        hotelId,
        hotelName,
        guestName,
        email,
        phone,
        checkIn,
        checkOut,
        guests,
        totalPrice

    } = req.body;


    // Validate required fields

    if (
        !hotelId ||
        !hotelName ||
        !guestName ||
        !email ||
        !phone ||
        !checkIn ||
        !checkOut ||
        !guests ||
        totalPrice === undefined
    ) {

        return res.status(400).json({

            success: false,

            message:
                "All fields are required."

        });

    }


    const sql = `

        INSERT INTO bookings

        (
            hotelId,
            hotelName,
            guestName,
            email,
            phone,
            checkIn,
            checkOut,
            guests,
            totalPrice
        )

        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

    `;


    db.run(

        sql,

        [
            hotelId,
            hotelName,
            guestName,
            email,
            phone,
            checkIn,
            checkOut,
            guests,
            totalPrice
        ],

        function (err) {

            if (err) {

                console.error(
                    "Booking error:",
                    err.message
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to create booking",

                    error:
                        err.message

                });

            }


            res.status(201).json({

                success: true,

                message:
                    "Booking created successfully!",

                bookingId:
                    this.lastID

            });

        }

    );

});


// =========================
// GET ALL BOOKINGS
// =========================

app.get("/api/bookings", (req, res) => {

    db.all(

        "SELECT * FROM bookings ORDER BY id DESC",

        [],

        (err, rows) => {

            if (err) {

                console.error(
                    "Database error:",
                    err.message
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to fetch bookings",

                    error:
                        err.message

                });

            }


            res.json({

                success: true,

                count: rows.length,

                bookings: rows

            });

        }

    );

});


// =========================
// DELETE BOOKING
// =========================

app.delete("/api/bookings/:id", (req, res) => {

    const bookingId = req.params.id;


    db.run(
        "DELETE FROM bookings WHERE id = ?",
        [bookingId],
        function (err) {

            if (err) {

                console.error(
                    "Delete booking error:",
                    err.message
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to delete booking",

                    error:
                        err.message

                });

            }


            if (this.changes === 0) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Booking not found"

                });

            }


            res.json({

                success: true,

                message:
                    "Booking deleted successfully."

            });

        }
    );

});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {

    console.log(
        `Sheraton Hotels Clone running at http://localhost:${PORT}`
    );

});