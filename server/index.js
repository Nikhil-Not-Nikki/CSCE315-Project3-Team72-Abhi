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

//globals


// Add process hook to shutdown pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});




app.get('/', (req,res) =>
{
    inventory = []
    pool
        .query('SELECT * FROM inventory;')

        .then(query_res => 
        {
            for (let i = 0; i < query_res.rowCount; i++)
            {
                inventory.push(query_res.rows[i]);
            }
            const data = {inventory: inventory};
            console.log(inventory);
            res.json({message: inventory});
        });
});


app.get('/menu', (req, res) => {
    menu = []; 
    pool
        .query('SELECT * FROM menu_table;')
        .then(query_res =>
        {
            for (let i = 0; i < query_res.rowCount; i++)
            {
                menu.push(query_res.rows[i]);
            }
            const data = {menu: menu};
            console.log(menu);
            res.json({message: menu});
        });


// route to update quantities in the inventory table
app.post('/update-inventory:string', (req, res) => {
    const updates = req.body.updates;
    
    // iterate through the updates and construct an SQL query for each one
    updates.forEach((update) => {
      const query = `UPDATE inventory SET quantity = ${update.quantity} WHERE name = "${update.name}"`;
  
      // execute the query
      pool.query(query, (err, result) => {
        if (err) throw err;
        console.log(`${update.name} has been updated to ${update.number}.`);
      });
    });
  
    res.send('Inventory updated successfully.');
  });


function parse_transaction(str, numArray, strArray)
{
    const temp = str.split("\\|");

    let i = 0;
    while (i < temp.length)
    {
        numArray[i] = parseInt(temp[i].charAt(0));
        strArray[i] = temp[i].substring(2);
        i++;
    }
    //parse the transaction line of what is being ordered
    //update the inventory based on the count
}

function parse_menutable(menuArray, numArray, strArray)
{
    //this function should take in a menu array, the order array, and the numarray of the amount of each order.
    //it should locate the item and parse the amount it uses for order. From here it should multiply the orderArray by the materials from the material table
}

function update_inventory(orders, inventory)
{
    //this function should take in the amount of materials to be used by the orders and 
}


});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});