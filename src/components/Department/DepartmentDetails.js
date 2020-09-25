import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class DepartmentDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      details:''
    }
  }

  componentWillMount(){
    this.getDepartments();
  }

  getDepartments(){
    let departmentId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/departments/${departmentId}`)
    .then(response => {
      this.setState({details: response.data}, () => {
        console.log(this.state);
      })
  })
  .catch(err => console.log(err));
  }

  onDelete(){
    let departmentId = this.state.details.id;
    axios.delete(`http://localhost:3000/api/departments/${departmentId}`)
      .then(response => {
        this.props.history.push('/');
      }).catch(err => console.log(err));
  }

  render(){
    return (
     <div>
       <br />
       <Link className="btn grey" to="/departments">Back</Link>
       <h1>{this.state.details.name}</h1>
       <ul className="collection">
        <li className="collection-item">Name: {this.state.details.name}</li>
        <li className="collection-item">Manager: {this.state.details.manager}</li>
        <li className="collection-item">Location: {this.state.details.location_id}</li>
        </ul>
        <Link className="btn" to={`/departments/edit/${this.state.details.id}`}> Edit</Link>

        <button onClick={this.onDelete.bind(this)} className="btn red right">Delete</button>
      </div>
    )
  }
}

export default DepartmentDetails;