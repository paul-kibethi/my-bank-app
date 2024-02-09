import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionList from './TransactionTable';
import TransactionForm from './TransactionForm';
import SearchBar from './SearchBar';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8001/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/transactions/${id}`);
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="App">
      <h1>My Bank Transactions</h1>
      <SearchBar transactions={transactions} setTransactions={setTransactions} />
      <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
      <TransactionForm setTransactions={setTransactions} />
    </div>
  );
}

export default App;
