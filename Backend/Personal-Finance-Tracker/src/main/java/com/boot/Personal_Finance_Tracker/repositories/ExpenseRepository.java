package com.boot.Personal_Finance_Tracker.repositories;

import com.boot.Personal_Finance_Tracker.models.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends MongoRepository<Expense,String> {
    List<Expense> findAllByEmail(String email);
    Optional<Expense> findExpenseById(String id);

    List<Expense> findByEmailAndExpenseType(String email, String expenseType);
    List<Expense> findByEmailAndExpenseCategory(String email, String expenseCategory);


    @Query("{ 'email': ?0, 'date': { $gte: ?1, $lte: ?2 } }")
    List<Expense> findByEmailAndExpenseDate(String email , String startDate , String endDate);
}
