package com.ecommerceback.controller;

import com.ecommerceback.model.Cart;
import com.ecommerceback.model.CartItem;
import com.ecommerceback.model.User;
import com.ecommerceback.service.CartService;
import com.ecommerceback.service.UserDetailsImpl;
import com.ecommerceback.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<List<CartItem>> getCartItems(Authentication authentication) {
        // Obtener el usuario autenticado desde el objeto Authentication
        UserDetailsImpl currentUserDetails = (UserDetailsImpl) authentication.getPrincipal();
        User currentUser = userService.findUserByEmail(currentUserDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

        // Usar el servicio para obtener o crear el carrito del usuario
        Cart cart = cartService.getOrCreateCartForUser(currentUser);

        // Retornar los artículos del carrito
        return ResponseEntity.ok(cartService.getCartItems(cart.getId()));
    }

    @PostMapping("/items")
    public ResponseEntity<?> addItemToCart(Authentication authentication, @RequestBody CartItem cartItem) {
        // Validar que el CartItem contiene un Item y una cantidad válida
        if (cartItem.getItem() == null || cartItem.getItem().getId() == null || cartItem.getQuantity() == null) {
            return ResponseEntity.badRequest().body("Invalid item or quantity in cart item.");
        }

        // Obtener el usuario autenticado
        UserDetailsImpl currentUserDetails = (UserDetailsImpl) authentication.getPrincipal();
        User currentUser = userService.findUserByEmail(currentUserDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Añadir el artículo al carrito
        CartItem addedItem = cartService.addItemToCart(currentUser, cartItem.getItem().getId(), cartItem.getQuantity());
        return ResponseEntity.ok(addedItem);
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<?> removeItemFromCart(@PathVariable Long cartItemId) {
        cartService.removeItemFromCart(cartItemId);
        return ResponseEntity.ok().build();
    }
}