import React from 'react'
import './LoanSetting.css'

interface ILoanSetting {

}

export const LoanSetting: React.FC<ILoanSetting> = () => {
  const [amount, setAmount] = React.useState(1000)
  const [duration, setDuration] = React.useState(1)

  return (
    <article id="loan-setting">
      <form >
        <label htmlFor="amount">Amount requested</label>
        <input type="number"
          name="amount" id="amount"
          min="1000" max="200000"
          value={ amount } step="1000"
          onChange={ handleAmountChange }
          required
        />
        <span>(in £)</span>
        <label htmlFor="duration">Duration</label>
        <input type="number"
          name="duration" id="duration"
          min="1" max="60"
          value={ duration } step="1"
          onChange={ handleDurationChange }
          required
        />
        <span>(in months)</span>
      </form>
    </article>
  )

  function handleAmountChange ({ target: { value: amount } }: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number.parseInt(amount, 10))
  }

  function handleDurationChange ({ target: { value: duration } }: React.ChangeEvent<HTMLInputElement>) {
    setDuration(Number.parseInt(duration, 10))
  }
}