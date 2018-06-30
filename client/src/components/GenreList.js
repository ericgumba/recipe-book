import React, { Component } from 'react'
import { connect } from 'react-redux' 
import Form from './Form'
import DeleteButton from './DeleteButton'
import '../styles/GenreList.css'
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography'; 
import Button from '@material-ui/core/Button';



class GenreList extends Component {
    constructor(props){
        super(props) 
        this.state = { 
            isShowingGenres: true,
            isShowingRecipes: false,
            isShowingRecipe: false,
            genreIndex: 0,
            recipesIndex: 0
         }

         this.setRecipeList = this.setRecipeList.bind(this)
         this.setRecipe = this.setRecipe.bind(this)
    }

 
    setGenreList(){
        this.setState({
            isShowingGenres: true,
            isShowingRecipes: false,
            isShowingRecipe: false
        })
    }


    setRecipe(index){
        this.setState({
            isShowingGenres: false,
            isShowingRecipes: false,
            isShowingRecipe: true,
            recipesIndex: index
        })
    }


    setRecipeList(index){ 
        this.setState({
            isShowingGenres: false, 
            isShowingRecipes: true, 
            isShowingRecipe: false,
            genreIndex: index
        })
    }


    renderRecipeTitles(){
        return this.props.articles[this.state.genreIndex].recipes.map( (recipe, index) => (
            <div className='item-button-combo'>

                <List key={recipe.title} onClick={ () => this.setRecipe(index) }>
                    {recipe.title}
                </List> 
                <DeleteButton deleteType='delete-recipe' genreIndex={this.state.genreIndex} recipeIndex={index} />
            </div>
        ) )
    }


    renderRecipes(){
        console.log("rendering recipes")
        return (
        <div>

            <Form formType='adding-to-recipes' genreIndex={this.state.genreIndex} /> 
            <Button variant='contained' color='primary' onClick={ () => this.setGenreList()} >Back </Button>
            <Typography variant="headline" gutterBottom>
                    Recipes
                </Typography>
            { this.renderRecipeTitles() }
        </div>
        )
    }


    renderIngredients(){

        const ingredients = this.props.articles[this.state.genreIndex].recipes[this.state.recipesIndex].ingredients
        return ingredients.map( ingredient => 
        <div className='item-button-combo'> 
            <List> {ingredient} </List>
            <DeleteButton 
            deleteType='delete-ingredient' 
            genreIndex={this.state.genreIndex} 
            recipeIndex={this.state.recipesIndex} 
            ingredientTitle={ingredient} /> 
        </div>
    
    )
    }


    renderSteps(){
        const steps = this.props.articles[this.state.genreIndex].recipes[this.state.recipesIndex].steps
        return steps.map( step =>
            <div className='item-button-combo'>
            <List> {step} </List> 
            <DeleteButton 
            deleteType='delete-step' 
            genreIndex={this.state.genreIndex} 
            recipeIndex={this.state.recipesIndex} 
            stepTitle={step} />
            </div>
        )
        
    }


    renderRecipe(){
        console.log("rendering recipe")
         return(
            <div> 
                <Form formType='adding-to-ingredients' genreIndex={this.state.genreIndex} 
                recipeIndex={this.state.recipesIndex} />
                <Button variant='contained' color='primary' onClick={ () => this.setRecipeList(this.state.genreIndex)}> Back </Button>
                
                <Typography variant="headline" gutterBottom>
                    Ingredients
                </Typography>
                {this.renderIngredients()}

                <Form formType='adding-to-steps' genreIndex={this.state.genreIndex} 
                recipeIndex={this.state.recipesIndex} />
                <Typography variant="headline" gutterBottom>
                    Steps
                </Typography>
                {this.renderSteps() }
            </div>
        )
    }


    renderGenreList(){
        console.log("rendering genres")
        return this.props.articles.map(( article, index) =>( 
            <div className='item-button-combo'>
                <List key={article.genre}  onClick={ () => this.setRecipeList(index)}> 
                    {article.genre} 
                </List> 
                <DeleteButton deleteType='delete-genre' genreIndex={index}/>
            </div>
            ) )
    }

 
    determineListToRender(){
        if(this.state.isShowingGenres){
            return (
                <div>
                    <Form
                    formType='adding-to-genres'
                    />
                    <Typography variant="headline" gutterBottom>
                        Menu
                    </Typography>
                    {this.renderGenreList()}
                </div>
            )
        } else if (this.state.isShowingRecipes){
            return ( 
                    this.renderRecipes()
            )
        } else {
            return this.renderRecipe()
        }
    }


    render() {
        return ( 
            <ul>
                {this.determineListToRender()}
            </ul>
        )
    }
} 


const mapStateToProps = (state) => {  // takes application state as argument
    return { articles: state } 
} 

export default connect(mapStateToProps)(GenreList) 