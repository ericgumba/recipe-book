 // Container for GenreButtons and 

 import React, { Component } from 'react';
 import { connect } from 'react-redux'; 
 import RecipeCard from "../components/RecipeCard";
 import PropTypes from 'prop-types';
 import { login, logout, showGenre, showRecipe, removeRecipe, addImage, editRecipe } from "../actions/index"
import EditCard from '../components/EditCard';
 // Container for recipeCard child of RecipeCardsContainer
 
 // Todo: implement edit mode
 // known, genre index, recipe index.

 // therefore edit recipe action, will be... 


 
 
 // container for recipeCard, and RecipeCardMenu
 class Recipe extends Component {
 
     constructor(){
         super();
 
         this.state = { 
             editMode: false,
             add: 0
         };
     }
     componentDidUpdate(){   
         this.updateHelper();
    } 
    updateHelper(){
        this.updateBook().then( res => { 

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
     handleDeleteButton(){
         console.log("Handle Delete called")
         this.setState({editMode: !this.state.editMode}); 
     }
     partTwo(){
         console.log("Part two called");
         this.setState({editMode: true});
     }

     handleRecipeEdit(steps, ingredients){
         let articles = [...this.props.articles]; 
         
         articles[this.props.genreIndex].recipes[this.props.index].steps = steps;
         articles[this.props.genreIndex].recipes[this.props.index].ingredients = ingredients; 

        //  this.setState({add: this.stateadd+1});

         this.props.editRecipe(articles);
     }

    //  export const editRecipe = newArticles =>({
    //     type: "EDIT_RECIPE",
    //     payload: newArticles
    // })
     handleUploadPhoto(photo){
         console.log("added in the.... Thing");
         let articles = [...this.props.articles]; 
         articles[this.props.genreIndex].recipes[this.props.index].image = photo; 
         this.props.addImage(articles);

         this.updateHelper();

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
                     handleDeleteButton={ () => this.handleDeleteButton() }
                     handleRecipeEdit={ (steps, ingredients) => this.handleRecipeEdit(steps, ingredients) } 
                     genreTitle={this.props.articles[this.props.genreIndex].genre}
                     />
                     :
                     <RecipeCard key={index} recipe={recipe} 
                     handleDelete={ () => this.handleDelete() }
                     handleEditButton={ () => this.handleEditButton() }
                     handleUploadPhoto={ (photo) => this.handleUploadPhoto(photo) }
                      /> 
                  }
             </div>
         );
     }        
 } 

 Recipe.propTypes = {
     genreIndex: PropTypes.number.isRequired,
     recipeTitle: PropTypes.string.isRequired, 
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
         removeRecipe: ({genreTitle, recipeTitle}) => { return dispatch( removeRecipe({ genreTitle, recipeTitle}))},
         addImage: image => {return dispatch(addImage(image))},
         editRecipe: newArticles => { return dispatch(editRecipe(newArticles)) } 
     }
 };
 export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
  