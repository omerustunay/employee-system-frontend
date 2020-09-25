import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import {Link} from 'react-router-dom';

class AddEmployee extends Component{
    constructor(props){
        super(props);
        this.state = {
          selectOptions : [],    
          id:'',
          name:''
        }
      }
      
      async getDepartment(){
        const res = await axios.get('http://localhost:3000/api/departments')
        const data = res.data
    
        const options = data.map(d => ({
          "value" : d.id,
          "label" : d.name
    
        }))
        this.setState({selectOptions: options})
      }
    
      handleChange(e){
       this.setState({id:e.value, name:e.label})
      }
    
      componentDidMount(){
          
          this.getDepartment()
      }
      

  AddEmployee(newEmployee){
    axios.request({
      method:'post',
      url:'http://localhost:3000/api/employees',
      data: newEmployee
    }).then(response => {
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  onSubmit(e){
    const newEmployee = {
      name: this.refs.name.value,
      surname: this.refs.surname.value,
      email: this.refs.email.value,
      phone: this.refs.phone.value,
      start_date: this.refs.start_date.value,
      salary: this.refs.salary.value,
      department_id: this.state.id,
      title_id: this.refs.title_id.value,
      manager_name: this.refs.manager_name.value
    }
    this.AddEmployee(newEmployee);
    e.preventDefault();
  }

  render(){
    return (
     <div>
        <br />
       <Link className="btn grey" to="/employees">Back</Link>
       <h1>Add User</h1>
       <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="name" ref="name" />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="surname" ref="surname" />
            <label htmlFor="surname">surname</label>
          </div>
          <div className="input-field">
            <input type="text" name="email" ref="email" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input type="text" name="phone" ref="phone" />
            <label htmlFor="phone">Phone</label>
          </div>
          <div className="input-field">
            <input type="date" id="start"  name="trip-start" ref="start_date" min="2020-01-01" max="2028-12-31"/>
            
          </div>
          <div className="input-field">
            <input type="text" name="salary" ref="salary" />
            <label htmlFor="salary">Salary</label>
          </div>
          <div className="input-field">
            <input type="text" name="title_id" ref="title_id" />
            <label htmlFor="title_id">Title id</label>
          </div>
          <div>
          <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
          <option value = {this.state.id}></option>
           <p>You have selected <strong>{this.state.name}</strong> whose id is <strong>{this.state.id}</strong></p>
          </div>
        
          <div className="input-field">
            <input type="text" name="manager_name" ref="manager_name" />
            <label htmlFor="manager_name">Manager Name</label>
            
          </div>          
          <div>
      </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}

export default AddEmployee;