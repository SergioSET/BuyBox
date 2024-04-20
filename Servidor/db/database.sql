CREATE DATABASE IF NOT EXISTS buyboxdb;

USE buyboxdb;

CREATE TABLE usuario(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
)

INSERT INTO usuario  VALUES
    (1, 'jhon', 'jhon123');
