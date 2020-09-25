import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class EditLocation extends Component{
  constructor(props){
    super(props);
    this.state = {
      id:'',
      name:'',
      addres:'',
      postal_code:'',
      city:'',
      country:''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    this.getLocationDetails();
  }

  getLocationDetails(){
    let locationId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/locations/${locationId}`)
    .then(response => {
      this.setState({
        id: response.data.id,
        name: response.data.name,
        addres: response.data.addres,
        postal_code: response.data.postal_code,
        city: response.data.city,
        country: response.data.country
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

  editLocation(newLocation){
    axios.request({
      method:'put',
      url:`http://localhost:3000/api/locations/${this.state.id}`,
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
    this.editLocation(newLocation);
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
       <Link className="btn grey" to="/locations">Back</Link>
       <h1>Edit Location</h1>
       <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="addres" ref="addres" value={this.state.addres} onChange={this.handleInputChange} />
            <label htmlFor="addres">Addres</label>
          </div>
          <div className="input-field">
            <input type="text" name="postal_code" ref="postal_code" value={this.state.postal_code} onChange={this.handleInputChange} />
            <label htmlFor="postal_code">Postal Code</label>
          </div>
          <div className="input-field">
            <input type="text" name="city" ref="city" value={this.state.city} onChange={this.handleInputChange} />
            <label htmlFor="city">City</label>
          </div>
          <div className="input-field">
            <input type="text" name="country" ref="country" value={this.state.country} onChange={this.handleInputChange} />
            <label htmlFor="country">Country</label>
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}

export default EditLocation;