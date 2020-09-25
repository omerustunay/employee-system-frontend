import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import TitleItem from './TitleItem';

class Titles extends Component{
    constructor(){
        super();
        this.state = {
          titles: []
        }
    }

    componentWillMount(){
        this.getTitles();
      }
    
    getTitles(){
        axios.get('http://localhost:3000/api/titles')
          .then(response => {
            this.setState({titles: response.data}, () => {
              console.log(this.state);
            })
        })
        .catch(err => console.log(err));
    }

    render(){
      const titleItems = this.state.titles.map((title, i) => {
          return(
              <TitleItem key={title.id} item={title} />
          )
        })
  return(
      <div>
          <h1>Titles</h1>
          <Link className="btn blue" to="/titles/add">Add</Link>
          <ul className="collection">
          {titleItems}
          </ul>
      </div>
  )
  }
}


export default Titles;