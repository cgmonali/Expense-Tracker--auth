import React, { useRef, useState } from 'react';
import classes from './DailyExpense.module.css';

const DailyExpense = () => {
  const moneyRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const [expenses, setExpenses] = useState([]); 

  function dailyExpenseHandler(event) {
    event.preventDefault();
    
    const money = moneyRef.current.value;
    const description = descriptionRef.current.value;
    const category = categoryRef.current.value;


    const newExpense = {
      money,
      description,
      category,
    };

   
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

  
    moneyRef.current.value = '';
    descriptionRef.current.value = '';
    categoryRef.current.value = ''; 
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
            <select name="category" id="category" ref={categoryRef} value=""className={classes.selectInput}>
  <option value="">Select Category</option>
  <option value="Food">Food</option>
  <option value="Petrol">Petrol</option>
  <option value="Salary">Salary</option>
</select>
          </div>
          <button className={classes.submitInput}  type="submit">Submit</button>
        </form>
      </section>

      {expenses.length > 0 && (
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
