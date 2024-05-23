DROP DATABASE IF EXISTS buyboxdb;

CREATE DATABASE IF NOT EXISTS buyboxdb;

USE buyboxdb;

CREATE TABLE usuario(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    admin BOOLEAN DEFAULT FALSE,
    email VARCHAR(255) DEFAULT NULL,
    direccion VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

INSERT INTO usuario (name, password, admin) VALUES ('superadmin', '$2b$10$M88KU2aAUsMS0yEQJuspVe/SM1XBq72gXOf4DNWdCZ7Vod3mfRl5O', 1);


SELECT name, tracking_number, description, status, shipping_date, shipping_address, cost, orden.created_at AS ordenCreated, orden.updated_at AS ordenUpdated, orden.id_usuario AS IdUsuario FROM orden INNER JOIN usuario ON orden.id_usuario = usuario.id WHERE orden.id_usuario = ?;

WHERE IdUsuario = 2