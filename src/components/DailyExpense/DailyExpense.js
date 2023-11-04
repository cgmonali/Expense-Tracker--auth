import React, { useRef, useState, useEffect } from 'react';
import classes from './DailyExpense.module.css';

const DailyExpense = () => {
  const moneyRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch expenses from the backend and update the expenses state
    fetchExpenses();
  }, []); // Empty dependency array ensures this runs only once on component load

  async function fetchExpenses() {
    setIsLoading(true);
    try {
      const response = await fetch('https://expense-tracker-item-default-rtdb.firebaseio.com/addexpenses.json'); // Replace with your backend API URL
      if (response.ok) {
        const data = await response.json();
        const expensesArray = Object.keys(data).map((expenseId) => ({
            id: expenseId,
            ...data[expenseId],
          }));
        console.log(expensesArray)
        setExpenses(expensesArray)
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
    setIsLoading(false);
  }

  async function dailyExpenseHandler(event) {
    event.preventDefault();
    const money = moneyRef.current.value;
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;

    const newExpense = {
      money,
      description,
      category,
    };

    // Send the new expense to the backend and update expenses on success
    const response = await saveExpenseToBackend(newExpense);

    if (response.ok) {
      // Fetch the updated expenses after adding a new one
      fetchExpenses();
    }

    // Clear the input fields
    moneyRef.current.value = '';
    descriptionRef.current.value = '';
    categoryRef.current.value = '';
  }

  async function saveExpenseToBackend(expense) {
    return await fetch('https://expense-tracker-item-default-rtdb.firebaseio.com/addexpenses.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    });
  }

  return (
    <>
      
      <section >
        <form action="" onSubmit={dailyExpenseHandler} className={classes.inputItems} >
          <div >
            <label htmlFor="money">Money</label>
            <input type="number" ref={moneyRef} id="money"className={classes.moneyInput} />
          </div>
          <div  >
            <label htmlFor="description">Description</label>
            <input type="text" ref={descriptionRef} id="description" className={classes.descriptionInput}/>
          </div>
          <div  >
            <label htmlFor="category">Category</label>
            <select name="category" id="category" ref={categoryRef} className={classes.selectInput}>
  <option value="">Select Category</option>
  <option value="Food">Food</option>
  <option value="Petrol">Petrol</option>
  <option value="Salary">Salary</option>
</select>
          </div>
          <button className={classes.submitInput}  type="submit">Submit</button>
        </form>
      </section>

      {isLoading ? (
        <h2 style={{textAlign:'center'}}>Loading expenses...</h2>
      ) : (
        <section className={classes.listingcontainer}>
          <h2>Expenses</h2>
          <ul>
            {expenses.map((expense, index) => (
              <li key={index} className={classes.listingItems}>
                <span> {expense.money}</span>
                <span>{expense.description}</span>
                <span> {expense.category}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default DailyExpense;
