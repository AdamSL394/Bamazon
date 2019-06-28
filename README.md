# Bamazon
Bamazon  <a href="https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options">CLI</a> app. Meaning you'll be able to see what it does in the images below! I will provide an overview here:
We begin by calling the the Node < file name > this will bring up the Inquirer prompt to purchase a product by its ID & how many you would like to purchase. 


We are connecting our Javascript file to the <a href="https://www.w3schools.com/sql/">Mysql</a> database we have created and are selecting a primary ID and matching that to the ID's stock quantity located in another column. We are checking if the ID has enough stock to purchase and are multiplying the price times the amount purchase and removing it from our database. 

On the Manager view we are able to chose between four options by using inquirer:
<ol>
<li> View Products for Sale
<li> View Low Inventory
<li> Add to Inventory
<li> Add New Product
<ol>

By Viewing products for sale we are passing calling our database and iterating through the results and displaying them in a cli-table interface. 

For low inventory anything below 5 items we are iterating through the stock quantity column of the database and returning all the values below 5

For Adding inventory we are taking the users selection  <a href="https://www.w3schools.com/sql/sql_primarykey.asp">ID number </a> and choosing that items stock quantity. From here we set that stock quantity to a variable we parse into an integer and ad to the users inputed quantity they would like to add from here we set the stock as this new quantity to where the user has selected the ID number. 

Lastly for adding a new product we prompt the user to input the same information that is in our table headers in that order. Product name, Department, price and quantity. From here we call on the <a href="https://www.w3schools.com/sql/sql_insert_into_select.asp">INSERT INTO </a>and pass off the users input answer to the table 


## Perquisites
You need to git pull this repo to your desktop using git clone and the git hub url. This application will need to be open in a text editor or ran in the terminal.You will need to install the Node package managers mysql & inquirer & cli-table2.

## Running Tests/Instructions
Open the file in your text editor or terminal. Install the node packages listed below. Move into the file you have saved the file in and type node < the filename >.js. This will start the application running.

## Built with:
<ol>
<li> Javascript
<li> MYSql
<li> Inquirer`
<li> Cli table
</ol>

### Local Development Environment for website Repo
The following will get up and running locally.

Author
Adam Lehrer

![Bamazon](assets/CustomerView.gif)
![Bamazon](assets/ManagerView.gif)




