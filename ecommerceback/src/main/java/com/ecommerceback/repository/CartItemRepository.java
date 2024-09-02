package com.ecommerceback.repository;

import com.ecommerceback.model.Cart;
import com.ecommerceback.model.CartItem;
import com.ecommerceback.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    // Método personalizado para obtener ítems de un carrito por su ID
    List<CartItem> findByCartId(Long cartId);

    // Método personalizado para encontrar un CartItem por su Cart y Item
    Optional<CartItem> findByCartAndItem(Cart cart, Item item);
}