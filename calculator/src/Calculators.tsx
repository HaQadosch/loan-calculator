import React from 'react'
import { LoanSettingContext } from "./App";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface ICalculator {
  premium: number
  title: string
  duration: number
  amount: number
}

const Calculator: React.FC<ICalculator> = ({ premium, title, duration, amount }) => {
  const loanSetting = React.useContext(LoanSettingContext)
  const [rate, setRate] = React.useState(3)

  const calcSetting = premium === 0
    ? loanSetting.revolving_credit_facility
    : loanSetting.business_loan

  const isWithinAmountLimit = calcSetting.amount_min <= amount && amount <= calcSetting.amount_max
  const isWithinDurationLimit = calcSetting.duration_min <= duration && duration <= calcSetting.duration_max
  const isDisabled = !(isWithinDurationLimit && isWithinAmountLimit)


  let duration_ = duration
  duration_ = Math.min(duration_, calcSetting.duration_max)
  duration_ = Math.max(duration_, calcSetting.duration_min)

  let amount_ = amount
  amount_ = Math.min(amount_, calcSetting.amount_max)
  amount_ = Math.max(amount_, calcSetting.amount_min)

  return (
    <section className={ isDisabled ? 'disabled' : 'enabled' }>
      <form >
        <label htmlFor="rate">Interest rate</label>
        <input type="number"
          name="rate" id="rate"
          min="1" max="100"
          value={ rate } step="1"
          onChange={ handleRateChange }
          required
          { ...isDisabled ? ({ readOnly: true, disabled: true }) : {} }
        />
        <span>(in £)</span>
      </form>
      <DenseTable premium={ premium } duration={ duration_ } amount={ amount_ } rate={ rate } />
      <h2>{ title }</h2>
    </section>
  )

  function handleRateChange ({ target: { value: rate } }: React.ChangeEvent<HTMLInputElement>) {
    setRate(Number.parseInt(rate, 10))
  }
}

interface ICalculators {
  amount: number
  duration: number
}

export const CalculatorRCF: React.FC<ICalculators> = ({ amount, duration }) => {

  return (
    <article id="rcf-calculator">
      <Calculator
        premium={ 0 }
        title='Revolving Credit Facility'
        duration={ duration }
        amount={ amount }
      />
    </article>
  )
}

export const CalculatorBL: React.FC<ICalculators> = ({ amount, duration }) => {

  return (
    <article id="bl-calculator">
      <Calculator
        premium={ 10 }
        title='Business Loan'
        duration={ duration }
        amount={ amount }
      />
    </article>
  )
}


interface IDenseTable {
  premium: number
  duration: number
  amount: number
  rate: number
}


const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
})

function DenseTable ({ premium, amount, duration, rate }: IDenseTable): JSX.Element {
  const classes = useStyles()
  const payments = generatePlan({ amount, duration, premium, rate })

  return (
    <TableContainer component={ Paper } >
      <Table className={ classes.table } size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Repayment date</TableCell>
            <TableCell align="right">Principal</TableCell>
            <TableCell align="right">Interest</TableCell>
            <TableCell align="right">Total repayment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { payments.map(({ date, principal, interest, total }) => (
            <TableRow key={ date }>
              <TableCell component="th" scope="row">{ date }</TableCell>
              <TableCell align="right">{ principal }</TableCell>
              <TableCell align="right">{ interest }</TableCell>
              <TableCell align="right">{ total }</TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface IGenerate {
  amount: number
  duration: number
  premium: number
  rate: number
}

function generatePlan ({ amount, duration, premium, rate }: IGenerate) {
  const formatDate = (startingDate: Date, index: number) => {
    const newMonth = startingDate.getMonth() + index
    const newDate = new Date()
    newDate.setMonth(newMonth)

    const dateISO = newDate.toISOString()
    const options = { month: "2-digit", day: "2-digit", year: "numeric" }
    const newDateISO = new Date(dateISO)
    return new Intl.DateTimeFormat("en-GB", options).format(newDateISO)
  }

  const formatCurrency = (price: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }).format(price)

  const startingDate = new Date()

  let principalAcc = amount
  let interestAcc = 0
  let totalAcc = 0

  const payments = new Array(duration).fill(1).map((_, index) => {
    const date = formatDate(startingDate, index)

    const principal_ = amount / duration
    const principal = formatCurrency(principal_)

    const premium_ = index === 0 ? amount * (premium * 0.01) : 0
    const interest_ = principalAcc * (rate * 0.01) + premium_
    interestAcc += interest_

    principalAcc -= principal_

    const interest = formatCurrency(interest_)

    const total_ = interest_ + principal_
    totalAcc += total_
    const total = formatCurrency(total_)

    return { date, principal, interest, total }
  })
  const totalPlan = {
    date: 'Total',
    principal: formatCurrency(amount),
    interest: formatCurrency(interestAcc),
    total: formatCurrency(totalAcc)
  }
  payments.push(totalPlan)

  console.log({ payments })
  return payments
}