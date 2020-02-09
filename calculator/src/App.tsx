import React from 'react';
import './App.css';
import { LoanSetting } from './LoanSetting';
import { CalculatorRCF, CalculatorBL } from './Calculators';

const App = () => {
  return (
    <>
      <header>
        <h1>
          Your loan repayment plans
        </h1>
      </header>
      <LoanSetting />
      <CalculatorRCF />
      <CalculatorBL />
      <footer>Footer, get to talk to a real person <span role="img" aria-label="phone">📞</span> 020 3778 0274</footer>
    </>
  );
}

export default App;
