import React from 'react';
import './App.css';
import { LoanSetting } from './LoanSetting';
import { CalculatorRCF, CalculatorBL } from './Calculators';

const App = () => {
  const [amount, setAmount] = React.useState(10000)
  const [duration, setDuration] = React.useState(4)

  return (
    <>
      <header>
        <h1>
          Your loan repayment plans
        </h1>
      </header>
      <LoanSetting amount={ amount } duration={ duration } setAmount={ setAmount } setDuration={ setDuration } />
      <CalculatorRCF amount={ amount } duration={ duration } />
      <CalculatorBL amount={ amount } duration={ duration } />
      <footer>Footer, get to talk to a real person <span role="img" aria-label="phone">📞</span> 020 3778 0274</footer>
    </>
  )
}

export default App;
