import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import LocationItem from './LocationItem';

class Locations extends Component{
    constructor(){
        super();
        this.state = {
          locations: []
        }
    }

    componentWillMount(){
        this.getLocations();
      }
    
    getLocations(){
        axios.get('http://localhost:3000/api/locations')
          .then(response => {
            this.setState({locations: response.data}, () => {
              console.log(this.state);
            })
        })
        .catch(err => console.log(err));
    }

    render(){
        const locationItems = this.state.locations.map((location, i) => {
            return(
                <LocationItem key={location.id} item={location} />
            )
          })
    return(
        <div>
            <h1>Locations</h1>
            <Link className="btn blue" to="/locations/add">Add</Link>
            <ul className="collection">
            {locationItems}
            </ul>
        </div>
    )
  }
}


export default Locations;