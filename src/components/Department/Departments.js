import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import DepartmentItem from './DepartmentItem';

class Departments extends Component{
    constructor(){
        super();
        this.state = {
          departments: []
        }
    }

    componentWillMount(){
        this.getDepartments();
      }
    
    getDepartments(){
        axios.get('http://localhost:3000/api/departments')
          .then(response => {
            this.setState({departments: response.data}, () => {
              console.log(this.state);
            })
        })
        .catch(err => console.log(err));
    }

    render(){
        const departmentItems = this.state.departments.map((department, i) => {
            return(
                <DepartmentItem key={department.id} item={department} />
            )
          })
    return(
        <div>
            <h1>Departments</h1>
            <Link className="btn blue" to="/departments/add">Add</Link>
            <ul className="collection">
            {departmentItems}
            </ul>
        </div>
    )
  }
}


export default Departments;