import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Select from 'react-select';

class EditDepartment extends Component{
  constructor(props){
    super(props);
    this.state = {
      id:'',
      name:'',
      manager:'',
      location_id:'',
      lid:'',
      lname:''
      
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  async getLocations(){
    const res = await axios.get('http://localhost:3000/api/locations')
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
    this.getDepartmentDetails();
  }

  getDepartmentDetails(){
    let departmentId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/departments/${departmentId}`)
    .then(response => {
      this.setState({
        id: response.data.id,
        name: response.data.name,
        manager: response.data.manager
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

  editDepartment(newDepartment){
    axios.request({
      method:'put',
      url:`http://localhost:3000/api/departments/${this.state.id}`,
      data: newDepartment
    }).then(response => {
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  onSubmit(e){
    const newDepartment = {
      name: this.refs.name.value,
      manager: this.refs.manager.value,
      location_id: this.state.lid
     
    }
    this.editDepartment(newDepartment);
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
       <Link className="btn grey" to="/departments">Back</Link>
       <h1>Edit Department</h1>
       <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="manager" ref="manager" value={this.state.manager} onChange={this.handleInputChange} />
            <label htmlFor="manager">Manager</label>
          </div>
          <div>
          <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
          <option value = {this.state.lid}></option>
           <p>You have selected <strong>{this.state.lname}</strong> whose id is <strong>{this.state.lid}</strong></p>
          </div>
        
          
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}

export default EditDepartment;