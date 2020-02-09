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
}

const Calculator: React.FC<ICalculator> = ({ premium, title }) => {
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
      <DenseTable premium={ premium } />
      <h2>{ title }</h2>
    </>
  )

  function handleRateChange ({ target: { value: rate } }: React.ChangeEvent<HTMLInputElement>) {
    setRate(Number.parseInt(rate, 10))
  }
}

export const CalculatorRCF: React.FC = () => (
  <article id="rcf-calculator">
    <Calculator
      premium={ 0 }
      title='Revolving Credit Facility'
    />
  </article>
)

export const CalculatorBL: React.FC = () => (
  <article id="bl-calculator">
    <Calculator
      premium={ 10 }
      title='Business Loan'
    />
  </article>
)

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

function createData (name: string, calories: string, fat: string, carbs: string) {
  return { name, calories, fat, carbs }
}

const rows = [
  createData('30/06/2019', '2,500', '300', '2,800'),
  createData('30/07/2019', '2,500', '225', '2,725'),
  createData('30/08/2019', '2,500', '150', '2,650'),
  createData('30/09/2019', '2,500', '75', '2,575'),
  createData('Total', '10000', '750', '10,750'),
];

interface IDenseTable {
  premium: number
}

function DenseTable ({ premium }: IDenseTable): JSX.Element {
  const classes = useStyles();

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
          { rows.map(row => (
            <TableRow key={ row.name }>
              <TableCell component="th" scope="row">
                { row.name }
              </TableCell>
              <TableCell align="right">{ row.calories }</TableCell>
              <TableCell align="right">{ row.fat }</TableCell>
              <TableCell align="right">{ row.carbs }</TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}