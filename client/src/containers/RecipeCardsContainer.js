 // Container for GenreButtons and 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import GenreButtons from "../components/GenreButtons"; 
import RecipeCard from "../components/RecipeCard";
import Recipe from "./Recipe";
import PropTypes from 'prop-types';
import { login, logout, showGenre, showRecipe } from "../actions/index"
// Container for recipeCard

// Todo: implement edit mode

const flex = {
    display: "flex",
    // flexdirection: "row"
};

class RecipeCardsContainer extends Component {

    constructor(){
        super()
 
    }

    handleEditButton(){
        this.setState({editMode: !this.state.editMode})
    }


    render(){ 

        const { recipes } = this.props; 

 
        return(
        <div style={{display: "flex"}}> 
            {recipes.map( (recipe, index) => {
                return (<Recipe key={index} index={index} recipe={recipe} recipeTitle={recipe.title} genreIndex={this.props.genreIndex}/>)
            }) }
 
        </div>
        )
    }
} 


RecipeCardsContainer.propTypes = {
    genreIndex: PropTypes.number.isRequired 
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
        showRecipe: genreIndex => { return dispatch( showRecipe(genreIndex)) }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(RecipeCardsContainer);
 