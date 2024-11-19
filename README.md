Project Overview
Express Shopping List is a simple yet powerful JSON API built with Node.js and Express. 
It serves as a dynamic shopping list manager, where items can be added, retrieved, updated, and deleted using RESTful endpoints. 
This project uses JavaScript for all backend operations and stores data in-memory, which makes it ideal for understanding the fundamentals of API development with Express.

Technologies Used
Node.js: JavaScript runtime environment.
Express: Minimalist web framework for Node.js.
fakeDb.js: A simple file simulating a database using a global array.

Features
CRUD operations on shopping items:
GET /items — Retrieve all items.
POST /items — Add a new item.
GET /items/name
— Retrieve a specific item.
PATCH /items/name
— Update an item's details.
DELETE /items/name
— Delete an item.
