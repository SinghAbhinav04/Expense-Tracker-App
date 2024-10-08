import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm.jsx';
import ExpenseList from './ExpenseList.jsx';
import "../../assets/styleSheets/Expenses.css"

const Expenses = ( ) => {
    const [expenses, setExpenses] = useState([]);
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

    const fetchExpenses = async () => {
        const email = localStorage.getItem("userEmail");
        try {
            const response = await axios.get('http://localhost:8080/api/expense', { params: { email } });
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div className="expense-management">
            {isAddExpenseOpen && <ExpenseForm fetchExpenses={fetchExpenses}  setIsAddExpenseOpen={setIsAddExpenseOpen} />}
            <ExpenseList
                expenses={expenses}
                setExpenses={setExpenses}
                fetchExpenses={fetchExpenses}
                setIsAddExpenseOpen={setIsAddExpenseOpen}
            />
        </div>
    );
};

export default Expenses;
