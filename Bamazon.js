var mysql = require("mysql");
var inquirer = require("inquirer");


var Table = require("cli-table2");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "BamazonDB"
});
//  First we connect to the database & check for errors, then we run the after connection function 
connection.connect(function (err) {
    if (err) throw err;
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        // if (err) throw err;
        var table = new Table({
            head: ["ID", "Product Name", "Department Name", "Price", "Stock Quantity"],
            colWidths: [5, 20, 20, 10, 16]
        });


        // once you have items prompt user what they'd like to bid on
        inquirer.prompt([
            {
                name: "userSelection",
                type: "input",
                choices: function () {
                    for (var i = 0; i < res.length; i++) {
                        table.push
                            ([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
                    }

                    console.log(table.toString());

                },
                message: "What ID would you like to bid on",
            },
            {
                type: "input",
                message: `How many would you like to buy`,//${userSelection}
                name: "purchase"
            }
        ]).then(function (answer) {
            var productSelection;
            for (var i = 0; i < res.length; i++) {
                if (parseInt(answer.userSelection) === res[i].id) {
                    productSelection = res[i].product_name
                    var newStock = res[i].stock_quantity - answer.purchase
                    console.log(newStock)
                    // res[i].stock_quantity = newStock
                    creatProduct();
                    // table.push(res[i].stock_quantity);
                    // console.log(table.toString());
                    
                }

            }
        })
    })
}

function creatProduct(newStock) {
    console.log("inserting new product...\n")
    var query = connection.query(
        "UPDATE products SET ?",
        {
            stock_quantity: newStock
        },
        
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
        }
    )
    console.log(query.sql);
    // afterConnection();
  
}

