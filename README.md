Read the Project Specfications [here](https://docs.google.com/document/d/1zZjNk9cbNLz0mp_-YtyZxhMzUph97fVgCkSE4u2k5EA/edit?usp=sharing).

Add design docs in *images/*

## Instructions to setup and run project
This project uses MySQL for the back-end.

Navigate to the `server` directory then run the following commands to set up the tables in the database schema and start the server.

    $ npm install
    $ node setup.js -u <username> -p <password>
    $ nodemon server.js -u <username> -p <password>

Navigate to the `client` directory then run the following command to start the React app.

    $ npm install
    $ npm start



## Design Patterns

## Miscellaneous
- This project uses the `express-session` library for handling user accounts.
- A newly created account starts out with 100 reputation so they have the ability to vote.