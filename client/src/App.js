    import React, { Component } from "react"; 
    import "./App.css";
    import GenreList from "./containers/GenreList";
    import LoginModal from "./components/LoginModal";
    import RecipeCardMenu from "./components/RecipeCardMenu";
    import Header from "./components/Header";
    // import GenreButtons from "./components/GenreButtons";
    import { request } from 'https'; 
    const mapStateToProps = (state) => {  // takes application state as argument
      return { articles: state.articles } // of type array of objects
  } 
   

    class App extends Component {

      constructor(){
        super();
        this.state = {showGenres: true};
      }

      // componentDidMount(){
      //   this.callAPI().then( res => { 
      //     this.setState({message: res.username}) 
      //   } ).catch( err => console.log(err))
      // }

      // async callAPI() {  
      //   const data = {username: 'okmanl', recipeBook: newRecipe}
      //   const response = await fetch("/updatebook", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(data)
      //   }) 

      //   console.log(response)
      //   const body =  await response.json()

      //   console.log(body)

      //   return body
      // } 
 
      render() {

        const {message} = this.state;
        return (
          <div className="App"> 
            <Header/> 
            <RecipeCardMenu/>
            <GenreList showGenres={this.state.showGenres} /> 
            {message}
          </div>
        );
      } 
    }

    export default App;
