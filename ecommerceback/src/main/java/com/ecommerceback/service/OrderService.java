package com.ecommerceback.service;

import com.ecommerceback.model.Order;
import com.ecommerceback.model.OrderItem;
import com.ecommerceback.model.User;
import com.ecommerceback.model.OrderStatus;
import com.ecommerceback.repository.OrderRepository;
import com.ecommerceback.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    public Order createOrder(Order order) {
        // Validar que el pedido tenga un usuario asociado
        if (order.getUser() == null) {
            throw new IllegalArgumentException("Order must have an associated user.");
        }

        // Si no se proporciona un estado, se establece como CONFIRMADA por defecto
        if (order.getOrderStatus() == null) {
            order.setOrderStatus(OrderStatus.CONFIRMADA);
        }
        // Log para prueba
        System.out.println("Creating order for user ID: " + order.getUser().getId());

        // Asocia cada OrderItem con la orden antes de guardar
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                // Validar que el item esté completo
                if (item.getItem() == null) {
                    throw new IllegalArgumentException("OrderItem must have an associated item.");
                }
                // Asocia la orden al item
                item.setOrder(order);

                // Asignar el precio unitario si no está presente
                if (item.getUnitPrice() == null) {
                    item.setUnitPrice(item.getItem().getPrice());
                }

                // Validar que la cantidad sea mayor que cero
                if (item.getQuantity() == null || item.getQuantity() <= 0) {
                    throw new IllegalArgumentException("OrderItem must have a valid quantity.");
                }
            }
        }
        // Guardar la orden en la base de datos
        return orderRepository.save(order);
    }

    public Optional<Order> getOrderById(Long id) {
        // Log para prueba
        System.out.println("Fetching order with ID: " + id);

        // Obtener la orden por su ID
        return orderRepository.findById(id);
    }

    public List<Order> getOrdersByUserId(Long userId) {
        // Log para prueba
        System.out.println("Fetching orders for user ID: " + userId);

        // Obtener todas las órdenes asociadas a un usuario
        return orderRepository.findByUserId(userId);
    }

    public OrderItem addItemToOrder(Long orderId, OrderItem orderItem) {
        Optional<Order> orderOpt = orderRepository.findById(orderId);

        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            orderItem.setOrder(order);
            // Log para prueba
            System.out.println("Adding item to order ID: " + orderId);
            return orderItemRepository.save(orderItem);
        } else {
            // Log para prueba
            System.out.println("Order not found with ID: " + orderId);
            return null;
        }
    }

    public void updateOrderStatus(Long orderId, OrderStatus status) {
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setOrderStatus(status);
            // Log para prueba
            System.out.println("Updating status of order ID: " + orderId + " to " + status);
            orderRepository.save(order);
        } else {
            // Log para prueba
            System.out.println("Order not found with ID: " + orderId);
        }
    }
}