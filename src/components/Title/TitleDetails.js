import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class TitleDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      details:''
    }
  }

  componentWillMount(){
    this.getTitles();
  }

  getTitles(){
    let titleId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/titles/${titleId}`)
    .then(response => {
      this.setState({details: response.data}, () => {
        console.log(this.state);
      })
  })
  .catch(err => console.log(err));
  }

  onDelete(){
    let titleId = this.state.details.id;
    axios.delete(`http://localhost:3000/api/titles/${titleId}`)
      .then(response => {
        this.props.history.push('/');
      }).catch(err => console.log(err));
  }

  render(){
    return (
     <div>
       <br />
       <Link className="btn grey" to="/titles">Back</Link>
       <h1>{this.state.details.name}</h1>
       <ul className="collection">
        <li className="collection-item">Name: {this.state.details.name}</li>
        <li className="collection-item">Start Date: {this.state.details.start_date}</li>
        <li className="collection-item">End Date: {this.state.details.end_date}</li>
        <li className="collection-item">Department Name: {this.state.details.department_name}</li>
        </ul>
        <Link className="btn" to={`/titles/edit/${this.state.details.id}`}> Edit</Link>

        <button onClick={this.onDelete.bind(this)} className="btn red right">Delete</button>
      </div>
    )
  }
}

export default TitleDetails;