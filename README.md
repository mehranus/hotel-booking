🏨 Hotel Booking System

NestJS + PostgreSQL + Redis + RabbitMQ

A scalable and production-ready Hotel Booking System built with modern backend technologies, focusing on clean architecture, concurrency safety, and event-driven design.

🚀 Project Overview

This project is a backend system for managing hotel room reservations.

It supports secure authentication, room availability search, booking with concurrency control, caching, and asynchronous event processing.

The goal of this project is to simulate a real-world booking system similar to those used by hotels and travel platforms.

🧱 Tech Stack

Framework: NestJS

Database: PostgreSQL + TypeORM

Cache & Locking: Redis

Message Broker: RabbitMQ

Authentication: JWT (Role-based)

Architecture: Modular & Clean Architecture

✨ Core Features

User Authentication (JWT)

Role-based Authorization (Guest / Admin)

Hotel & Room Management

Room Availability Search

Safe Booking (No Double Booking)

Distributed Locking with Redis

Event-driven communication with RabbitMQ

Scalable & production-oriented design

👥 Roles

Guest

Register / Login

Search available rooms

Book a room

Cancel booking

View own bookings

Admin

Create & manage hotels

Create & manage rooms

View all bookings

🧠 Domain Model (High Level)

User

Hotel

Room

Booking

🗺️ Project Roadmap

This project is developed step by step, each phase building on the previous one.

✅ Phase 1 – Project Setup & Authentication

\[x\] NestJS project setup

\[x\] PostgreSQL integration with TypeORM

\[x\] User entity

<<<<<<< HEAD
\[x\] Register & Login

\[x\] Password hashing (bcrypt)

\[x\] JWT authentication

\[x\] Role-based authorization (Guest / Admin)
=======
\[\] Register & Login

\[\] Password hashing (bcrypt)

\[\] JWT authentication

\[\] Role-based authorization (Guest / Admin)
>>>>>>> caaff3f9623cd8b56064b64169811fbc8586bd2a

⏳ Phase 2 – Hotel & Room Management

\[ \] Hotel CRUD (Admin only)

\[ \] Room CRUD (Admin only)

\[ \] Room types & pricing

\[ \] Validation & access control

⏳ Phase 3 – Booking System

\[ \] Search available rooms by date

\[ \] Booking creation

\[ \] Prevent overlapping bookings

\[ \] Database transactions

\[ \] Booking cancellation

⏳ Phase 4 – Redis Integration

\[ \] Distributed locking for bookings

\[ \] Cache room availability

\[ \] Cache frequently accessed data

⏳ Phase 5 – RabbitMQ (Event-Driven)

\[ \] BookingCreated event

\[ \] BookingCancelled event

\[ \] Async consumers (email, logs, analytics)

⏳ Phase 6 – Optimization & Production Readiness

\[ \] Environment configuration

\[ \] Security hardening

\[ \] Performance optimizations

\[ \] API documentation (Swagger)

\[ \] Basic testing

📂 Project Structure

Copy code

Text

src/

├── auth/

├── users/

├── hotels/

├── rooms/

├── bookings/

│

├── common/

│   ├── decorators/

│   ├── guards/

│   ├── enums/

│   └── constants/

│

├── config/

│   ├── database.config.ts

│   └── jwt.config.ts

│

├── app.module.ts

└── main.ts

⚠️ Important Notes

This project is designed as a learning + portfolio project

Focus is on real-world backend problems like:

Concurrency

Data consistency

Scalability

synchronize: true is enabled only for development

📌 Future Improvements

Refresh tokens

Payment integration

Multi-hotel search

Microservices split

CI/CD pipeline

📄 License

<<<<<<< HEAD
MIT License
=======
MIT License
>>>>>>> caaff3f9623cd8b56064b64169811fbc8586bd2a
