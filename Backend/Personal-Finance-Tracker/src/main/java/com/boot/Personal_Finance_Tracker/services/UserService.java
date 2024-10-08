package com.boot.Personal_Finance_Tracker.services;

import com.boot.Personal_Finance_Tracker.repositories.UserRepository;
import com.boot.Personal_Finance_Tracker.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.swing.*;
import java.util.Date;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void createUser(User user){

        String hashedPassword =passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        userRepository.save(user);
    }

    public List<User> returnDetails(String email){


            return userRepository.findSalaryByEmail(email);
        }




    public boolean validateLogin(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            return passwordEncoder.matches(password, user.getPassword());
        }
        return false;
    }

    public String generateToken(String email) {
        long expirationTime = 3600000; // in miliseconds
        Date expirationDate = new Date(System.currentTimeMillis() + expirationTime);
        return Jwts.builder()
                .setSubject(email)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, "your_secret_key")
                .compact();
    }

    public void updatePassword(String email ,String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPassword(password);

            userRepository.save(user);
        }

    }

    public void updateName (String email, String name) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(name);

            userRepository.save(user);
        }
    }
}

