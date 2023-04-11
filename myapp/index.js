//postgres functionality
const { Pool } = require('pg');
const dotenv = require('dotenv').config()

//express app functionality
const express = require('express');
const app = express();
const port = 3001;


// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false},
    headers: {'Access-Control-Allow-Origin': '*'}
});


// Add process hook to shutdown pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

//setting view
//app.set("view engine", "ejs");

//default route
// app.get('/', (req, res) => {
//     const data = {name: 'Cameron'};
//     res.render('index', data);
// });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
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
        res.json({message: menu});
    });
});

app.get('/inventory', (req,res) =>{
    inventory = []
    pool
        .query('SELECT * FROM inventory;')

        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
            menu.push(query_res.rows[i]);
            }

        const data = {inventory: inventory};
        console.log(inventory);
        res.json({message: inventory});
    });

 


});



//console to know what the link is
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


function parse_transaction(str)
{
    const amount = [];
    const index = str.indexOf("|");
    const nextChar = str.charAt(index + 1);
    //parse the transaction line of what is being ordered
    amount[0] = parseInt(str, charAt(0));
    amount[1] = parseInt(nextChar);
    
    //update the inventory based on the count
}