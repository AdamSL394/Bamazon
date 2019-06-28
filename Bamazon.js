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
            colWidths: [5, 20, 20, 10, 16],

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
                message: "What ID would you like to purchase",
            },
            {
                type: "input",
                message: `How many would you like to buy [press q to quit] & enter`,
                name: "purchase"
            }
        ]).then(function (answer) {
            var productSelection;
            if (answer.userSelection === "q" || answer.purchase === "q") {
                process.exit();
                connection.end();
            }
            for (var i = 0; i < res.length; i++) {
                if (parseInt(answer.userSelection) === res[i].id) {
                    productSelection = res[i].id
                    var newStock = res[i].stock_quantity - answer.purchase
                    if (newStock > 0) {
                        console.log("Hi you've bought a product!!")
                        updateStock(newStock, productSelection);
                        var price = parseInt(answer.purchase)
                        console.log("The total is: " + res[i].price * price)
                    }
                    else {
                        console.log("Insufficient quantity!")
                        afterConnection();
                    }
                }

            }
        })
    })
}

function updateStock(newStock, productSelection) {
    // console.log("updating new product...\n")
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newStock
            },
            {
                id: productSelection
            },
        ],
        function (err, res) {
            if (err) throw err;
            // console.log(res.affectedRows + " product updated!\n");
        }
    )
    // console.log(query.sql);
    afterConnection();

}

// function deleteProduct(productSelection) {
//     console.log("Deleting all excess rows...\n");
//     connection.query(
//         "DELETE FROM products WHERE ?",
//         {
//             id:
//         },
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " products deleted!\n");
//             // Call readProducts AFTER the DELETE completes

//         }
//     );
// }
// deleteProduct();

