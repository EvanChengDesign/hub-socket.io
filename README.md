# hub-socket.io
CAPS socket.io server

#### Author: Evan Cheng

#### Version: 1.0.0

# Project Overview:

## Using Socket.io for Network Communication

Create an application that utilizes a library called Socket.io so that clients can communicate over a network. Socket.io manages the connection pool for us, making broadcasting much easier to operate, and works well both on the terminal (between servers) and with web clients.

The core functionality (CAPS) we’ve already built remains the same. The difference in this phase is that we’ll be creating a networking layer. As such, the user stories that speak to application functionality remain unchanged, but our developer story changes to reflect the work needed for refactoring.

### User Stories

- **As a vendor,** I want to alert the system when I have a package to be picked up.
- **As a driver,** I want to be notified when there is a package to be delivered.
- **As a driver,** I want to alert the system when I have picked up a package and it is in transit.
- **As a driver,** I want to alert the system when a package has been delivered.
- **As a vendor,** I want to be notified when my package has been delivered.

### Developer Story

- **As a developer,** I want to create a network event-driven system using Socket.io so that I can write code that responds to events originating from both servers and client applications.

### UML

![UML](./uml.png)
