    import React, { Component } from "react"; 
    import "./App.css";
    import GenreList from "./containers/GenreList"; 
    import RecipeCardMenu from "./components/RecipeCardMenu";
    import Header from "./components/Header";
    // import GenreButtons from "./components/GenreButtons"; 
  
   

    class App extends Component { 
      constructor(){
        super();
        this.state = {showGenres: true};
      }

      render() { 
        const {message} = this.state;
        return (
          <div className="App"> 
            <Header/>  
            <GenreList showGenres={this.state.showGenres} /> 
            {message}
          </div>
        );
      } 
    }

    export default App;
