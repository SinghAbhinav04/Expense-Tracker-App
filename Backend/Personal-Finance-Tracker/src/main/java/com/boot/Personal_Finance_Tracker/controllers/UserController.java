package com.boot.Personal_Finance_Tracker.controllers;

import com.boot.Personal_Finance_Tracker.services.UserService;
import com.boot.Personal_Finance_Tracker.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
   private UserService userService;

    @GetMapping
    public List<User> getUserDetails(@RequestParam String email){
        return userService.returnDetails(email);

    }

    @PostMapping
    public void createUser(@RequestBody User user){
        userService.createUser(user);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        if (userService.validateLogin(email, password)) {
            String token = userService.generateToken(email);
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @PostMapping("/update-password")
    public void updatePassword(@RequestParam String email  , @RequestParam String password){
        userService.updatePassword(email,password);
    }

    @PostMapping("/update-name")
    public void updateName(@RequestParam String email  , @RequestParam String name){
        userService.updateName(email,name);
    }

}
