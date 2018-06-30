import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GenreList from './components/GenreList'
class App extends Component {
  render() {
    return (
      <div className="App"> 


        <GenreList/>


      </div>
    );
  }
}

export default App;
