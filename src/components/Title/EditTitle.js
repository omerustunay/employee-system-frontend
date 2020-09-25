import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


class EditTitle extends Component{
  constructor(props){
    super(props);
    this.state = {
      id:'',
      name:'',
      start_date:'',
      end_date:'',
      department_name:''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    this.getTitleDetails();
  }

  getTitleDetails(){
    let titleId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/titles/${titleId}`)
    .then(response => {
      this.setState({
        id: response.data.id,
        name: response.data.name,
        start_date: response.data.start_date.value,
        end_date: response.data.end_date,
        department_name: response.data.department_name
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

  editTitle(newTitle){
    axios.request({
      method:'put',
      url:`http://localhost:3000/api/titles/${this.state.id}`,
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
    this.editTitle(newTitle);
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
       <Link className="btn grey" to="/titles">Back</Link>
       <h1>Edit Title</h1>
       <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input type="date" id="start"  name="start_date" ref="start_date" min="2020-01-01" max="2028-12-31"/>
          </div>
          <div >
            <input type="date" id="end" name="end_date" ref="end_date" min="2020-01-01" max="2028-12-31"/>
          </div>
          <div className="input-field">
            <input type="text" name="department_name" ref="department_name" value={this.state.department_name} onChange={this.handleInputChange} />
            <label htmlFor="department_name">Department Name</label>
          </div>
         
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}

export default EditTitle;