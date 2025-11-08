package com.codeyk.full.stack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codeyk.full.stack.model.User;
import com.codeyk.full.stack.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // allow frontend
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ Register User
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }
        userRepository.save(user);
        return ResponseEntity.ok("Registration successful!");
    }

    // ✅ Login User (form data)
    @PostMapping("/userLogin")
    public ResponseEntity<?> userLogin(@RequestParam String username, @RequestParam String password) {
        User user = userRepository.findByEmail(username); // frontend sends "username" as email

        if (user == null) {
            return ResponseEntity.status(401).body("User not found");
        }

        if (!user.getPassword().equals(password)) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        return ResponseEntity.ok("Login successful");
    }
}
