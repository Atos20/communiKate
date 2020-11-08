import React, { Component } from 'react';
import './NavBar.scss';
import moment from 'moment';
import { Link } from "react-router-dom";


export class NavBar extends Component {
  constructor(props){
    super(props)

    this.state= {
      date: moment().format('MM-DD-YYYY'),
      userDate: ''
    }
  }

  findStories = () => {
    const copyOfDate = this.state.userDate
    this.props.searchForStoriesByDate(copyOfDate)
  }

  updateDate = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  render(){
    return (
      <nav className="nav-bar">
        <div className="nav-inner-container">

          <div className="search-container">

            <div className="inner-search-container">

              <div className="day-information">
                <h5 className="app-title">{moment().format('LLL')}</h5>
              </div>

              <select 
                className="select"
                value={this.props.searchedItems.category}
                onChange={(event) => {this.props.updateSearchCategory(event)}}>
                <option 
                  placeholder='category'
                  value=''>categories</option>
                  {this.props.injectOptionsCategories()}
              </select>

              <input 
                value= {this.props.query}
                onChange={this.props.updateSearchQuery}
                placeholder='search'
                name='searchedItem'
                type="text" 
                className="search-bar"/>
                <i className="fas fa-search"
                  onClick={this.props.findUserStory}></i>
            </div>
            {this.props.error && <p className="error-message">{this.props.error}</p>}
          </div>

          <div className="controls">

            <div className="control find-date">
                <input 
                  onChange={this.updateDate}
                  name="userDate"
                  value={this.state.userDate}
                  placeholder={this.state.date}
                  type="text"/>
                <button 
                  onClick={this.findStories}
                  className="find-button">search</button>
            </div>

            <div className="control   buttons-container">

              <Link
                to='/home'>
                <button 
                className="button">home</button>
              </Link>

              <Link
                to='/my_reads'>
                <button 
                onClick={this.props.saveToLocalStorage}
                className="button">My reads</button>
              </Link>

              {this.props.laterReadings.length > 0 && <Link
                to='/my_reads'>
                <button 
                onClick={this.props.deleteAllSavedStories}
                className="button">Delete All</button>
              </Link>}

              <Link to='/home'>
                <button 
                  onClick={this.props.generateRandomCategory}
                  className="button">randomize</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
