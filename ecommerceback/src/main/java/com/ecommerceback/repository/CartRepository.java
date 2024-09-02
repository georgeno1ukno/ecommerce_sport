package com.ecommerceback.repository;

import com.ecommerceback.model.Cart;
import com.ecommerceback.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    // Método personalizado para encontrar el carrito por usuario
    Optional<Cart> findByUser(User user);
}