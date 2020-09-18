import React, {useState, useEffect} from 'react';
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

export default function SimpleTable() {
    const [employeeState, setEmployeeState] = useState({
        employees: []
    })

    const classes = useStyles();
    
    useEffect(() => {
        fetch('https://randomuser.me/api/?results=10', {
            method: 'GET'
        }).then(response => response.json())
        .then(data => setEmployeeState({employees : data.results}));

    }, [])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">DOB</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {employeeState.employees.length > 0 ? 
          employeeState.employees.map((employee, index) => {
              return (
            <TableRow key={index}>
              <TableCell component="th" scope="row" align="right"><img src={employee.picture.medium} alt=""></img></TableCell>
              <TableCell align="right">{`${employee.name.first} ${employee.name.last}`}</TableCell>
              <TableCell align="right">{employee.phone}</TableCell>
              <TableCell align="right">{employee.email}</TableCell>
              <TableCell align="right">{new Date(employee.dob.date).toLocaleDateString()}</TableCell>
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
