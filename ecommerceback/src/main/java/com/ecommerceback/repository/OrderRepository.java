package com.ecommerceback.repository;

import com.ecommerceback.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Método personalizado para encontrar órdenes por ID de usuario
    List<Order> findByUserId(Long userId);
}