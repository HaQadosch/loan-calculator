import React from 'react';
import './App.css';
import { LoanSetting } from './LoanSetting';
import { CalculatorRCF, CalculatorBL } from './Calculators';

interface ILoanDetails {
  amount_max: number
  amount_min: number
  duration_max: number
  duration_min: number
}

interface IMocky {
  business_loan: ILoanDetails
  revolving_credit_facility: ILoanDetails
}

let initSetUp: IMocky = {
  business_loan: {
    amount_max: 200000,
    amount_min: 10000,
    duration_max: 60,
    duration_min: 1,
  },
  revolving_credit_facility: {
    amount_max: 150000,
    amount_min: 1000,
    duration_max: 12,
    duration_min: 1,
  }
}

export const LoanSettingContext = React.createContext(initSetUp)

const App = () => {
  const [amount, setAmount] = React.useState(10000)
  const [duration, setDuration] = React.useState(4)
  const [loanSetting, setLoanSetting] = React.useState(initSetUp)

  React.useEffect(() => {
    fetch('http://www.mocky.io/v2/5d4aa9e93300006f000f5ea9')
      .then(res => res.json())
      .then((data: IMocky) => setLoanSetting(data))
  }, [])

  return (
    <>
      <header>
        <h1>
          Your loan repayment plans
        </h1>
      </header>
      <LoanSettingContext.Provider value={ loanSetting }>
        <LoanSetting amount={ amount } duration={ duration } setAmount={ setAmount } setDuration={ setDuration } />
        <CalculatorRCF amount={ amount } duration={ duration } />
        <CalculatorBL amount={ amount } duration={ duration } />
      </LoanSettingContext.Provider>
      <footer>Talk to a real person <span role="img" aria-label="phone">📞</span> 020 3778 0274</footer>
    </>
  )
}

export default App;
