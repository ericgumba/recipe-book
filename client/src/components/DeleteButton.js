import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { removeGenre, removeRecipe, removeIngredient, removeStep } from '../actions/index'
import Button from '@material-ui/core/Button';

const mapStateToProps = (state) => {  // takes application state as argument
    return { articles: state.articles } // of type array of objects
} 

const mapDispatchToProps = dispatch => {
    return {
        removeGenre: genre => dispatch(removeGenre(genre)),
        removeRecipe: genre => dispatch(removeRecipe(genre)),
        removeIngredient: payload => dispatch(removeIngredient(payload)),
        removeStep: payload => dispatch(removeStep(payload))
    }
}

class DeleteButton extends Component { 
    deleteGenre(){

        console.log("test")
        this.props.removeGenre(this.props.articles[this.props.genreIndex].genre)
    }

    deleteRecipe(){ 
        const payload = {
            genreTitle: this.props.articles[this.props.genreIndex].genre,
            recipeTitle: this.props.articles[this.props.genreIndex].recipes[this.props.recipeIndex].title
        }
        this.props.removeRecipe(payload)
    }
    deleteIngredient(){
        
        this.props.removeIngredient(
            {
                genreTitle: this.props.articles[this.props.genreIndex].genre,
                recipeTitle: this.props.articles[this.props.genreIndex].recipes[this.props.recipeIndex].title,
                ingredientTitle: this.props.ingredientTitle
            })

    }
    deleteStep(){

        this.props.removeStep(
            {
                genreTitle: this.props.articles[this.props.genreIndex].genre,
                recipeTitle: this.props.articles[this.props.genreIndex].recipes[this.props.recipeIndex].title,
                stepTitle: this.props.stepTitle
            })
    }

    handleDelete(event){
        switch(this.props.deleteType){
            case 'delete-genre':
                this.deleteGenre()
                break
            case 'delete-recipe':
                this.deleteRecipe()
                break
            case 'delete-ingredient':
                this.deleteIngredient()
                break
            case 'delete-step':
                this.deleteStep()
                break
            default:
                alert('error')
                break

        } 
    }
    render(){
        return(
        <Button variant="contained" color="primary" onClick={this.handleDelete.bind(this) }> DELETE </Button>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton)