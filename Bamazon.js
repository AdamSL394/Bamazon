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
var table = new Table({
    head: ['TH 1 label', 'TH 2 label']
  , colWidths: [100, 200]
});

connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
inquirer.prompt([
    {
        name:"choice",
        type:"rawlist",
        choices: function(){
            var listArray =[];
        for(var i = 0; i < res.length; i++){
           table.push(res[i].id ,res[i].product_name,res[i].department_name,res[i].price,res[i].stock_quantity)
   

        }
        return listArray ;
        },
        message:"What ID would you like  to bid on",
      
       
    },
    {
        name:"id",
        type:"input",
        message:"What ID would you like to buy",
        
    }

  
]).then(function(){
    console.log("hi");
})

})
