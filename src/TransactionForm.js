import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function TransactionForm({ setTransactions }) {
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    description: '',
    category: '',
    amount: 0,
  });

  const handleChange = (event) => {
    setNewTransaction({ ...newTransaction, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await axios.post('http://localhost:8001/transactions', newTransaction);

      setTransactions(prevTransactions => [...prevTransactions, newTransaction]);

      setNewTransaction({ date: '', description: '', category: '', amount: 0 });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Transaction</h2>
      <label htmlFor="date">Date:</label>
      <input type="date" id="date" name="date" value={newTransaction.date} onChange={handleChange} />
      <label htmlFor="description">Description:</label>
      <input type="text" id="description" name="description" value={newTransaction.description} onChange={handleChange} />
      <label htmlFor="category">Category:</label>
      <select id="category" name="category" value={newTransaction.category} onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Savings">Savings</option>
       
      </select>
      <label htmlFor="amount">Amount:</label>
      <input type="number" id="amount" name="amount" value={newTransaction.amount} onChange={handleChange} />
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
