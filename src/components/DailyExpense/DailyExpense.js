import React, { useRef, useState, useEffect } from 'react';
import classes from './DailyExpense.module.css';
import { createSlice } from '@reduxjs/toolkit';
import {  setTotalAmount, premiumClicked, notPremiumClicked,notDarkClicked,darkClicked   } from '../../store/totalAmountSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const DailyExpense = () => {
  const moneyRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
const [expensesArray, setExpensesArray] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing,setIsediting]=useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
// const [totalAmount,setTotalAmounts]=useState(0);
const user = useSelector((state) => state.totalAmount);
const { totalAmount, isPremium,isDarkTheme } = user;
console.log(user)

const dispatchAmt = useDispatch();
  useEffect(() => {
    // Fetch expenses from the backend and update the expenses state
    fetchExpenses();
    console.log("LOADED")
  }, []); // Empty dependency array ensures this runs only once on component load

  async function fetchExpenses() {
    setIsLoading(true);
    try {
      const response = await fetch('https://expense-tracker-latest-de30f-default-rtdb.firebaseio.com/addexpense.json'); // Replace with your backend API URL
      if (response.ok) {
        // console.log(response.ok)
        const data = await response.json();
        const expensesArray = Object.keys(data).map((expenseId) => ({
            id: expenseId,
            ...data[expenseId],
          }));
        const totalAmount = expensesArray.reduce((sum, expense) => sum + parseInt(expense.money, 10), 0);
        console.log(expensesArray)
       console.log(totalAmount,'hhhhhhhh')
        dispatchAmt(setTotalAmount(totalAmount)); 
        if(totalAmount<1000){
          dispatchAmt(notPremiumClicked());
        }

        
        //use setTotalAmount to update the totalAmount state

       


        setExpenses(expensesArray)
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
    setIsLoading(false);
  }


  const handleTogglePremium = (event) => {
    event.preventDefault(); 
    if (isPremium) {
      dispatchAmt(notPremiumClicked());
      dispatchAmt(notDarkClicked())
    }
    else{
    dispatchAmt(premiumClicked());}
  };

const handleToggleTheme =(event)=>{
  event.preventDefault(); 
  if(!isDarkTheme){
    dispatchAmt(darkClicked())
  }
  else{
    dispatchAmt(notDarkClicked())
  }
}

  
  const convertArrayToCSV = (array) => {
    const header = Object.keys(array[0]).join(',') + '\n';
    const rows = array.map(expense => Object.values(expense).join(',')).join('\n');
    return header + rows;
  };
  
  const handleToggle2 = () => {
    const csvContent = convertArrayToCSV(expenses);
    const encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };












  async function dailyExpenseHandler(event) {
    event.preventDefault();
   


    if (editingExpense) {
        const updatedExpense = {
          money: moneyRef.current.value,
          description: descriptionRef.current.value,
          category: categoryRef.current.value,
        };
  
        const response = await fetch(
          `https://expense-tracker-latest-de30f-default-rtdb.firebaseio.com/addexpense/${editingExpense.id}.json`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedExpense),
          }
        );
  
        if (response.ok) {
          fetchExpenses();
          setEditingExpense(null);
          moneyRef.current.value = '';
          descriptionRef.current.value = '';
          categoryRef.current.value = '';
        }
    }






else{
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
  }

  async function saveExpenseToBackend(expense) {
    return await fetch('https://expense-tracker-latest-de30f-default-rtdb.firebaseio.com/addexpense.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    });
  }


  async function deleteExpense(expenseId) {
    const response = await fetch(
      `https://expense-tracker-latest-de30f-default-rtdb.firebaseio.com/addexpense/${expenseId}.json`,
      {
        method: 'DELETE',
      }
    );

    if (response.ok) {
      console.log('Expense successfully deleted');
      fetchExpenses();
    }
  }

  async function editExpense(expense) {
    setIsediting(true);
    setEditingExpense(expense);
    moneyRef.current.value = expense.money;
    descriptionRef.current.value = expense.description;
    categoryRef.current.value = expense.category;

    
    
    

  }













  return (
    <>
      <div className={isDarkTheme ? classes.dailyExpenseContainerPremium: classes.dailyExpenseContainer
}>

      <section >
        <form action="" onSubmit={dailyExpenseHandler} className={!isDarkTheme ? classes.inputItems :classes.inputItemsPremium} >
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
          <button className={classes.submitInput}  type="submit">{ editingExpense? "save changes":  "Submit"}</button>
          {totalAmount > 1000 && (
     <button className={!isPremium ?classes.premiumActiveBtn :classes.premiumDeactiveBtn } onClick={handleTogglePremium}>{ !isPremium ?"Activate premium": "Deactivate premium"}</button>
    )}
    {
       isPremium && ( <button className={isDarkTheme? classes.darkThemeBtn :classes.lightThemeBtn } onClick={handleToggleTheme}>{ isDarkTheme? "Activate Light theme":  "Activate Dark theme"}</button>)
    }
        </form>
      </section>

      {isLoading ? (
        <h2 style={{textAlign:'center'}}>Loading expenses...</h2>
      ) : (
        <section className={classes.listingcontainer}>
          <h2>Expenses</h2>
        
          <ul>
            {expenses.map((expense, index) => (
              <li key={index} className={!isDarkTheme ? classes.listingItems :classes.listingItemsPremium}>
                <span> {expense.money}</span>
                <span>{expense.description}</span>
                <span> {expense.category}</span>
                <div>
                <button onClick={() => deleteExpense(expense.id)}  className={classes.deleteBtn} >Delete</button>
  <button onClick={() => editExpense(expense)} className={classes.editBtn} >Edit</button></div>
              </li>
            ))}
          </ul>
        </section>
      )}  
      {isPremium && (
      <section>
      <button className={classes.downloadBtn} onClick={handleToggle2}>Download Expenses as CSV</button></section>)}
      </div>
    </>
  );
};

export default DailyExpense;
