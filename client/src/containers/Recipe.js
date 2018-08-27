 // Container for GenreButtons and 

 import React, { Component } from 'react';
 import { connect } from 'react-redux';
 import GenreButtons from "../components/GenreButtons"; 
 import RecipeCard from "../components/RecipeCard";
 import PropTypes from 'prop-types';
 import { login, logout, showGenre, showRecipe, removeRecipe } from "../actions/index"
import EditCard from '../components/EditCard';
 // Container for recipeCard child of RecipeCardsContainer
 
 // Todo: implement edit mode
 // known, genre index, recipe index.

 // therefore edit recipe action, will be... 



 const flex = {
     display: "flex",
     // flexdirection: "row"
 };
 
 // container for recipeCard, and RecipeCardMenu
 class Recipe extends Component {
 
     constructor(){
         super();
 
         this.state = { 
             editMode: false
         };
     }
     componentDidUpdate(){   
            this.updateBook().then( res => {
                console.log("book updated")

            }).catch( err => {
                console.log(err)
            });  
    } 
    async updateBook(){ 

        const data = {recipeBook: this.props.articles, username: this.props.username};
        console.log("UpdateBook from Recipe.js called.");
        const response = await fetch("/updatebook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const body = await response.json();
        return body;
    }
     
 
     handleEditButton(){
         this.setState({editMode: !this.state.editMode});
     }

     handleRecipeEdit(steps, ingredients){
         let articles = [...this.props.articles]; 
         
         articles[this.props.genreIndex].recipes[this.props.index].steps = steps;
         articles[this.props.genreIndex].recipes[this.props.index].ingredients = ingredients; 

         // call action here, with the new articles.

     }


     // Huge bug potential. =( 

     handleDelete(){ 
        this.props.removeRecipe(
            { 
                genreTitle: this.props.articles[this.props.genreIndex].genre, 
                recipeTitle: this.props.recipeTitle
            }); 
     }
 
 
     render(){ 
 
         const { index, recipe } = this.props;
         let {editMode} = this.state;

         //handleRecipeEdit is a function that accepts an object the fields steps and ingredients. The reason why we
         // don't have handle editButton call handleRecipeEdit is because it reduces coupling. 
         return(
             <div>
                 
                 {editMode ? 
                     <EditCard key={index} recipe={recipe} 
                     handleEditButton={ () => this.handleEditButton() }
                     handleRecipeEdit={ (steps, ingredients) => this.handleRecipeEdit(steps, ingredients) } 
                     />
                     :
                     <RecipeCard key={index} recipe={recipe} 
                     handleDelete={ () => this.handleDelete()}
                     handleEditButton={ () => this.handleEditButton()}
                      /> 
                  }
             </div>
         );
     }        
 } 

 Recipe.propTypes = {
     genreIndex: PropTypes.number.isRequired,
     recipeTitle: PropTypes.string.isRequired,
     key: PropTypes.number.isRequired 
 }
  
 
 const mapStateToProps = (state) => {
     return { 
         articles: state.articles,
         username: state.username,
         showGenre: state.showGenre 
     }
 }
 
 const mapDispatchToProps = (dispatch) => { // accepts redux's dispatch function.
     return{
         login: recipeBook => { return dispatch(login(recipeBook)) },
         logout: () => { return dispatch(logout()) },
         showGenre: () => {return dispatch(showGenre() )},
         showRecipe: genreIndex => { return dispatch( showRecipe(genreIndex)) },
         removeRecipe: ({genreTitle, recipeTitle}) => { return dispatch( removeRecipe({ genreTitle, recipeTitle}))}
     }
 };
 export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
  