import React, { Component } from 'react';
import './App.scss';
import { getTopStories } from '../../apiCalls'
import allNewsCategories from '../../data/data'

export class App extends Component {
  constructor(){
    super()
    
    this.state = {
      newsData: {},
      allNewsCategories: allNewsCategories,
      error: ''
    }
  }
  
  componentDidMount = () => {
    this.populateCategories()
  }

  populateCategories = () => {
    allNewsCategories.forEach(category => {
      this.setState(prevState => ({
        newsData: {...prevState.newsData, [category]: 'something'}
      }))
    })
    this.requestData()
  }

  requestData = async(category) => {
    const promise = await getTopStories('us')
    this.setState(prevState => ({
       newsData: {
         ...prevState.newsData,
        'us': promise
       }
    }))
  }




  render() {
    
    return (
      <div className="App">
        <h1 className="hola">hola</h1>
      </div>
    )
  }
}

export default App;
