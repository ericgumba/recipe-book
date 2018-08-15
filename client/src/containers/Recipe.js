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
 
     handleEditButton(){
         this.setState({editMode: !this.state.editMode});
     }


     // Huge bug potential. =( 

     handleDelete(){
         alert("huge bug potentiaL?");
         console.log("props");
         console.log(this.props.genreIndex);
         console.log(this.props.articles[this.props.genreIndex].genre);
         console.log(this.props.recipeTitle);
        this.props.removeRecipe(
            { 
                genreTitle: this.props.articles[this.props.genreIndex].genre, 
                recipeTitle: this.props.recipeTitle
            }); 
     }
 
 
     render(){ 
 
         const { index, recipe } = this.props;
         let {editMode} = this.state;
 
  
         return(
             <div>
                 
                 {editMode ? 
                     <EditCard key={index} recipe={recipe} 
                     handleEditButton={ () => this.handleEditButton() }
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
     recipeTitle: PropTypes.string.isRequired   
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
  