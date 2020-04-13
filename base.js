//Load Modules
var inquirer = require("inquirer");
var customer = require("./bamazonCustomer");
var manager = require("./bamazonManager");
var supervisor = require("./bamazonSupervisor");

//Prompt user to select Item

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "user",
        message: "Welcome to Bamazon, please select from the following options",
        choices: ["Customer", "Manager", "Supervisor"],
      },
    ])
    .then((answers) => {
      if (answers.user === "Customer") {
        //Run Customer App
        customer.queryProducts();
      } else if (answers.user === "Manager") {
        //Run PW Manager Prompt
        inquirer
          .prompt([
            {
              type: "password",
              message: "Enter a password",
              mask: "*",
              name: "password",
            },
          ])
          .then(function (answers) {
            if (answers.password === "password") {
              console.log("Welcome Manager");
              //Run Manager App here
              manager.managerMenu();
            } else {
              console.log("access denied");
              start();
            }
          })
          .catch();
      } else if (answers.user === "Supervisor") {
        //Run PW Supervisor Prompt
        inquirer
          .prompt([
            {
              type: "password",
              message: "Enter a password",
              mask: "*",
              name: "password",
            },
          ])
          .then(function (answers) {
            if (answers.password === "password") {
              console.log("Welcome Supervisor");
              //Run Supervisor App Here
            } else {
              console.log("Access Denied");
              start();
            }
          })
          .catch();
      }
    })
    .catch((error) => {});
}

function quit() {
  console.log("Thank you for using Bamazon CLI");
  process.exit();
}

//exports
exports.quit = quit;

start();
