package com.ecommerceback.controller;

import com.ecommerceback.model.User;
import com.ecommerceback.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        String email = authentication.getName(); // Obtiene el email del usuario autenticado
        User user = userService.findUserByEmail(email).orElse(null);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        System.out.println("Authenticated user: " + user.getEmail());
        return ResponseEntity.ok(user);
    }

    @PutMapping("/me")
    public ResponseEntity<User> updateUser(Authentication authentication, @RequestBody User userDetails) {
        String email = authentication.getName(); // Obtiene el email del usuario autenticado
        User currentUser = userService.findUserByEmail(email).orElse(null);

        if (currentUser == null) {
            return ResponseEntity.notFound().build();
        }

        currentUser.setFirstName(userDetails.getFirstName());
        currentUser.setLastName(userDetails.getLastName());
        currentUser.setShippingAddress(userDetails.getShippingAddress());
        userService.updateUser(currentUser);
        return ResponseEntity.ok(currentUser);
    }
}