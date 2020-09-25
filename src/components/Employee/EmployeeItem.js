import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class EmployeeItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      item:props.item
    }
  }

  render(){
    return (
      <li className="collection-item">
        <Link to={`/employees/${this.state.item.id}`}>{this.state.item.name}{' '}{this.state.item.surname}</Link>
        
      </li>
    )
  }
}

export default EmployeeItem;