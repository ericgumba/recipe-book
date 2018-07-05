import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GenreList from './components/GenreList'
import Header from './components/Header'
import { request } from 'https';
class App extends Component {

  constructor(){
    super()
    this.state = {message: ''}
  }
  componentDidMount(){
    this.callAPI().then( res => { 
      // this.setState({message: res.express}) 
    } ).catch( err => console.log(err))
  }

  async callAPI() { 
    const response = await fetch('/imreal') 
    console.log(response)
    const body =  await response.json()

    console.log(body)

    return body
  }

  render() {

    const {message} = this.state
    return (
      <div className="App"> 

        <Header/>
        <GenreList/>

        {message}


      </div>
    );
  }
}

export default App;