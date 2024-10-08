import React, { useState } from 'react';
import axios from 'axios';
import "../../assets/styleSheets/ExpenseList.css"

const ExpenseList = ({ expenses, setExpenses, fetchExpenses, setIsAddExpenseOpen }) => {
    const [editingExpenseId, setEditingExpenseId] = useState(null);
    const [updatedExpenseDetails, setUpdatedExpenseDetails] = useState('');
    const [updatedExpenseAmount, setUpdatedExpenseAmount] = useState('');
    const [updatedExpenseDate, setUpdatedExpenseDate] = useState('');
    const [updatedExpenseType, setUpdatedExpenseType] = useState('');
    const [updatedExpenseCategory, setUpdatedExpenseCategory] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    const deleteExpense = async (expenseId, expenseAmount) => {
        const email = localStorage.getItem("userEmail");
        try {
            await axios.delete(`http://localhost:8080/api/expense/delete`, {
                params: { id: expenseId, amount: expenseAmount, email }
            });
            fetchExpenses();
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    const updateExpense = async (expenseId) => {
        const email = localStorage.getItem("userEmail");
        try {
            const updatedExpense = {
                expenseDetails: updatedExpenseDetails,
                expenseAmount: updatedExpenseAmount,
                expenseDate: updatedExpenseDate,
                expenseType: updatedExpenseType,
                expenseCategory: updatedExpenseCategory,
                email
            };
            await axios.post(`http://localhost:8080/api/expense/update-expense`, updatedExpense, {
                params: { id: expenseId }
            });
            console.log('Expense updated successfully');
            fetchExpenses();
            setEditingExpenseId(null);
        } catch (error) {
            console.error("Error updating expense:", error);
        }
    };

    const filterExpensesByType = async () => {
        const email = localStorage.getItem("userEmail");
        try {
            const response = await axios.get(`http://localhost:8080/api/expense/filter-type`, {
                params: { email, type: filterType }
            });
            setExpenses(response.data);
        } catch (error) {
            console.error("Error filtering expenses by type:", error);
        }
    };

    const filterExpensesByCategory = async () => {
        const email = localStorage.getItem("userEmail");
        try {
            const response = await axios.get(`http://localhost:8080/api/expense/filter-category`, {
                params: { email, category: filterCategory }
            });
            setExpenses(response.data);
        } catch (error) {
            console.error("Error filtering expenses by category:", error);
        }
    };

    const removeFilters = () => {
        setFilterType('');
        setFilterCategory('');
        fetchExpenses(); // Fetch all expenses again to reset the view
    };

    const expenseTypes = [ 'Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Other'];
    const expenseCategories = [ 'Expense', 'Credit'];

    return (
        <div className="expense-list">
            <div className="filter-section">
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="" disabled>Select Type</option>
                    {expenseTypes.map((type) => (
                        <option key={type} value={type === 'All' ? '' : type}>{type}</option>
                    ))}
                </select>
                <button onClick={filterExpensesByType} className="filter-by-type-button">By Type</button>

                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                    <option value="" disabled>Select Category</option>
                    {expenseCategories.map((category) => (
                        <option key={category} value={category === 'All' ? '' : category}>{category}</option>
                    ))}
                </select>
                <button onClick={filterExpensesByCategory} className="filter-by-category-button">By Category</button>

                <button className="remove-filters-button" onClick={removeFilters}>Remove Filters</button>
                <button className="add-expense-button" onClick={() => setIsAddExpenseOpen(true)}>Add New</button>
            </div>

            <div className="expense-list-header">
                <strong>Title</strong>
                <strong>Amount</strong>
                <strong>Date</strong>
                <strong>Type</strong>
                <strong>Category</strong>
                <strong>Action</strong>
            </div>

            <ul className="expense-list-items">
                {expenses.map((expense) => {
                    const formattedDate = new Date(expense.expenseDate).toLocaleDateString('en-GB');

                    return (
                        <li key={expense.id} className="expense-item">
                            <span>{expense.expenseDetails}</span>
                            <span>₹{expense.expenseAmount}</span>
                            <span>{formattedDate}</span>
                            <span>{expense.expenseType}</span>
                            <span>{expense.expenseCategory}</span>

                            <span className="expense-list-button-container">
                                <button className="delete-button" onClick={() => deleteExpense(expense.id, expense.expenseAmount)}>🗑</button>
                                <button className="edit-button" onClick={() => {
                                    setEditingExpenseId(expense.id);
                                    setUpdatedExpenseDetails(expense.expenseDetails);
                                    setUpdatedExpenseAmount(expense.expenseAmount);
                                    setUpdatedExpenseDate(expense.expenseDate);
                                    setUpdatedExpenseType(expense.expenseType);
                                    setUpdatedExpenseCategory(expense.expenseCategory);
                                }}>📝</button>
                            </span>
                        </li>
                    );
                })}
            </ul>

            {editingExpenseId && (
                <div className="edit-form-popup">
                    <div className="edit-form">
                        <h3>Edit Expense:</h3>
                        <input
                            type="text"
                            value={updatedExpenseDetails}
                            onChange={(e) => setUpdatedExpenseDetails(e.target.value)}
                            placeholder="Update Details"
                            required
                        />
                        <input
                            type="number"
                            value={updatedExpenseAmount}
                            onChange={(e) => setUpdatedExpenseAmount(e.target.value)}
                            placeholder="Update Amount"
                            required
                        />
                        <input
                            type="date"
                            value={updatedExpenseDate}
                            onChange={(e) => setUpdatedExpenseDate(e.target.value)}
                            required
                        />
                        <select
                            value={updatedExpenseType}
                            onChange={(e) => setUpdatedExpenseType(e.target.value)}
                            required
                        >
                            <option value="">Select Type</option>
                            {expenseTypes.slice(1).map((type) => ( // Skip "All" option
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <select
                            value={updatedExpenseCategory}
                            onChange={(e) => setUpdatedExpenseCategory(e.target.value)}
                            required
                        >
                            <option value="">Select Category</option>
                            {expenseCategories.slice(1).map((category) => ( // Skip "All" option
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <button className="save-button" onClick={() => updateExpense(editingExpenseId)}>Save</button>
                        <button className="cancel-button" onClick={() => setEditingExpenseId(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpenseList;
