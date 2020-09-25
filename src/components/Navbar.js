import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Navbar extends Component{
  render(){
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
          <a href="#!" className="brand-logo"><i className="material-icons"></i>Atez</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/"><i className="fa fa-home"></i>Atez</Link></li>  
            <li><Link to="/employees"><i className="fa fa-users"></i>User</Link></li> 
            <li><Link to="/departments"><i className="fa fa-id-badge"></i>Department</Link></li> 
            <li><Link to="/locations"><i className="fa fa-location-arrow"></i>Locations</Link></li>  
            <li><Link to="/titles"><i className="fa fa-id-card-o"></i>Title</Link></li> 
            <li><Link to="/about"><i className="fa fa-question-circle"></i>About</Link></li> 
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar;