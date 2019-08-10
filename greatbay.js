var inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "list",
      name: "Your choice",
      choices: ["post an item", "bid on an item"]
    }
  ])
  .then(function(answers) {
    console.log(answers);
  });
