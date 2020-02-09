import React from 'react'

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
}

const Calculator: React.FC<ICalculator> = ({ premium, title, duration }) => {
  const [rate, setRate] = React.useState(3)

  return (
    <>
      <form >
        <label htmlFor="rate">Interest rate</label>
        <input type="number"
          name="rate" id="rate"
          min="1" max="100"
          value={ rate } step="1"
          onChange={ handleRateChange }
          required
        />
        <span>(in £)</span>
      </form>
      <DenseTable premium={ premium } duration={ duration } />
      <h2>{ title }</h2>
    </>
  )

  function handleRateChange ({ target: { value: rate } }: React.ChangeEvent<HTMLInputElement>) {
    setRate(Number.parseInt(rate, 10))
  }
}

interface ICalculators {
  amount: number
  duration: number
}

export const CalculatorRCF: React.FC<ICalculators> = ({ amount, duration }) => (
  <article id="rcf-calculator">
    <Calculator
      premium={ 0 }
      title='Revolving Credit Facility'
      duration={ duration }
    />
  </article>
)

export const CalculatorBL: React.FC<ICalculators> = ({ amount, duration }) => (
  <article id="bl-calculator">
    <Calculator
      premium={ 10 }
      title='Business Loan'
      duration={ duration }
    />
  </article>
)

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

interface IDenseTable {
  premium: number
  duration: number
}

function DenseTable ({ premium, duration }: IDenseTable): JSX.Element {
  const classes = useStyles();
  const payments = generatePlan(duration)

  return (
    <TableContainer component={ Paper }>
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
              <TableCell component="th" scope="row">
                { date }
              </TableCell>
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

function generatePlan (duration: number) {
  const formatDate = (startingDate: Date, index: number) => {
    const newMonth = startingDate.getMonth() + index
    const newDate = new Date()
    newDate.setMonth(newMonth)

    const dateISO = newDate.toISOString()
    const options = { month: "2-digit", day: "2-digit", year: "numeric" }
    const newDateISO = new Date(dateISO)
    return new Intl.DateTimeFormat("en-GB", options).format(newDateISO)
  }

  const formatCurrency = (price: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price)

  const startingDate = new Date()
  const payments = new Array(duration).fill(1).map((_, index) => {
    const date = formatDate(startingDate, index)
    const principal = formatCurrency(2500)
    const interest = formatCurrency(300)
    const total = formatCurrency(2000)

    return { date, principal, interest, total }
  })
  const totalPlan = {
    date: 'Total',
    principal: formatCurrency(10_000),
    interest: formatCurrency(750),
    total: formatCurrency(10_750)
  }
  payments.push(totalPlan)

  console.log({ payments })
  return payments
}