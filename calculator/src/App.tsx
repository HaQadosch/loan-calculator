import React from 'react';
import './App.css';
import { LoanSetting } from './LoanSetting';

const App = () => {
  return (
    <>
      <header>
        <h1>
          Your loan repayment plans
        </h1>
      </header>
      <LoanSetting />
      <article id="rcf-calculator">RCF repayment calculator</article>
      <article id="bl-calculator">BL repayment calculator</article>
      <footer>Footer, get to talk to a real person</footer>
    </>
  );
}

export default App;
