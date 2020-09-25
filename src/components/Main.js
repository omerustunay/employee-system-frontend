import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Locations from './Location/Locations';
import About from './About';
import LocationDetails from './Location/LocationDetails';
import AddLocation from './Location/AddLocation';
import EditLocation from './Location/EditLocation';
import Departments from './Department/Departments';
import Home from './Home';
import Employees from './Employee/Employees';
import EmployeeDetails from './Employee/EmployeeDetails';
import AddEmployee from './Employee/AddEmployee';
import EditEmployee from './Employee/EditEmployee';
import AddDepartment from './Department/AddDepartment';
import EditDepartment from './Department/EditDepartment';
import DepartmentDetails from './Department/DepartmentDetails';
import Titles from './Title/Titles';
import AddTitle from './Title/AddTitle';
import TitleDetails from './Title/TitleDetails';
import EditTitle from './Title/EditTitle';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/locations' component={Locations} />
      <Route exact path='/about' component={About} />
      <Route exact path='/locations/add' component={AddLocation} />
      <Route exact path='/locations/edit/:id' component={EditLocation} />
      <Route exact path='/locations/:id' component={LocationDetails} />
      <Route exact path='/Employees' component={Employees} />
      <Route exact path='/Employees/add' component={AddEmployee} />
      <Route exact path='/Employees/:id' component={EmployeeDetails} />
      <Route exact path='/employees/edit/:id' component={EditEmployee} />
      <Route exact path='/departments' component={Departments} />
      <Route exact path='/departments/add' component={AddDepartment} />
      <Route exact path='/departments/:id' component={DepartmentDetails} /> 
      <Route exact path='/departments/edit/:id' component={EditDepartment} />
      <Route exact path='/titles' component={Titles} />
      <Route exact path='/titles/add' component={AddTitle} />
      <Route exact path='/titles/:id' component={TitleDetails} />
      <Route exact path='/titles/edit/:id' component={EditTitle} />
    </Switch>
  </main>
)

export default Main;