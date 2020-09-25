import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class AddLocation extends Component{
  
  AddLocation(newLocation){
    axios.request({
      method:'post',
      url:'http://localhost:3000/api/locations',
      data: newLocation
    }).then(response => {
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  onSubmit(e){
    const newLocation = {
      name: this.refs.name.value,
      addres: this.refs.addres.value,
      postal_code: this.refs.postal_code.value,
      city: this.refs.city.value,
      country: this.refs.country.value
    }
    this.AddLocation(newLocation);
    e.preventDefault();
  }

  render(){
    return (
     <div>
        <br />
       <Link className="btn grey" to="/locations">Back</Link>
       <h1>Add Location</h1>
       <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="name" ref="name" />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="addres" ref="addres" />
            <label htmlFor="name">Addres</label>
          </div>
          <div className="input-field">
            <input type="text" name="postal_code" ref="postal_code" />
            <label htmlFor="name">Postal Code</label>
          </div>
          <div className="input-field">
            <input type="text" name="city" ref="city" />
            <label htmlFor="city">City</label>
          </div>
          <div className="input-field">
            <input type="text" name="country" ref="country" />
            <label htmlFor="address">Country</label>
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