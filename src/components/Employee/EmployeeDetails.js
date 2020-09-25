import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class EmployeeDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      details:''
    }
  }

  componentWillMount(){
    this.getEmployees();
  }

  getEmployees(){
    let employeeId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/employees/${employeeId}`)
    .then(response => {
      this.setState({details: response.data}, () => {
        console.log(this.state);
      })
  })
  .catch(err => console.log(err));
  }

  onDelete(){
    let employeeId = this.state.details.id;
    axios.delete(`http://localhost:3000/api/employees/${employeeId}`)
      .then(response => {
        this.props.history.push('/');
      }).catch(err => console.log(err));
  }

  render(){
    return (
     <div>
       <br />
       <Link className="btn grey" to="/employees">Back</Link>
       <h1>{this.state.details.name}</h1>
       <ul className="collection">
        <li className="collection-item">Name: {this.state.details.name}</li>
        <li className="collection-item">Surname: {this.state.details.surname}</li>
        <li className="collection-item">Email: {this.state.details.email}</li>
        <li className="collection-item">Phone: {this.state.details.phone}</li>
        <li className="collection-item">Start Date: {this.state.details.start_date}</li>
        <li className="collection-item">Salary: {this.state.details.salary}</li>
        <li className="collection-item">Department: {this.state.details.department_id}</li>
        <li className="collection-item">Title: {this.state.details.title_id}</li>
        <li className="collection-item">Manager Name: {this.state.details.manager_name}</li>
        </ul>
        <Link className="btn" to={`/employees/edit/${this.state.details.id}`}> Edit</Link>

        <button onClick={this.onDelete.bind(this)} className="btn red right">Delete</button>
      </div>
    )
  }
}

export default EmployeeDetails;