import React, {useState, useEffect} from 'react';
import SimpleTable from './components/Table'
import Container from '@material-ui/core/Container';
import Search from './components/Search'

export default function App() {
  const [employeeState, setEmployeeState] = useState({
    employees: []
})

useEffect(() => {
   const fetchData = async () => {
     let {results} = await fetch('https://randomuser.me/api/?results=10', {
         method: 'GET'
     }).then(response => response.json());

     setEmployeeState({employees : results});
  }

  fetchData();
}, [])

  const searchForEmployee = e => {
  let searchValue = e.target.value.toLowerCase();
  let filteredEmployeeList = employeeState.employees.filter(employee => {
    let name = `${employee.name.first} ${employee.name.last}`.toLowerCase()
    return name.includes(searchValue)
  })
  setEmployeeState({employees : filteredEmployeeList});
};

  return (
    <>
    <Search searchForEmployee={searchForEmployee}/>
    <Container>
      <SimpleTable employees={employeeState.employees}/>
    </Container>
    </>
  );
}

