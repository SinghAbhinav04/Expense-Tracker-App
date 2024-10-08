package com.boot.Personal_Finance_Tracker.controllers;

import com.boot.Personal_Finance_Tracker.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/expense/chart")
public class ChartController {
    @Autowired
    private ExpenseService expenseService;

    @GetMapping
    public Map<String, Double> getAllExpenseDetails(@RequestParam String email) {
        return expenseService.getAllExpenseDetails(email);
    }

    @GetMapping("/total-turnOver/expense")
    public Double getAllExpenseByExpense(@RequestParam String email) {
        return expenseService.getTotalExpensesByExpense(email);
    }

    @GetMapping("/total-turnOver/credit")
    public Double getAllExpenseByCredit(@RequestParam String email) {
        return expenseService.getTotalExpensesByCredit(email);
    }


}
