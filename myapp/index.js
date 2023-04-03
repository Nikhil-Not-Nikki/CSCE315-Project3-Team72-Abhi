//postgres functionality
const { Pool } = require('pg');
const dotenv = require('dotenv').config()

//express app functionality
const express = require('express');
const app = express();
const port = 3000;


// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});


// Add process hook to shutdown pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application has successfully shutdown');
    process.exit(0);
});

//setting view
app.set("view engine", "ejs");

//default route
app.get('/', (req, res) => {
    const data = {name: 'Cameron'};
    res.render('index', data);
});

//different route: add /user to the end of the link
app.get('/user', (req,res) =>{
    menu = []
    pool
        .query('SELECT * FROM menu_table;')

        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
            menu.push(query_res.rows[i]);
            }

        const data = {menu: menu};
        console.log(menu);
        res.render('user', data);
    });
});

//console to know what the link is
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});