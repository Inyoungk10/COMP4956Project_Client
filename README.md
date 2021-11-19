# COMP4956Project_Client
# Version 1, 11/18/2021
# Authors:
Client Team
    Francis S
    Inyoung K
    Cameron W
    Gurjot S

Database Team
    Jacob T
    Brennen C
    Xavier N

Optimization Team
    Bob L
    Kibum P
    Eric D

To start, change to the back-end directory and run npm install, then npm start.
# Majority of the database calls are implemented in back-end/routes/Get.js
# Authenication is done in back-end/middleware/auth.js
Afterwards, open a second terminal and change to the front-end/client-front-end directory and repeat the same two steps as before.
# Front end pages are in the front-end/client-front-end/src/components

# Summary: 
This project is a MERN (MongoDB, Express.js, React.js, Node.js) stack application that takes user input data for dimensions of rooms, boxes, and items.
All rooms, boxes, and items have a unique ID that will be used for CRUD functionality.
Currently the database operations are functional but have only been tested using POSTMAN.
The end goal is for the sandbox to be able to render each room with the boxes organized in a manner that optimizes space.