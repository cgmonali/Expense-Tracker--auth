import React, { useEffect } from 'react';
import MainNavigation from "./MainNavigation";
import { useDispatch, useSelector } from 'react-redux';
import classes from './Layout.module.css';
import { setTotalAmount, premiumClicked, notPremiumClicked } from '../../store/totalAmountSlice'; 

const Layout = (props) => {
  const totalAmountState = useSelector((state) => state.totalAmount);
  const { totalAmount, isPremium,isDarkTheme } = totalAmountState;

  console.log(totalAmount);
  console.log(isPremium);

  return (
    <>
      <MainNavigation />
      <main className={isDarkTheme ? classes.premiumBackground : ''}>
        {props.children}
      </main>
    </>
  );
};

export default Layout;
