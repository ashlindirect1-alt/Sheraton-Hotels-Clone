# 🏨 Sheraton Hotels Clone

A fully functional **Sheraton Hotels-like hotel booking web application** developed as **CWI Task 38**.

The application allows users to search for hotels, view hotel details, filter and sort hotels, make bookings, view booking confirmations, and manage their bookings.

## 🎯 Features

* 🏠 Responsive hotel booking homepage
* 🔎 Hotel search by destination
* 📅 Check-in and check-out date selection
* 🏨 Hotel listing page
* ⭐ Hotel ratings and reviews
* 💰 Price filtering
* ⭐ Rating filtering
* 🛏️ Hotel type filtering
* 🧰 Amenities filtering
* ↕️ Sort hotels by price and rating
* 📄 Hotel details page
* 📝 Functional booking form
* 🧮 Automatic total price calculation
* 💾 SQLite database for hotels and bookings
* ✅ Booking confirmation page
* 📋 My Bookings page
* 🗑️ Delete booking functionality
* 🔐 Sign In page
* 👤 User sign-in status using browser localStorage
* 📱 Responsive design for mobile devices

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript
* Node.js
* Express.js
* SQLite
* SQLite3
* CORS
* LocalStorage

## 📁 Project Structure

```text
Sheraton-Hotels-Clone/
│
├── public/
│   ├── css/
│   │   ├── style.css
│   │   ├── hotels.css
│   │   ├── details.css
│   │   ├── booking.css
│   │   ├── confirmation.css
│   │   ├── bookings.css
│   │   └── signin.css
│   │
│   ├── js/
│   │   ├── index.js
│   │   ├── hotels.js
│   │   ├── details.js
│   │   ├── booking.js
│   │   ├── confirmation.js
│   │   ├── bookings.js
│   │   ├── signin.js
│   │   └── auth.js
│   │
│   ├── images/
│   │
│   ├── index.html
│   ├── hotels.html
│   ├── hotel-details.html
│   ├── booking.html
│   ├── confirmation.html
│   ├── bookings.html
│   └── signin.html
│
├── database.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

### 2. Open the project

```bash
cd Sheraton-Hotels-Clone
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create the database

Run:

```bash
node database.js
```

The SQLite database and required tables will be created automatically.

### 5. Start the server

Run:

```bash
node server.js
```

The application will start at:

```text
http://localhost:3000
```

### 6. Open the website

Open this address in your browser:

```text
http://localhost:3000
```

## 🔌 API Endpoints

### Test API

```text
GET /api/test
```

### Get all hotels

```text
GET /api/hotels
```

### Get a single hotel

```text
GET /api/hotels/:id
```

### Get all bookings

```text
GET /api/bookings
```

### Create a booking

```text
POST /api/bookings
```

### Delete a booking

```text
DELETE /api/bookings/:id
```

## 🗄️ Database

The project uses **SQLite** for storing hotel and booking information.

### Hotels table

Stores:

* Hotel name
* Location
* Description
* Image
* Price
* Rating
* Reviews
* Amenities
* Hotel type

### Bookings table

Stores:

* Hotel ID
* Hotel name
* Guest name
* Email
* Phone
* Check-in date
* Check-out date
* Number of guests
* Total price
* Booking status
* Booking creation date

## 🔐 Sign In

The project includes a simple educational sign-in feature.

Users can enter:

* Full name
* Email address
* Password

The signed-in user's name is stored in browser `localStorage` so the website can display the user's sign-in status.

> This is a coursework/demo authentication feature and is not intended for production authentication.

## 📱 Responsive Design

The website is designed to work on:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

## ⚠️ Disclaimer

This project is an **educational clone created for coursework and learning purposes**.

It is not affiliated with or operated by Marriott International or the Sheraton Hotels brand.

Hotel information, prices, reviews, and images used in the project are demonstration data.

## 👩‍💻 Developer

**Ashlin Naeem**

BS Information Technology

## 📌 CWI Task

**CWI Task 38 — Sheraton Hotels Clone (Functional) (Web-Based)**

Duration: **3 Days**

---

⭐ If you find this project useful, feel free to explore the code and learn from it.
