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
INSERT INTO `product` (`id`, `name`, `img`, `description`, `price`, `created_at`, `updated_at`) VALUES
(1, 'Camisa negra', '/public/productImages/producto1.jpg', 'Camisa de color negro', 15000, '2024-06-01 01:20:57', '2024-06-01 01:21:10'),
(2, 'Silla gamer', '/public/productImages/producto2.jpg', 'Una silla bastante cara', 350000, '2024-06-01 01:23:27', '2024-06-01 01:23:27'),
(3, 'Caja de herramientas', '/public/productImages/producto3.jpg', 'Una caja de herramientas útil en cualquier momento.', 142000, '2024-06-01 01:25:11', '2024-06-01 01:25:11'),
(4, 'Cámara WEB', '/public/productImages/producto4.jpg', 'Una cámara útil de grand calidad y resistencia.', 75000, '2024-06-01 01:26:06', '2024-06-01 01:26:06');


CREATE TABLE orden(
    id INT(11) NOT NULL AUTO_INCREMENT,
    id_user INT(11) DEFAULT NULL,
    id_product INT(11) DEFAULT NULL,
    tracking_number VARCHAR(45) DEFAULT NULL,
    status ENUM('En proceso', 'Enviado', 'Entregado', 'Cancelado') DEFAULT 'En proceso',
    shipping_date VARCHAR(20) DEFAULT NULL,
    cost INT(11) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (id_user) REFERENCES user(id),
    FOREIGN KEY (id_product) REFERENCES product(id)
);


CREATE TABLE cart(
    id INT(11) NOT NULL AUTO_INCREMENT,
    id_user INT(11) DEFAULT NULL,
    id_product INT(11) DEFAULT NULL,
    quantity INT(11) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (id_user) REFERENCES user(id),
    FOREIGN KEY (id_product) REFERENCES product(id)
);