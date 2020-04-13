//Load Modules
var mysql = require("mysql");
var inquirer = require("inquirer");
var main = require("./base");

//Create Connection
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",

  //Name of Database
  database: "bamazon",
});

//CONNECT TO DATABASE
connection.connect(function (err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
});

////Functions

//Show all products
function queryProducts() {
  sql = "SELECT item_id, product_name, price FROM products;";
  connection.query(sql, function (err, res) {
    if (err) throw err;

    //Show Products
    console.table(res);

    //Start Inquirer prompt
    inquirer
      .prompt([
        {
          type: "input",
          name: "item_id",
          message: "Please insert the Item ID you would like to purchase",
          validate: function (name) {
            return !isNaN(name);
          },
        },
        {
          type: "input",
          name: "amount",
          message: "How many units would you like to purchase?",
          validate: function (name) {
            return !isNaN(name);
          },
        },
      ])
      .then((answers) => {
        //Prompt in Stock, then inquire Confirm
        checkStock(answers.item_id, answers.amount);
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else when wrong
        }
      });
  });
}

//Check Stock
function checkStock(_itemId, _amount) {
  //query database stock value where item is, see if amount is equal or greater to request
  sql =
    "SELECT stock_quantity, product_name, price FROM products WHERE item_id=?";
  connection.query(sql, [_itemId], function (err, res) {
    if (err) throw err;

    var stockqty = res[0].stock_quantity;
    var productName = res[0].product_name;
    var price = res[0].price;
    var cost = price * _amount;
    var updatedStock = stockqty - _amount;

    if (stockqty >= _amount) {
      //In Stock
      inquirer
        .prompt([
          {
            type: "confirm",
            name: "makePurchase",
            message:
              "Please Confirm purchase of " +
              _amount +
              " " +
              productName +
              "(s), for " +
              cost,
          },
        ])
        .then(function (answers) {
          if (answers.makePurchase) {
            //Complete Purchase
            console.log(
              "your accont will be charged " +
                cost +
                ", Thank you for your purchase. "
            );
            makePurchase(_itemId, updatedStock);
            connection.end();
            main.quit();
          } else {
            queryProducts();
          }
        })
        .catch();
    } else {
      //not in stock
      console.log("Sorry this Item is not in stock");
      queryProducts();
    }
  });
}

//Complete Purchase and Update database
function makePurchase(_itemId, _update) {
  var sql =
    "UPDATE products SET stock_quantity =" + _update + " WHERE item_id =?";

  //Update database
  connection.query(sql, [_itemId], function (err, res) {
    if (err) throw err;
  });
}

////EXPORTS
exports.queryProducts = queryProducts;
