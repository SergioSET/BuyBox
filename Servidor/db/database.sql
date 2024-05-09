DROP DATABASE IF EXISTS buyboxdb;

CREATE DATABASE IF NOT EXISTS buyboxdb;

USE buyboxdb;

CREATE TABLE usuario(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) DEFAULT NULL,
    direccion VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE orden(
    id INT(11) NOT NULL AUTO_INCREMENT,
    id_usuario INT(11) DEFAULT NULL,
    tracking_number VARCHAR(45) DEFAULT NULL,
    description VARCHAR(255) DEFAULT NULL,
    status VARCHAR(45) DEFAULT NULL,
    shipping_date VARCHAR(20) DEFAULT NULL,
    shipping_address VARCHAR(255) DEFAULT NULL,
    cost INT(11) DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);
