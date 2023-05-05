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

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get('/user', (req, res) => {
    menu = []
    pool
        .query('SELECT * FROM menu_table;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                menu.push(query_res.rows[i]);
            }
            const data = {menu: menu};
            res.json({message: menu});
        });
});

app.get('/query', async (req, res) => {
    await pool
        .query(req.query.cmd)
        .then(query_res => {
            res.json({result: query_res.rows});
        });
});

app.get('/xz-report', (req, res) => {
    pool
        .query("SELECT * FROM transaction_history")
        .then(result => {
            res.json({list: result.rows.filter(transaction => transaction.date === req.query.date_str)});
        });
});

app.get('/restock-report', (req, res) => {
   pool
       .query("SELECT * FROM inventory")
       .then(result => {
           console.log(result.rows.filter(item => item.quantity < item.min_amount));
           res.json({list:result.rows.filter(item => item.quantity < item.min_amount)});
       });
});

app.get('/sales-report', (req, res) => {
   pool
       .query(`SELECT * FROM transaction_history WHERE date >= '${req.query.start_date}' AND date <= '${req.query.end_date}'`)
       .then(result => {
           res.json({list: result.rows});
       })
});

app.post('/post-transaction', (req, res) => {
    parse_transaction(req.query.transaction);
    pool
        .query(`SELECT * FROM transaction_history`)
        .then(result => {
            for (let i = 0; i < query_res.rowCount; i++){
                menu.push(query_res.rows[i]);
            }
            const data = {menu: menu};
            res.json({message: menu});
        })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

function parse_transaction(str) {
    const itemCounts = {};
    const items_sold = str;
    const itemsSoldSTR = str.split("|");
  
  
    // Parse the items and their quantities
    for (let i = 0; i < itemsSoldSTR.length - 2; i++) {
      const [quantity, item] = itemsSoldSTR[i].split(" ");
      itemCounts[item] = parseInt(quantity);
    }
  
    // Parse the price and employee
    const lastTwoItems = itemsSoldSTR.slice(-2);
    const [priceStr, employee] = lastTwoItems;
    const Price = parseFloat(priceStr);
  
    // Print out the items and their prices
    for (let item in itemCounts) {
      const quantity = itemCounts[item];
      console.log(`${quantity} ${item}: $${(Price * quantity).toFixed(2)}`);
    }
  
    // Print out the total price and the employee
    console.log(`Total Price: $${Price.toFixed(2)}\nEmployee: ${employee}`);
  
    countItemsSoldAndManageInventory(items_sold,itemCounts,employee,Price);
}
  
async function countItemsSoldAndManageInventory(items_sold,itemCounts,employee,price) {
    //const TransactionNumber = await executeSQLCommand(`SELECT quantity FROM inventory WHERE name='${item}'`);
    const itemsSoldList = removeCharactersAfterSecondToLastPipe(items_sold);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentDate = year + '-' + month + '-' + day;

    var id = await executeSQLCommand("SELECT id FROM transaction_history ORDER BY id DESC LIMIT 1");
    id = stripNonDigitsAndIncrement(id);
    console.log("id:"+ id);
    try {
    const client = await pool.connect();
    const query = `INSERT INTO transaction_history (id, transaction_number, date, items_sold, employee, total_price) VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [id, id, currentDate, itemsSoldList, employee, price];
    const result = await client.query(query, values);
    console.log('Data inserted into table successfully!');
    client.release();
    } catch (err) {
    console.error('Error inserting data into table: ', err);
    }
    UpdateInventory(itemCounts);
}
  
async function UpdateInventory(itemCounts) {
    for (let item in itemCounts) {
    console.log("item being processed: "+item);
    var Materials = await executeSQLCommand(`SELECT materials FROM menu_table WHERE name='${item}'`);
    console.log("Materials to make "+ item+" : "+removeChars(Materials));
    Materials = removeChars(Materials);
    const Parsed_Materials = parseMenuMaterials(Materials);

    for(material in Parsed_Materials){
        console.log("material being managed: "+material);
        var currentQuantity = await executeSQLCommand(`SELECT quantity FROM inventory WHERE name='${material}'`);
        currentQuantity = stripNonDigitsAndIncrement(currentQuantity);
        console.log("quantity from database: "+currentQuantity);
        console.log("ammount of this meterial being used = "+itemCounts[item]+"(ammount of "+item+") * "+Parsed_Materials[material]+"(ammount of "+material+") = "+ Parsed_Materials[material] * itemCounts[item]);
        const newQuantity = currentQuantity - Parsed_Materials[material] * itemCounts[item];
        await executeSQLCommand(`UPDATE inventory SET quantity=${newQuantity} WHERE name='${material}'`);
    }
    }
}

async function executeSQLCommand(sqlCommand) {
    try {
    const client = await pool.connect();
    const result = await client.query(sqlCommand);
    client.release();
    console.log("Executed: "+ sqlCommand.toString());
    return JSON.stringify(result.rows);
    } catch (err) {
    console.error(err);
    } 
}

function removeCharactersAfterSecondToLastPipe(str) {
    // Split the string by the '|' character
    const parts = str.split('|');
    
    // If there are less than three parts, there's no need to remove anything
    if (parts.length < 3) {
    return str;
    }
    
    // Join the first n-2 parts with the '|' character
    const newStr = parts.slice(0, parts.length - 2).join('|');
    
    return newStr;
}

function stripNonDigits(str) {
    const numericString = str.replace(/\P{N}/gu, ''); // replace all non-numeric characters with an empty string
    return numericString.replace(/\s+/g, ''); // remove all spaces from the resulting string
}

function stripNonDigitsAndIncrement(str) {
    const numericString = str.replace(/\P{N}/gu, ''); // replace all non-numeric characters with an empty string
    const numericValue = parseInt(numericString, 10); // convert numeric string to a number
    const incrementedValue = numericValue + 1; // increment the numeric value by 1
    return String(incrementedValue); // convert incremented value back to a string and return it
}

/*function parseOrderString(orderString) {
    const itemsAndQuantities = orderString.split('|');
    const itemCounts = {};
    for (let i = 0; i < itemsAndQuantities.length - 2; i++) {
    const [quantityString, itemName] = itemsAndQuantities[i].split(' ');
    const quantity = parseInt(quantityString);
    itemCounts[itemName] = quantity;
    }
    const total = parseFloat(itemsAndQuantities[itemsAndQuantities.length - 2]);
    const employee = itemsAndQuantities[itemsAndQuantities.length - 1];
    return { itemCounts, total, employee };
}*/

function parseItems(str) {
    const items_sold = str;
    const items = str.split('|');
    const itemCounts = {};
    let total = 0;
    let employee = "";

    for (let i = 0; i < items.length; i++) {
    if (i === items.length - 2) {
        total = items[i];
    } else if (i === items.length - 1) {
        employee = items[i];
    } else {
        const [quantity, ...nameArr] = items[i].split(' ');
        const name = nameArr.join(' ');
        itemCounts[name] = +quantity;
    }
    }

    console.log("Total Price: " + total);
    console.log("Employee: " + employee);

    for (let item in itemCounts) {
    //console.log(item + ": " + itemCounts[item]);
    }
    countItemsSoldAndManageInventory(items_sold,itemCounts,employee,total);
    return itemCounts;
}

function parseMenuMaterials(str) {
    const items_sold = str;
    const items = str.split('|');
    const itemCounts = {};

    for (let i = 0; i < items.length; i++) {
        const [quantity, ...nameArr] = items[i].split(' ');
        const name = nameArr.join(' ');
        itemCounts[name] = +quantity;
    }


    for (let item in itemCounts) {
    //console.log(item + ": " + itemCounts[item] + "(materials)");
    }
    return itemCounts;
}
function removeChars(str) {
    
    str = str.slice(15, -3);
    console.log(str);
    return str
}
  
