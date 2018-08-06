 // Container for GenreButtons and 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import GenreButtons from "../components/GenreButtons"; 
import RecipeCard from "../components/RecipeCard";

// Container for recipeCard

// Todo: implement edit mode

const flex = {
    display: "flex",
    // flexdirection: "row"
};

class RecipeCardsContainer extends Component {

    constructor(){
        super()

        this.state = { 
            editMode: false
        }
    }

    handleEditButton(){
        this.setState({editMode: !this.state.editMode})
    }


    render(){ 

        const { recipes } = this.props;
        let {editMode} = this.state;

 
        return(
        <div style={{display: "flex"}}> 
            {recipes.map( (recipe, index) => {
                return (<RecipeCard key={index} recipe={recipe}/>)
            }) }
 
        </div>
        )
    }
} 
 

export default RecipeCardsContainer;