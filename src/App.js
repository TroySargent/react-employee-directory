import React, {useState, useEffect} from 'react';
import SimpleTable from './components/Table'
import Container from '@material-ui/core/Container';
import Search from './components/Search'

export default function App() {
  const [employeeState, setEmployeeState] = useState({
    employees: [],
    filteredEmployees: []
})
  const [sortState, setSortState] = useState({
    order: true
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
    setEmployeeState({...employeeState, filteredEmployees : []}); //reset the search results on each change (need to work for backspacing)
    let searchValue = e.target.value.toLowerCase();
    let searchResults = [...employeeState.employees];
    searchResults = searchResults.filter(employee => {
      let name = `${employee.name.first} ${employee.name.last}`.toLowerCase()
      return name.includes(searchValue)
    });
    setEmployeeState({...employeeState, filteredEmployees : searchResults});
    
  };
  
  const sortByLastName = () => {
  let sortedResults = [...employeeState.employees];
  //sort toggle
  function sortName(){
    setSortState({order: !sortState.order})
    sortedResults = sortedResults.sort(function (a, b) {
      const x = a.name.last
      const y = b.name.last
      return (sortState.order ? x.localeCompare(y) : y.localeCompare(x));
    });
    return sortedResults
  };
  setEmployeeState({...employeeState, employees : sortName()});
  };
  

  return (
    <>
    <Search searchForEmployee={searchForEmployee}/>
    <Container>
      <SimpleTable
        employees={employeeState.filteredEmployees.length ? employeeState.filteredEmployees : employeeState.employees}
        sortByLastName={sortByLastName}>
      </SimpleTable>
    </Container>
    </>
  );
}

