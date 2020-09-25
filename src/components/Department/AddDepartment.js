import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import {Link} from 'react-router-dom';

class AddLocation extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectOptions : [],
      id:'',
      name:'',
      addres:'',
      postal_code:'',
      city:'',
      country:''
    }
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
   this.setState({id:e.value, name:e.label})
  }

  componentDidMount(){
      this.getLocations()
  }

  AddDepartment(newDepartment){
    axios.request({
      method:'post',
      url:'http://localhost:3000/api/departments',
      data: newDepartment
    }).then(response => {
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  onSubmit(e){
    const newDepartment = {
      name: this.refs.name.value,
      manager: this.refs.manager.value,
      location_id: this.state.id
    }
    this.AddDepartment(newDepartment);
    e.preventDefault();
  }

  render(){
    return (
     <div>
        <br />
       <Link className="btn grey" to="/departments">Back</Link>
       <h1>Add Department</h1>
       <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="name" ref="name" />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="manager" ref="manager" />
            <label htmlFor="manager">Manager</label>
          </div>   
          <div>
          <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
          <option value = {this.state.id}></option>
           <p>You have selected <strong>{this.state.name}</strong> whose id is <strong>{this.state.id}</strong></p>
          </div>
                 
          <div>
        
      </div>
          <input type="submit" value="Save" className="btn" />
        </form>
        
      </div>
    )
  }
}

export default AddLocation;