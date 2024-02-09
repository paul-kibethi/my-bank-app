import React, { useState } from 'react';

function TransactionList({ transactions, deleteTransaction }) {
  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const [sortBy, setSortBy] = useState(''); // State to track sorting option

  const handleSort = (option) => {
    setSortBy(option);
  };

  // Function to sort transactions based on the selected sorting option
  const sortTransactions = (transactions) => {
    if (sortBy === 'category') {
      return transactions.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === 'description') {
      return transactions.sort((a, b) => a.description.localeCompare(b.description));
    } else {
      return transactions; // Default order if no sorting option is selected
    }
  };

  return (
    <div>
      <div>
        <label>Sort By:</label>
        <select value={sortBy} onChange={(e) => handleSort(e.target.value)}>
          <option value="">Select Option</option>
          <option value="category">Category</option>
          <option value="description">Description</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortTransactions(transactions).map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td>
                <button onClick={() => deleteTransaction(transaction.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
