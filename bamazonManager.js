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

//Manager Root Menu
function managerMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: "Welcome Bamazon Manager, Select from following options",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "Exit",
        ],
      },
    ])
    .then(function (answers) {
      switch (answers.option) {
        case "View Products for Sale":
          showAllProducts();
          break;
        case "View Low Inventory":
          showLowInventory();
          break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Product":
          addProduct();
          break;
        case "Exit":
          connection.end();
          main.quit();
      }
    });
}

//View Products
function showAllProducts() {
  sql = "SELECT * FROM products;";
  connection.query(sql, function (err, res) {
    if (err) throw err;

    //Show Products
    console.table(res);
    managerMenu();
  });
}

//View low Inventory
function showLowInventory() {
  var sql =
    "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5";

  connection.query(sql, function (err, res) {
    if (err) throw err;
    console.table(res);
    managerMenu();
  });
}

//Add Inventory
function addInventory() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "item_id",
        message: "Please enter the Item ID of inventory you would like to add",
      },
      {
        type: "input",
        name: "quantity",
        message: "How much inventory would like to add?",
      },
    ])
    .then(function (answers) {
      var updateItem = [];

      //Run query
      sql = "SELECT stock_quantity FROM products WHERE item_id=?";
      connection.query(sql, [answers.item_id], function (err, res) {
        if (err) throw err;
        updateItem.push(
          parseFloat(res[0].stock_quantity) + parseFloat(answers.quantity)
        );
        updateItem.push(answers.item_id);
      });

      inquirer
        .prompt([
          {
            type: "confirm",
            name: "confirmation",
            message:
              "Please confirm you would like to add " +
              answers.quantity +
              " of Item ID :" +
              answers.item_id,
          },
        ])
        .then(function (answers) {
          if (answers.confirmation) {
            updateInventory(updateItem);
          } else {
            addInventory();
          }
        })
        .catch();
    })
    .catch();
}

//Update Inventory
function updateInventory(_itemInfo) {
  sql = "UPDATE products SET stock_quantity =? WHERE item_id =?";
  //Update database
  connection.query(sql, _itemInfo, function (err, res) {
    if (err) throw err;
    showAllProducts();
  });
}

//Add new product
function addProduct() {
  //inquirer prompt to add product
  inquirer
    .prompt([
      {
        type: "input",
        name: "product_name",
        message: "What is the name of the product you would like to add?",
      },
      {
        type: "input",
        name: "department_name",
        message: "What department does this product belong to?",
      },
      {
        type: "input",
        name: "price",
        message: "What is the selling price?",
      },
      {
        type: "input",
        name: "stock_quantity",
        message: "What is inital stock quantity?",
      },
    ])
    .then(function (answers) {
      var _product = [
        answers.product_name,
        answers.department_name,
        answers.price,
        answers.stock_quantity,
      ];
      inquirer
        .prompt([
          {
            type: "confirm",
            name: "confirmation",
            message: "Please confirm you would like to add: " + _product,
          },
        ])
        .then(function (answers) {
          if (answers.confirmation) {
            //Update Products
            updateProducts(_product);
          } else {
            addProduct();
          }
        });
    });
}

//update Products
function updateProducts(_product) {
  sql =
    "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ( ?, ?, ?, ?)";
  connection.query(sql, _product, function (err, res) {
    if (err) throw err;
    showAllProducts();
  });
}

////Exports
exports.managerMenu = managerMenu;
