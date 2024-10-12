import React, { useState } from 'react';
import axios from 'axios';
import "../../assets/styleSheets/ExpenseForm.css"

const ExpenseForm = ({ fetchExpenses, setIsAddExpenseOpen }) => {
    const [expenseDetails, setExpenseDetails] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [expenseType, setExpenseType] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');

    const createExpense = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem("userEmail");
        try {
            const expense = {
                expenseDetails,
                expenseAmount,
                expenseDate,
                expenseType,
                expenseCategory,
                email
            };
            await axios.post(`http://localhost:8080/api/expense`, expense, { params: { email } });
            fetchExpenses();
            setIsAddExpenseOpen(false);
        } catch (error) {
            console.error("Error creating expense:", error);
        }
    };

    return (
        <div className="expense-form-popup">
            <div className="expense-form">
                <button className="close-popup" onClick={() => setIsAddExpenseOpen(false)}>✖</button>
                <h3 className="form-title">Create Expense:</h3>
                <form onSubmit={createExpense} className="expense-form-container">
                    <div className="input-row">
                        <input
                            type="text"
                            value={expenseDetails}
                            placeholder="Expense details"
                            onChange={(e) => setExpenseDetails(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            value={expenseAmount}
                            placeholder="Amount"
                            onChange={(e) => setExpenseAmount(e.target.value)}
                            required
                        />
                        <input
                            type="date"
                            value={expenseDate}
                            onChange={(e) => setExpenseDate(e.target.value)}
                            required
                            className="date-input"
                        />
                        <select
                            value={expenseType}
                            onChange={(e) => setExpenseType(e.target.value)}
                            required
                            className="type-select"
                        >
                            <option value="" disabled>Select Expense Type</option>
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Health">Health</option>
                            <option value="Other">Other</option>
                        </select>
                        <select
                            value={expenseCategory}
                            onChange={(e) => setExpenseCategory(e.target.value)}
                            required
                            className="category-select"
                        >
                            <option value="" disabled>Select Expense Category</option>
                            <option value="Expense">Expense</option>
                            <option value="Credit">Credit</option>
                        </select>
                        <button type="submit" className="submit-button">Add Expense</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default ExpenseForm;
