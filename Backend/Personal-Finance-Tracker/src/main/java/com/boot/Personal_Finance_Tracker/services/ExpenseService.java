package com.boot.Personal_Finance_Tracker.services;

import com.boot.Personal_Finance_Tracker.models.Expense;
import com.boot.Personal_Finance_Tracker.repositories.UserRepository;
import com.boot.Personal_Finance_Tracker.repositories.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.*;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UserRepository userRepository;

    public void createExpense(Expense expense , String email) {
        expenseRepository.save(expense);
    }

    public void deleteExpense(String id , double amount , String email) {
        expenseRepository.deleteById(id);
    }

    public void updateExpense(String id , Expense expense){
        Optional<Expense> expenses = expenseRepository.findExpenseById(id);

        if(expenses.isPresent()){
            Expense existingExpense= expenses.get();

            existingExpense.setExpenseDetails(expense.getExpenseDetails());
            existingExpense.setExpenseAmount(expense.getExpenseAmount());
            existingExpense.setExpenseDate(expense.getExpenseDate());
            existingExpense.setExpenseCategory(expense.getExpenseCategory());
            existingExpense.setExpenseType(expense.getExpenseType());

            expenseRepository.save(existingExpense);
        }else{
            throw new RuntimeException("Expense with ID: " + id + "Not found!");
        }
    }
    public List<Expense> getAllExpenses(String email) {
        return expenseRepository.findAllByEmail(email) ;
    }


    //filters

    public List<Expense> findByType(String email, String type){
        List<Expense> expenseList = expenseRepository.findAllByEmail(email);
        if(!expenseList.isEmpty()) {
            return expenseRepository.findByEmailAndExpenseType(email, type);
        }
        return new ArrayList<>();
    }
    public List<Expense> findByCategory(String email, String category){
        List<Expense> expenseList = expenseRepository.findAllByEmail(email);

        if(!expenseList.isEmpty()) {
            return expenseRepository.findByEmailAndExpenseCategory(email, category);
        }
        return new ArrayList<>();
    }

    public Map<String , Double> getAllExpenseDetails(String email){
        List<Expense> expense= expenseRepository.findAllByEmail(email);
        Map<String , Double> expenseLabelAndAmount = new HashMap<>();
        if(!expense.isEmpty()){
            for (Expense e: expense) {
                String label = e.getExpenseDetails();
                Double amount = e.getExpenseAmount();
                expenseLabelAndAmount.put(label,amount);
            }
        }
        return expenseLabelAndAmount;
    }
    public Double getTotalExpensesByExpense(String email) {
        List<Expense> expenseList = expenseRepository.findByEmailAndExpenseCategory(email, "Expense");
        double totalExpense = 0.0;
        if (!expenseList.isEmpty()) {
            for (Expense e : expenseList) {
                totalExpense += e.getExpenseAmount();
            }
        }
        return totalExpense;
    }

    public Double getTotalExpensesByCredit(String email) {
        List<Expense> expenseList = expenseRepository.findByEmailAndExpenseCategory(email, "Credit");
        double totalCredit = 0.0;
        if (!expenseList.isEmpty()) {
            for (Expense e : expenseList) {
                totalCredit += e.getExpenseAmount();
            }
        }
        return totalCredit;
    }



    public List<Expense> getRecentExpenses(String email){
        List<Expense> expenses = expenseRepository.findAllByEmail(email);

        if(!expenses.isEmpty()){
            int size = Math.min(5,expenses.size());
            List<Expense> recentExpenses= new ArrayList<>();
            for(int i =size-1 ; i>= 0;i--){
                recentExpenses.add(expenses.get(i));
            }
            return recentExpenses;
        }
        return new ArrayList<>();
    }
}

