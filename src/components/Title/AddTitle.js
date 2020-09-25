import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class AddTitle extends Component{
  
  AddTitle(newTitle){
    axios.request({
      method:'post',
      url:'http://localhost:3000/api/titles',
      data: newTitle
    }).then(response => {
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  onSubmit(e){
    const newTitle = {
      name: this.refs.name.value,
      start_date: this.refs.start_date.value,
      end_date: this.refs.end_date.value,
      department_name: this.refs.department_name.value
    }
    this.AddTitle(newTitle);
    e.preventDefault();
  }

  render(){
    return (
     <div>
        <br />
       <Link className="btn grey" to="/titles">Back</Link>
       <h1>Add Title</h1>
       <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="name" ref="name" />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input type="date" id="start"  name="trip-start" ref="start_date" min="2020-01-01" max="2028-12-31"/>
            
          </div>
          <div >
            <input type="date" id="end" name="trip-start" ref="end_date"  min="2020-01-01" max="2028-12-31"/>
            
          </div>
          <div className="input-field">
            <input type="text" name="department_name" ref="department_name" />
            <label htmlFor="department_name">Department Name</label>
          </div>        
          <div>
      </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}

export default AddTitle;