var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Leila@1357",
  database: "greatBay_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "Your_choice",
        choices: ["post an item", "bid on an item", "Exit"]
      }
    ])
    .then(function(answers) {
      console.log(answers.Your_choice);
      if (answers.Your_choice === "post an item") {
        postAuction();
      } else if (answers.Your_choice === "bid on an item") {
        bidAuction();
      } else {
        connection.end();
      }
    });
}

function postAuction() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "item_name",
        message: "what is the item's name?"
      },
      {
        type: "input",
        name: "item_category",
        message: "what is the item's category?"
      },
      {
        type: "input",
        name: "starting_bid",
        message: "What would you like your starting bid to be?"
      }
    ])
    .then(function(userInput) {
      var itemName = userInput.item_name;
      var itemCategory = userInput.item_category;
      var startingBid = userInput.starting_bid;
      var highest_bid = userInput.starting_bid;

      var query = connection.query(
        "INSERT INTO auctions SET ?",
        {
          item_name: itemName,
          category: itemCategory,
          starting_bid: startingBid,
          highest_bid: highest_bid
        },
        function(err, res) {
          if (err) throw err;
        }
      );
    });
}

function bidAuction() {
  connection.query("SELECT * FROM auctions", function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var arrayChoices = [];
            for (i = 0; i < res.length; i++) {
              arrayChoices.push(res[i].item_name);
            }
            return arrayChoices;
          },
          message: "What auction would you like to place a bid in?"
        },
        {
          name: "bid",
          type: "input",
          message: "How much would you like to bid?"
        }
      ])
      .then(function(answers) {
        var chosenItem;
        for (i = 0; i < res.length; i++) {
          if (res[i] === answers.choice) {
            chosenItem.push(res[i]);
          }
        }

        if (parseFloat(answers.bid) > chosenItem.highest_bid) {
          connection.query(
            "UPDATE auctions SET= ? WHERE ?",
            [{ highest_bid: parseFloat(answers.bid) }, { id: chosenItem.id }],
            function(err) {
              if (err) throw err;
              console.log("Bid Placed successfully!");
              start();
            }
          );
        }
      });
  });
}
