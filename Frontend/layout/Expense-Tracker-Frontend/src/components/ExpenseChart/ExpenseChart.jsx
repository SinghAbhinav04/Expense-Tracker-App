import React, { useEffect, useState } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import '../../assets/styleSheets/ExpenseChart.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const ExpenseChart = () => {
    const [expenseChartData, setExpenseChartData] = useState({
        labels: [],
        datasets: [],
    });

    const [turnoverChartData, setTurnoverChartData] = useState({
        labels: ['Expenses', 'Credits'],
        datasets: [],
    });

    const [expenses, setExpenses] = useState([]);
    const [chartType, setChartType] = useState('bar');
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [creditAmount, setCreditAmount] = useState(0);

    const [startDate , setStartDate] = useState('');
    const [endDate , setEndDate] = useState('');

    const [chosenGraphFilter, setChosenGraphFilter] = useState('1month');


    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        // Fetching expense chart data
        axios.get(`http://localhost:8080/api/expense/chart/get-by-month`, { params: { email:email, dateFrom:startDate,dateTo:endDate } })
            .then(response => {
                const expenseData = response.data;
                const labels = Object.keys(expenseData);
                const amounts = Object.values(expenseData);



                setExpenseChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Expenses',
                            data: amounts,
                            backgroundColor: 'rgba(255, 140, 0, 0.6)',
                            borderColor: 'rgba(255, 140, 0, 1)',
                            borderWidth: 2,
                        }
                    ]
                });
            })
            .catch(error => {
                console.error("Error fetching expense data", error);
            });

        const fetchTurnoverData = async () => {
            try {
                const [expenseResponse, creditResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/expense/chart/total-turnOver/expense', { params: { email } }),
                    axios.get(`http://localhost:8080/api/expense/chart/total-turnOver/credit`, { params: { email } })
                ]);

                const fetchedExpenseAmount = expenseResponse.data;
                const fetchedCreditAmount = creditResponse.data;

                setExpenseAmount(fetchedExpenseAmount);
                setCreditAmount(fetchedCreditAmount);

                setTurnoverChartData({
                    labels: ['Expenses', 'Credits'],
                    datasets: [
                        {
                            label: 'Turnover',
                            data: [fetchedExpenseAmount, fetchedCreditAmount],
                            backgroundColor: [
                                '#FF2400',
                                '#42E0D1'
                            ],
                            borderColor: [
                                '#C04000',
                                '#0E4D92'
                            ],
                            borderWidth: 2,
                        }
                    ]
                });
            } catch (error) {
                console.error("Error fetching turnover data", error);
            }
        };

        fetchTurnoverData();
    }, [startDate,endDate],[]);

    const setChosenDate=()=>{
        const today = new Date();
        let year = today.getFullYear();
        let day = today.getDate().toString().padStart(2, '0');
        let startMonth = (today.getMonth()).toString().padStart(2, '0');
        let endMonth = (today.getMonth()+1).toString().padStart(2, '0');
        let startFormattedDate = `${year}-${startMonth}-${day}`;
        let endFormattedDate = `${year}-${endMonth}-${day}`;


        switch (chosenGraphFilter){
            case'1month':
                setStartDate(startFormattedDate);
                setEndDate(endFormattedDate);
                break;

            case '3months':
                startMonth = (today.getMonth()-2).toString().padStart(2, '0');
                startFormattedDate = `${year}-${startMonth}-${day}`;

                endMonth = (today.getMonth()+1).toString().padStart(2, '0');
                endFormattedDate = `${year}-${endMonth}-${day}`;

                setStartDate(startFormattedDate);
                setEndDate(endFormattedDate);
                break;

            case '6months':
                startMonth = (today.getMonth()-5).toString().padStart(2, '0');
                startFormattedDate = `${year}-${startMonth}-${day}`;

                endMonth = (today.getMonth()+1).toString().padStart(2, '0');
                endFormattedDate = `${year}-${endMonth}-${day}`;

                setStartDate(startFormattedDate);
                setEndDate(endFormattedDate);
                break;

            case '12months':
                year=today.getFullYear()-1;
                startFormattedDate=`${year}-${startMonth}-${day}`;
                endFormattedDate=`${year+1}-${endMonth}-${day}`;

                setStartDate(startFormattedDate);
                setEndDate(endFormattedDate);
                break;
        }
    }

    useEffect(()=>{
        setChosenDate();

    },[chosenGraphFilter])


    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };

    const renderExpenseChart = () => {
        const chartOptions = {
            responsive: true,
            plugins: {
                legend: { position: 'top', labels: { color: 'white' } },
                title: { display: true, text: 'Expense Breakdown', color: 'white' }
            },
            scales: {
                x: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' }
                },
                y: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' }
                }
            }
        };

        switch (chartType) {
            case 'bar':
                return <Bar data={expenseChartData} options={chartOptions} />;
            case 'line':
                return <Line data={expenseChartData} options={chartOptions} />;
            default:
                return null;
        }
    };

    const renderTurnoverChart = () => {
        return (
            <Doughnut
                data={turnoverChartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'top', labels: { color: 'white' } },
                        title: {
                            display: true,
                            text: 'Turnover (Expense vs Credit)',
                            color: 'white'
                        }
                    }
                }}
            />
        );
    };

    const fetchExpenses = async () => {
        const email = localStorage.getItem("userEmail");
        try {
            const response = await axios.get('http://localhost:8080/api/expense/recent-transactions', { params: { email } });
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div className="container-chart">
            <div className="left-pane">
                <div className="container">
                    <h2>Dashboard</h2>
                    <div className="chart-container">
                        <div className="expense">
                            <label htmlFor="chartType">Select Chart Type: </label>
                            <select id="chartType" value={chartType} onChange={handleChartTypeChange}>
                                <option value="bar">Bar Chart</option>
                                <option value="line">Line Chart</option>
                            </select>
                            <label htmlFor="dateRangeOption" className="label-dateRangeOption">Select Date Range: </label>
                            <select id="dateRangeOption" className="option-dateRangeOption" value={chosenGraphFilter} onChange={(e)=>{
                                setChosenGraphFilter(e.target.value);
                            }}>
                                <option value="1month">Past 1 Month</option>
                                <option value="3months">Past 3 Months</option>
                                <option value="6months">Past 6 Months</option>
                                <option value="12months">Past 12 Months</option>
                            </select>
                            {renderExpenseChart()}
                        </div>
                    </div>
                </div>
                <div className="expenses-info">
                    <p className="expenses-info-expense">
                        <strong>Expense:</strong> ₹{expenseAmount}
                        <i className="fas fa-arrow-down" style={{color: 'red'}}></i>
                    </p>
                    <p className="expenses-info-credit">
                        <strong>Credit:</strong> ₹{creditAmount}
                        <i className="fas fa-arrow-up" style={{color: 'green' }}></i>
                    </p>
                    <p className="expenses-info-total">
                        <strong>Total:</strong> ₹{creditAmount - expenseAmount}
                    </p>
                </div>
            </div>

            <div className="right-pane">
                <h2>Recent Transactions</h2>
                <div className="expense-list-header">
                    <strong>Title</strong>
                    <strong>Amount</strong>
                    <strong>Category</strong>
                </div>
                <ul className="expense-list-items">
                    {expenses.map((expense) => (
                        <li key={expense.id} className="expense-item">
                            <span>{expense.expenseDetails}</span>
                            <span>₹{expense.expenseAmount}</span>
                            <span>{expense.expenseCategory}</span>
                        </li>
                    ))}
                </ul>

                <div className="turnover">
                    <h3>Turnover:</h3>
                    <p>
                        <strong>Expense:</strong> ₹{expenseAmount}
                        <i className="fas fa-arrow-down" style={{ color: 'red' }}></i>
                    </p>
                    <p>
                        <strong>Credit:</strong> ₹{creditAmount}
                        <i className="fas fa-arrow-up" style={{ color: 'green' }}></i>
                    </p>
                    {renderTurnoverChart()}
                </div>
            </div>
        </div>
    );
};

export default ExpenseChart;
