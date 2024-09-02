
-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS ecommerce_sport;
-- Usar la base de datos creada
USE ecommerce_sport;

-- ====================================
-- CREACIÓN DE LA TABLA User
-- ====================================
CREATE TABLE IF NOT EXISTS User (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- Identificador único del usuario
    first_name VARCHAR(100) NOT NULL,     -- Nombre del usuario
    last_name VARCHAR(100) NOT NULL,      -- Apellido del usuario
    shipping_address VARCHAR(255) NOT NULL, -- Dirección de envío del usuario
    email VARCHAR(150) NOT NULL UNIQUE,   -- Correo electrónico del usuario (único)
    birth_date DATE NOT NULL,             -- Fecha de nacimiento del usuario
    password VARCHAR(255) NOT NULL,       -- Contraseña del usuario (encriptada)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del registro
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Fecha de última actualización
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Índice para búsquedas rápidas por correo electrónico
CREATE INDEX idx_user_email ON User(email);

-- ====================================
-- CREACIÓN DE LA TABLA Item
-- ====================================
CREATE TABLE IF NOT EXISTS Item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- Identificador único del artículo
    name VARCHAR(150) NOT NULL,           -- Nombre del artículo
    description TEXT NOT NULL,            -- Descripción del artículo
    image_url VARCHAR(255) NOT NULL,      -- URL de la imagen del artículo
    price DECIMAL(10, 2) NOT NULL,        -- Precio del artículo
    stock_quantity INT NOT NULL,          -- Cantidad disponible en stock
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del registro
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Fecha de última actualización
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Índice para búsquedas rápidas por nombre de artículo
CREATE INDEX idx_item_name ON Item(name);

-- ====================================
-- CREACIÓN DE LA TABLA Cart
-- ====================================
CREATE TABLE IF NOT EXISTS Cart (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- Identificador único del carrito
    user_id BIGINT NOT NULL,              -- Identificador del usuario asociado
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del registro
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Fecha de última actualización
    CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Índice para búsquedas rápidas por usuario en carritos
CREATE INDEX idx_cart_user_id ON Cart(user_id);

-- ====================================
-- CREACIÓN DE LA TABLA CartItem
-- ====================================
CREATE TABLE IF NOT EXISTS CartItem (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- Identificador único del ítem en el carrito
    cart_id BIGINT NOT NULL,              -- Identificador del carrito asociado
    item_id BIGINT NOT NULL,              -- Identificador del artículo
    quantity INT NOT NULL CHECK (quantity > 0), -- Cantidad del artículo en el carrito
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del registro
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Fecha de última actualización
    CONSTRAINT fk_cartitem_cart FOREIGN KEY (cart_id) REFERENCES Cart(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_cartitem_item FOREIGN KEY (item_id) REFERENCES Item(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Índice para búsquedas rápidas de ítems por carrito
CREATE INDEX idx_cartitem_cart_id ON CartItem(cart_id);

-- ====================================
-- CREACIÓN DE LA TABLA Order
-- ====================================
CREATE TABLE IF NOT EXISTS `Order` (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- Identificador único de la orden
    user_id BIGINT NOT NULL,              -- Identificador del usuario que realizó la orden
    shipping_address VARCHAR(255) NOT NULL, -- Dirección de envío de la orden
    order_status ENUM('PENDIENTE', 'CONFIRMADA', 'ENVIADA', 'ENTREGADA', 'CANCELADA') NOT NULL DEFAULT 'PENDIENTE', -- Estado de la orden
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del registro
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Fecha de última actualización
    CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Índice para búsquedas rápidas de órdenes por usuario
CREATE INDEX idx_order_user_id ON `Order`(user_id);

-- ====================================
-- CREACIÓN DE LA TABLA OrderItem
-- ====================================
CREATE TABLE IF NOT EXISTS OrderItem (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- Identificador único del ítem en la orden
    order_id BIGINT NOT NULL,             -- Identificador de la orden asociada
    item_id BIGINT NOT NULL,              -- Identificador del artículo
    quantity INT NOT NULL CHECK (quantity > 0), -- Cantidad del artículo en la orden
    unit_price DECIMAL(10, 2) NOT NULL,   -- Precio unitario del artículo al momento de la compra
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del registro
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Fecha de última actualización
    CONSTRAINT fk_orderitem_order FOREIGN KEY (order_id) REFERENCES `Order`(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_orderitem_item FOREIGN KEY (item_id) REFERENCES Item(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Índice para búsquedas rápidas de ítems por orden
CREATE INDEX idx_orderitem_order_id ON OrderItem(order_id);

-- ====================================
-- DATOS DE PRUEBA 
-- ====================================
-- Inserción de datos de prueba para verificar el funcionamiento de la base de datos

INSERT INTO User (first_name, last_name, shipping_address, email, birth_date, password)
VALUES 
('Juan', 'Perez', 'Calle Falsa 123', 'juan.perez@example.com', '1990-05-15', 'password123'),
('Maria', 'Gomez', 'Avenida Siempre Viva 456', 'maria.gomez@example.com', '1988-08-22', 'securepass456');

INSERT INTO Item (name, description, image_url, price, stock_quantity)
VALUES
('Balón de Fútbol', 'Balón oficial de la FIFA', 'http://example.com/ball.jpg', 29.99, 100),
('Raqueta de Tenis', 'Raqueta profesional', 'http://example.com/racket.jpg', 99.99, 50),
('Guantes de Boxeo', 'Guantes de cuero', 'http://example.com/gloves.jpg', 49.99, 75);

INSERT INTO Item (name, description, image_url, price, stock_quantity) VALUES
('Soccer Ball', 'High-quality soccer ball suitable for all surfaces.', 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Soccerball.svg', 25.00, 100),
('Basketball', 'Official size basketball for indoor and outdoor play.', 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png', 30.00, 50),
('Tennis Racket', 'Lightweight tennis racket with excellent grip.', 'https://upload.wikimedia.org/wikipedia/commons/1/10/Tennis_racket_and_ball.jpg', 75.00, 30),
('Running Shoes', 'Comfortable running shoes with shock absorption.', 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Running_shoe_icon.png', 120.00, 60),
('Yoga Mat', 'Non-slip yoga mat for all types of exercises.', 'https://upload.wikimedia.org/wikipedia/commons/6/63/Yoga_mat.png', 20.00, 150),
('Baseball Glove', 'Durable baseball glove for professional play.', 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Baseball_glove_%28LEFT%29.jpg', 50.00, 40),
('Cycling Helmet', 'Safety-certified cycling helmet with adjustable fit.', 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Cycling_helmet.png', 45.00, 25),
('Swimming Goggles', 'Anti-fog swimming goggles with UV protection.', 'https://upload.wikimedia.org/wikipedia/commons/5/54/Swimming_goggles.png', 15.00, 200),
('Golf Clubs Set', 'Complete set of golf clubs with a carrying bag.', 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Golf_clubs.jpg', 500.00, 10),
('Fishing Rod', 'Flexible fishing rod for all types of fishing.', 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Fishing_rod_and_reel.jpg', 85.00, 35);

