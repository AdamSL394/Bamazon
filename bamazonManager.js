var mysql = require("mysql");
var inquirer = require("inquirer");

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
