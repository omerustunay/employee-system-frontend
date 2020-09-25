import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class LocationDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      details:''
    }
  }

  componentWillMount(){
    this.getLocations();
  }

  getLocations(){
    let locationId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/locations/${locationId}`)
    .then(response => {
      this.setState({details: response.data}, () => {
        console.log(this.state);
      })
  })
  .catch(err => console.log(err));
  }

  onDelete(){
    let locationId = this.state.details.id;
    axios.delete(`http://localhost:3000/api/locations/${locationId}`)
      .then(response => {
        this.props.history.push('/');
      }).catch(err => console.log(err));
  }

  render(){
    return (
     <div>
       <br />
       <Link className="btn grey" to="/locations">Back</Link>
       <h1>{this.state.details.name}</h1>
       <ul className="collection">
        <li className="collection-item">Name: {this.state.details.name}</li>
        <li className="collection-item">Addres: {this.state.details.addres}</li>
        <li className="collection-item">Postal Code: {this.state.details.postal_code}</li>
        <li className="collection-item">City: {this.state.details.city}</li>
        <li className="collection-item">Country: {this.state.details.country}</li>
        </ul>
        <Link className="btn" to={`/locations/edit/${this.state.details.id}`}> Edit</Link>

        <button onClick={this.onDelete.bind(this)} className="btn red right">Delete</button>
      </div>
    )
  }
}

export default LocationDetails;