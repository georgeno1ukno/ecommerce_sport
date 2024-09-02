package com.ecommerceback.service;

import com.ecommerceback.model.Cart;
import com.ecommerceback.model.CartItem;
import com.ecommerceback.model.Item;
import com.ecommerceback.model.User;
import com.ecommerceback.repository.CartRepository;
import com.ecommerceback.repository.ItemRepository;
import com.ecommerceback.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ItemRepository itemRepository;

    public Cart createCart(User user) {
        // Crear un nuevo carrito de compras para un usuario específico
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    public Cart getOrCreateCartForUser(User user) {
        return cartRepository.findByUser(user).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });
    }

    public Optional<Cart> getCartById(Long id) {
        // Obtener un carrito por su ID
        return cartRepository.findById(id);
    }

    public Optional<Cart> getCartByUser(User user) {
        // Obtener el carrito del usuario
        return cartRepository.findByUser(user);
    }

    public CartItem addItemToCart(User user, Long itemId, int quantity) {
        Cart cart = getOrCreateCartForUser(user);
        Optional<Item> itemOpt = itemRepository.findById(itemId);

        if (itemOpt.isPresent()) {
            Item item = itemOpt.get();

            // Verificar si el artículo ya está en el carrito
            CartItem cartItem = cartItemRepository.findByCartAndItem(cart, item)
                    .orElse(new CartItem());

            cartItem.setCart(cart);
            cartItem.setItem(item);
            int newQuantity = (cartItem.getQuantity() != null ? cartItem.getQuantity() : 0) + quantity;
            cartItem.setQuantity(newQuantity);

            return cartItemRepository.save(cartItem);
        }
        return null;
    }

    public void removeItemFromCart(Long cartItemId) {
        // Eliminar un artículo del carrito
        cartItemRepository.deleteById(cartItemId);
    }

    public List<CartItem> getCartItems(Long cartId) {
        // Obtener todos los artículos en un carrito
        return cartItemRepository.findByCartId(cartId);
    }
}