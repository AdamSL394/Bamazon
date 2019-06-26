DROP DATABASE IF EXISTS BamazonDB;

CREATE DATABASE BamazonDB;

USE BamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(50) NULL,
  price DECIMAL (10,5) NULL,
  stock_quantity INT (255) NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price,stock_quantity )
VALUES ("Red Hoodie", "Tops", 100,1000)
("Nike Sneakers", "Shoes", 120.5,1000)
("Black Jeans", "Bottoms", 150, 1000),
("Yeezy Zebras", "Shoes", 220, 100),
("Adidas Ultraboost", "Shoes", 200,250),
("Versace T-Shirt", "Top", 250.9,100),
("Balenciaga Sweater", "Tops", 250,100),
("Blue Jeans", "Bottom", 200.82,255),
("Camo Short", "Bottom", 50,250),
("Black T-Shirt", "Tops", 20,255)
