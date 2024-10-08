package com.boot.Personal_Finance_Tracker.repositories;

import com.boot.Personal_Finance_Tracker.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    Optional<User> findByEmail(String email);
    List<User> findSalaryByEmail(String email);
}
