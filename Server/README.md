# BACK END

cd ./app
npm start
sequelize db:seed:all --debug




## Introduction
The `backend` folder contains the files for the API. The API is relatively simple and is built using Express, Sequilize, and MySQL. *You must ensure the XAMP is running before trying to initialize the database*. 

## Table Of Contents

*BACKEND*

Tech Stack
    ↳ [Express](#Express)
    ↳ [MySQL](#MySQL)
    ↳ [Sequelize](#Sequelize)

Documentation
    ↳ [Setup](#Setup)
    ↳ [To Do](#To-Do)
    ↳ [Adding To The Api](#Adding-To-The-API)

Folder Structure
    ↳ [Config](#Config)
    ↳ [Controllers](#Controllers)
    ↳ [Middleware](#Middleware)
    ↳ [Models](#Models)
    ↳ [Routes](#Routes)
    ↳ [Booking](#Booking)
    ↳ [Public](#Public)
    

## TECH STACK

### Express
#### Overview
*Express.js* is used to create the backend server that the fronend communicates with. This server listens on port *localhost:8080* on this DEV enviroment. Ensure that this port is not the same port the frontend is using. ALso ensure that the frontend is sending requests to this port when it attempts to retrieve data from the API. 

#### Configuring the Express.js server
To change the server port and listening ports for the backend edit the **corsOptions** and **PORT** variables in the [server.js](/App/Backend/server.js) file. 

#### Adding To The API
Adding new tables to the SQL database will mean you will need to update the routes for the API. This has a cascade effect. Small and simple changes must be made to several files> Don't fret they're easy to make, adding new tables and defining their routes is simple. But it is time consuming. Details on how to do so require their own section highlighted [here](#Adding-To-The-API)

### MySQL 
The relational SQL database is populated by the the SEQUALIZE models defined in the [/models](/App/Backend/app/models) folder.  We focused on creating an effecient relational model using good design principles that minimize table redundency and NULL values. The model is consistent and seems to be without error at the moment. Improvements can be made. 

UML Diagram Database was built using
![](../../Documentation/uml/updated_database.png)

### Sequelize 
The relational SQL database is populated by the the SEQUALIZE models defined in the [/models](/App/Backend/app/models) folder.  We focused on creating an effecient relational model using good design principles that minimize table redundency and NULL values. The model is consistent and seems to be without error at the moment. Improvements can be made. 

## Documentation

### Setup 
0) Start XAMP. Ensure MYSQL is enabled. 
1) npm install
2) npm start
3) Test Endpoints using either the frontEnd or [Postman](/Testing) 

NOTE: Frontend and Backend must not be on the same port. If you start the backend first, ensure it is on any port but localhost:3000. 

## To Do
1) Adding additional tables outlined in the [UML DIAGRAM](../../Documentation/uml/updated_database.png) diagram that are required to enable features like commenting and reviews
2) Connect the Booking and Scheduling APIS selected by 2 teams responsible for those goals

## Adding To The Api
To Add to the API follow these Step by step instructions

1) Add `require("./app/routes/[TABLE-NAME].routes")(app);` to [server.js](/App/Backend/server.js) 
2) Add `[TABLE-NAME].routes.js` file to the [/app/routes](/App/Backend/app/routes) folder. 
3) Reffrencing other `.routes.js` files, document the appropriate API endpoints for the date users will retrieve from the new table in the newly created `[TABLE-NAME].routes.js` file from step 2
4) Add `[TABLE-NAME].model.js` file to the [/app/routes](/App/Backend/app/models) folder. 
5) Reffrencing other `.models.js` files, define the sequelize model that will ultimately go on to automatically create your new table in the database in the `[TABLE-NAME].model.js`file created in step 4
6) Add `[TABLE-NAME].controller.js` file to the [/app/controllers](/App/Backend/app/controllers) folder. 
7) Reffrencing other `.controller.js` files, create a controller that defines the actions performed by the API when calls are made to the endpoints you defined in step 2 in the `[TABLE-NAME].controller.js`file created in step 6. *This controller is where your SQL queries are defined*

## Folder Structure

### Config 
- `db.config.js`: where the MySQL connection and authentication data is defined for use
- `google.config.js`: where the GOOGLE MAPS API token is stored 

### Controllers
- Controllers for every table in the database. Each controller is where queries used to access the table's data is defined. 
### Middleware
-  `geocoding.js`: The module designed to handle all backend requests sent to the GOOGLE MAPS API. It performs geocoding from the addresses submitted by users. 
-  `imageHandler.js`: The module designed to handle all image uploads made my users. It performs image verification for image size and file type. It saves the approved uploaded images in the [/Backend/public/imgs](/App/Backend/public/imgs) folder. 

### Models
- Table models for every table in the database. Each model defines the structure of a given table in the database. 
### Routes
- Each Route file documents the endpoints of the API, allowing users the ability to make well-formed requests to the server. 
### Booking 
The users will book appointments on a third-party API widget. They will have the abilities to select the services of their choice, the time frame they desired and some personal information for further contact. 

### Public
- The location of images and other public files the frontend require that the backend stores




