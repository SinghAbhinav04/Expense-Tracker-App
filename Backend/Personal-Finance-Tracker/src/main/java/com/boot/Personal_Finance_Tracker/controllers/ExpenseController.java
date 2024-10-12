package com.boot.Personal_Finance_Tracker.controllers;

import com.boot.Personal_Finance_Tracker.models.Expense;
import com.boot.Personal_Finance_Tracker.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expense")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    @PostMapping
    public void createExpense(@RequestBody Expense expense, @RequestParam String email){
        expenseService.createExpense(expense, email );
    }

    @DeleteMapping("/delete")
    public void deleteExpense(@RequestParam String id, @RequestParam double amount, @RequestParam String email){

        expenseService.deleteExpense(id, amount, email);
    }

    @GetMapping
    public List<Expense> getAllExpense(@RequestParam String email){
        return expenseService.getAllExpenses(email);
    }

    @PostMapping("/update-expense")
    public void updateExpense(@RequestParam String id , @RequestBody Expense expense){
        expenseService.updateExpense(id,expense);
    }

    @GetMapping("/filter-type")
    public List<Expense> getExpensesByType(@RequestParam String email , @RequestParam String type){
        return expenseService.findByType(email,type);
    }

    @GetMapping("/filter-category")
    public List<Expense> getExpensesByCategory(@RequestParam String email , @RequestParam String category){
        return expenseService.findByCategory(email,category);
    }

    @GetMapping("/recent-transactions")
    public List<Expense> getRecentExpenses(@RequestParam String email){
        return expenseService.getRecentExpenses(email);
    }

}
