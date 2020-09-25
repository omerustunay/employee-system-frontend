import React, { Component } from 'react';
import axios from 'axios';
import { Link }from 'react-router-dom';
import EmployeeItem from './EmployeeItem';

class Employees extends Component{
    constructor(){
        super();
        this.state = {
          employees: []
        }
    }

    componentWillMount(){
        this.getEmployees();
      }
    
    getEmployees(){
        axios.get('http://localhost:3000/api/employees')
          .then(response => {
            this.setState({employees: response.data}, () => {
              console.log(this.state);
            })
        })
        .catch(err => console.log(err));
    }

    render(){
        const employeeItem = this.state.employees.map((emp, i) => {
            return(
                <EmployeeItem key={emp.id} item={emp} />
            )
          })
    return(
        <div>
            <h1>User List</h1>
            <Link className="btn pink" to="/employees/add">Add</Link>
            <ul className="collection">
            {employeeItem}
            </ul>
        </div>
    )
  }
}


export default Employees;