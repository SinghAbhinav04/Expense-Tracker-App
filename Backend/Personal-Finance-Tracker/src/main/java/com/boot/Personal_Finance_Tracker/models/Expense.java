package com.boot.Personal_Finance_Tracker.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Document(collection = "expenses")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Expense {
    @Id
    private String id;
    private String expenseDetails;
    private double expenseAmount;
    @Field("date")
    private String expenseDate;
    private String email;
    private String expenseType;
    private String expenseCategory;
}
