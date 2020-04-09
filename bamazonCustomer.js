//Load Modules
var mysql = require("mysql");
var inquirer = require("inquirer");

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

//Query all products
function queryProducts() {
  sql = "SELECT item_id, product_name, price FROM products;";
  connection.query(sql, function (err, res) {
    if (err) throw err;

    console.table(res);
  });
}

//CONNECT TO DATABASE
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryProducts();
  connection.end();
});



//EXPORTS
exports.queryProducts = queryProducts;
