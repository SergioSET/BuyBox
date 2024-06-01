DROP DATABASE IF EXISTS buyboxdb;

CREATE DATABASE IF NOT EXISTS buyboxdb;

USE buyboxdb;

CREATE TABLE user(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    role ENUM('Usuario', 'Admin') DEFAULT 'Usuario',
    email VARCHAR(255) DEFAULT NULL,
    address VARCHAR(255) DEFAULT NULL,
    phone VARCHAR(45) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
INSERT INTO user (name, password, email, role) VALUES ('superadmin', '$2b$10$M88KU2aAUsMS0yEQJuspVe/SM1XBq72gXOf4DNWdCZ7Vod3mfRl5O', 'admin@admin.com', 'Admin');
INSERT INTO user (name, password, email, role) VALUES ('Sergio', '$2b$10$M88KU2aAUsMS0yEQJuspVe/SM1XBq72gXOf4DNWdCZ7Vod3mfRl5O', 'sergio@gmail.com', 'Usuario');

CREATE TABLE product(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    img VARCHAR(255) DEFAULT NULL,
    description VARCHAR(255) DEFAULT NULL,
    price INT(11) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE orden(
    id INT(11) NOT NULL AUTO_INCREMENT,
    id_user INT(11) DEFAULT NULL,
    id_product INT(11) DEFAULT NULL,
    tracking_number VARCHAR(45) DEFAULT NULL,
    status ENUM('Sin ordernar', 'En proceso', 'Enviado', 'Entregado', 'Cancelado') DEFAULT 'En proceso',
    shipping_date VARCHAR(20) DEFAULT NULL,
    cost INT(11) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (id_user) REFERENCES user(id),
    FOREIGN KEY (id_product) REFERENCES product(id)
);
