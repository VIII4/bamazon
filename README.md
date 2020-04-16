# bamazon

CLI Marketplace App powered by JS, NODE, and SQL

## Overview

## CLI mock marketplace using SQL database and Inquirer. Choose between manager and customer shell interface, which allow commands to make purchases from available stock, check inventory and add stock.

**You will need to create the database that this app interacts with. The `seeds.sql` file has the schema commands for MySQL Workbench to create and populate the database used for this app. If you copy and paste the entire text into MySQL Workbench and run it, it will create the database.**
**You will also need to install the necessary node modules to run this app. They are all in the package.json file, so all you have to do is run the terminal command `npm install` to install all the required node packages.**
**Once you have created the database and installed the necessary node packages, you are ready to run the app.**

---

- Simply type `node base.js` in terminal (in the same directory as the base.js file) and run it.
- The app will then give user options
- When user selects customer app will:
  - query the database and give you a table listing all the items available for sale.
  - It will prompt you to make a selection of what item you want to purchase.
    _(Enter the Item ID to select one)_
  - Then it will give you a prompt asking the quantity you would like to purchase.
    _(Enter a number and hit enter)_
  - The app will check the database inventory and make sure there is enough to complete the order.
    - If there is enough inventory to complete the order, you will get a message completing your order.
    - If ther is insufficient inventory to complete the order, you will get a message saying no stock avialable.

When user selects Manager app will:
-prompt for password (password: "password")
-provide manager menu to view and adjust inventory

Here is a link to a video of the app in use:
[bamazonCustomer.js in action]( [link Demo](https://drive.google.com/file/d/1Cd9uLDYGX4Kz1tnB0m7JY-vdpN6Bt2WR/view "Bamazon Demo") )

**Alternatively (https://github.com/VIII4/bamazon/blob/master/vid/IJL_bamazon_demo.webm)
_(on the linked page, click on "View raw" to get the video.)_**
