import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import {Link} from 'react-router-dom';

class EditEmployee extends Component{
  constructor(props){
    super(props);
    this.state = {
      id:'',
      name:'',
      surname:'',
      email:'',
      phone:'',
      start_date:'',
      salary:'',
      department_id:'',
      title_id:'',
      manager_name:'',
      lid:'',
      lname:''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async getLocations(){
    const res = await axios.get('http://localhost:3000/api/departments')
    const data = res.data

    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.name

    }))

    this.setState({selectOptions: options})

  }

  handleChange(e){
   this.setState({lid:e.value, lname:e.label})
  }

  componentDidMount(){
      this.getLocations()
  }


  componentWillMount(){
    this.getEmployeeDetails();
  }

  getEmployeeDetails(){
    let employeeId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/employees/${employeeId}`)
    .then(response => {
      this.setState({
        id: response.data.id,
        name: response.data.name,
        surname: response.data.surname,
        email: response.data.email,
        phone: response.data.phone,
        start_date: response.data.start_date,
        salary: response.data.salary,
        department_id: response.data.department_id,
        title_id: response.data.title_id,
        manager_name: response.data.manager_name
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

  editEmployee(newEmployee){
    axios.request({
      method:'put',
      url:`http://localhost:3000/api/employees/${this.state.id}`,
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
      department_id: this.state.lid,
      title_id: this.refs.title_id.value,
      manager_name: this.refs.manager_name.value,
    }
    this.editEmployee(newEmployee);
    e.preventDefault();
  }

  handleInputChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render(){
    return (
     <div>
        <br />
       <Link className="btn grey" to="/employees">Back</Link>
       <h1>Edit User</h1>
       <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="surname" ref="surname" value={this.state.surname} onChange={this.handleInputChange} />
            <label htmlFor="surname">Surname</label>
          </div>
          <div className="input-field">
            <input type="text" name="email" ref="email" value={this.state.email} onChange={this.handleInputChange} />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input type="text" name="phone" ref="phone" value={this.state.phone} onChange={this.handleInputChange} />
            <label htmlFor="phone">Phone</label>
          </div>
          <div className="input-field">
            <input type="date" id="start"  name="start_date" ref="start_date" min="2020-01-01" max="2028-12-31"/>
          </div>
          <div className="input-field">
            <input type="text" name="salary" ref="salary" value={this.state.salary} onChange={this.handleInputChange} />
            <label htmlFor="salary">Salary</label>
          </div>
          <div className="input-field">
            <input type="text" name="title_id" ref="title_id" value={this.state.title_id} onChange={this.handleInputChange} />
            <label htmlFor="title_id">Title id</label>
          </div>
          <div>
          <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
          <option value = {this.state.lid}></option>
           <p>You have selected <strong>{this.state.lname}</strong> whose id is <strong>{this.state.lid}</strong></p>
          </div>
          <div className="input-field">
            <input type="text" name="manager_name" ref="manager_name" value={this.state.manager_name} onChange={this.handleInputChange} />
            <label htmlFor="manager_name">Manager Name</label>
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}

export default EditEmployee;