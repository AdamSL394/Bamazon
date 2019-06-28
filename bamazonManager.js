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
}); ``
//  First we connect to the database & check for errors, then we run the after connection function 
connection.connect(function (err) {
    if (err) throw err;
    afterConnection();
});


function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var data = res
        inquirer.prompt([
            {
                name: "selection",
                type: "list",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                message: "Here is our Avaliable selection",
            },
        ]).then(function list(answer) {
            switch (answer.selection) {

                case "View Products for Sale":
                    return viewProductsForSale(data)

                case "View Low Inventory":
                    return viewLowInventory(data)

                case "Add to Inventory":
                    return addToInventory(data)

                case "Add New Product":
                    return addNewProduct(data)

            }
        })


    })
}

function viewProductsForSale(res) {
    var table = new Table({
        head: ["ID", "Product Name", "Department Name", "Price", "Stock Quantity"],
        colWidths: [5, 20, 20, 10, 16],

    });
    for (var i = 0; i < res.length; i++) {
        table.push
            ([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    }

    console.log(table.toString());
    afterConnection();
}



function viewLowInventory(res) {
    var table = new Table({
        head: ["ID", "Product Name", "Department Name", "Price", "Stock Quantity"],
        colWidths: [5, 20, 20, 10, 16],
    });
    for (var i = 0; i < res.length; i++) {
        if (res[i].stock_quantity < 300)
            table.push
                ([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    }
    console.log(table.toString());
    afterConnection()
}



function addToInventory(res) {
    var table = new Table({
        head: ["ID", "Product Name", "Department Name", "Price", "Stock Quantity"],
        colWidths: [5, 20, 20, 10, 16],
    });
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
            message: "What ID would you like to add to",
        },
        {
            type: "input",
            message: `How many would you like to add [press q to quit] & enter`,
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
                var newStock = res[i].stock_quantity
                parseInt(newStock)
                newStock += parseInt(answer.purchase)
                var query = connection.query(

                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newStock
                        },
                        {
                            id: answer.userSelection
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " products updated!\n");

                    }
                );


            }

        }

        afterConnection();
    })
}


function addNewProduct() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Name of the product you'd like to add",
            name: "product"
        },
        {
            type: "list",
            message: "What is the department would you like to add to",
            choices: ["Tops", "Bottoms", "Shoes", "Shirts"],
            name: "department"
        },
        {
            type: "input",
            message: "What is the price of the product you are adding ?",
            name: "price"
        },
        {
            type: "input",
            message: "What is the quantity you are adding??",
            name: "quantity"
        }
    ]).then(function (answer) {
        console.log(answer.product);
        console.log(answer.department);
        console.log(answer.price);
        console.log(answer.quantity);
        console.log("Inserting a new product...\n");
        var query = connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.product,
                department_name: answer.department,
                price: answer.price,
                stock_quantity:answer.quantity
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " product inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                
            }
        );

        // logs the actual query being run
        console.log(query.sql);

    })
    afterConnection();

}


