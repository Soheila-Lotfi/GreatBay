var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  passwoed: "Leila@1357",
  database: "greatBay_DB"
});

inquirer
  .prompt([
    {
      type: "list",
      name: "Your_choice",
      choices: ["post an item", "bid on an item"]
    }
  ])
  .then(function(answers) {
    console.log(answers.Your_choice);
    if (answers.Your_choice === "post an item") {
    }
  });

//If the user selects "POST AN ITEM" they are prompted for an assortment of information regarding the item
//and then that information is added to the database so that others can bid on it
