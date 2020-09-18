import React, {useState, useEffect} from 'react';
import SimpleTable from './components/Table'
import Container from '@material-ui/core/Container';
import Search from './components/Search'

export default function App() {
  const [employeeState, setEmployeeState] = useState({
    employees: [],
    filteredEmployees: []
})

useEffect(() => {
   const fetchData = async () => {
     let {results} = await fetch('https://randomuser.me/api/?results=10&nat=US', {
         method: 'GET'
     }).then(response => response.json());

     setEmployeeState({...employeeState, employees : results});
  }

  fetchData();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  const searchForEmployee = e => {
  setEmployeeState({filteredEmployees : []});
  let searchValue = e.target.value.toLowerCase();
  let searchResults = [...employeeState.employees];

  searchResults = searchResults.filter(employee => {
      let name = `${employee.name.first} ${employee.name.last}`.toLowerCase()
      return name.includes(searchValue)
    });
    setEmployeeState({...employeeState, filteredEmployees : searchResults});

  };

  return (
    <>
    <Search searchForEmployee={searchForEmployee}/>
    <Container>
      {console.log(employeeState)}
      <SimpleTable employees={employeeState.filteredEmployees.length ? employeeState.filteredEmployees : employeeState.employees}/>
    </Container>
    </>
  );
}

