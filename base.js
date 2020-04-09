//Load Modules
var mysql = require("mysql");
var inquirer = require("inquirer");
var customer = require("./bamazonCustomer");
var manager = require("./bamazonManager");
var supervisor = require("./bamazonSupervisor");

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

//Start Connection
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  ////
  //RUN CODE HERE
  //
  ////
  customer.queryProducts();

  connection.end();
});
