How to use

npm init -y
npm install express mysql2

Creating database

CREATE DATABASE TravelokaPlus;
USE TravelokaPlus;

CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    created_at DATETIME
);

CREATE TABLE Travel_agent (
    agent_id INT PRIMARY KEY,
    name VARCHAR(100),
    created_at DATETIME
);

CREATE TABLE Booking_table (
    booking_id INT PRIMARY KEY,
    user_id INT,
    service_type ENUM('hotel', 'transport', 'attraction', 'package'),
    service_id INT,
    booking_date DATETIME,
    status ENUM('confirmed', 'canceled', 'pending'),
    total_price DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Payment_table (
    payment_id INT PRIMARY KEY,
    status ENUM('completed', 'pending'),
    total DECIMAL(10, 2),
    payment_method ENUM('credit_card', 'PayPal', 'bank_transfer'),
    payment_date DATETIME
);

CREATE TABLE Booking_payment_table (
    payment_id INT,
    booking_id INT,
    amount DECIMAL(10, 2),
    PRIMARY KEY (payment_id, booking_id),
    FOREIGN KEY (payment_id) REFERENCES Payment_table(payment_id),
    FOREIGN KEY (booking_id) REFERENCES Booking_table(booking_id)
);

CREATE TABLE Hotel_table (
    hotel_id INT PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(255)
);

CREATE TABLE Hotel_room (
    room_id INT PRIMARY KEY,
    hotel_id INT,
    price DECIMAL(10, 2),
    availability BOOLEAN,
    FOREIGN KEY (hotel_id) REFERENCES Hotel_table(hotel_id)
);

CREATE TABLE Transportation_table (
    transport_id INT PRIMARY KEY,
    type ENUM('flight', 'train', 'bus'),
    provider_name VARCHAR(100),
    departure_time DATETIME,
    arrival_time DATETIME,
    departure_location VARCHAR(100),
    arrival_location VARCHAR(100),
    price DECIMAL(10, 2)
);

CREATE TABLE Attraction_table (
    attraction_id INT PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(255),
    price DECIMAL(10, 2),
    availability BOOLEAN
);

CREATE TABLE Package_table (
    package_id INT PRIMARY KEY,
    agent_id INT,
    name VARCHAR(100),
    price DECIMAL(10, 2),
    description TEXT,
    FOREIGN KEY (agent_id) REFERENCES Travel_agent(agent_id)
);

