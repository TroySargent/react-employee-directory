import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable(props) {

    const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">DOB</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.employees.length > 0 ? 
          props.employees.map((employee, index) => {
              return (
            <TableRow key={index}>
              <TableCell component="th" scope="row" align="center"><img src={employee.picture.medium} alt=""></img></TableCell>
              <TableCell align="center">{`${employee.name.first} ${employee.name.last}`}</TableCell>
              <TableCell align="center">{employee.phone}</TableCell>
              <TableCell align="center">{employee.email}</TableCell>
              <TableCell align="center">{new Date(employee.dob.date).toLocaleDateString()}</TableCell>
            </TableRow>
              )
            }) :  <TableRow>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>

        }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
