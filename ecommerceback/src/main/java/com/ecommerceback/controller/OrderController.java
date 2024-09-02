package com.ecommerceback.controller;

import com.ecommerceback.model.Order;
import com.ecommerceback.model.OrderItem;
import com.ecommerceback.model.User;
import com.ecommerceback.service.OrderService;
import com.ecommerceback.service.UserDetailsImpl;
import com.ecommerceback.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<Order> createOrder(Authentication authentication, @RequestBody Order order) {
        // Obtener el usuario autenticado
        UserDetailsImpl currentUserDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.findUserByEmail(currentUserDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Asociar el usuario a la orden
        order.setUser(user);

        // Asociar cada item a la orden
        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
        }
        Order createdOrder = orderService.createOrder(order);
        return ResponseEntity.ok(createdOrder);
    }

    @GetMapping("/")
    public ResponseEntity<List<Order>> getUserOrders(Authentication authentication) {
        // Obtener el usuario autenticado
        UserDetailsImpl currentUserDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.findUserByEmail(currentUserDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Order> orders = orderService.getOrdersByUserId(user.getId());
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}