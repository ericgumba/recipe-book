import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { addGenre, addIngredient, addRecipe, addStep } from '../actions/index'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'; 

const mapStateToProps = (state) => {  // takes application state as argument
    return { articles: state.articles } // of type array of objects
} 

const mapDispatchToProps = dispatch => {
    return {
        addGenre: genre => dispatch(addGenre(genre)),
        addRecipe: recipe => dispatch(addRecipe(recipe)),
        addIngredient: ingredient => dispatch(addIngredient(ingredient)),
        addStep: step => dispatch(addStep(step))
    }
}

class Form extends Component { 
    constructor(props){
        super(props)
        this.state = {
            title: ''
        }
    }

    addToGenres(event){
        event.preventDefault()
        console.log("adding to genres supposedly")
        this.props.addGenre( this.state.title )

        this.setState({title: ''})
    }

    addToRecipes(event){
        event.preventDefault()
        console.log('yo, whatsup', this.props.genreIndex) 
        this.props.addRecipe({genre:this.props.articles[this.props.genreIndex].genre,
            title: this.state.title})
        

        this.setState({title: ''}) 
    }

    addToIngredients(event){

        event.preventDefault() 
        this.props.addIngredient(
            {
                genre: this.props.genreIndex,
                recipe: this.props.articles[this.props.genreIndex].recipes[this.props.recipeIndex].title,
                ingredientTitle: this.state.title
            })
        this.setState({title: ''})
    }
    
    addToSteps(event){

        event.preventDefault()

        this.props.addStep(
            {
                genreIndex: this.props.genreIndex,
                recipeTitle: this.props.articles[this.props.genreIndex].recipes[this.props.recipeIndex].title,
                stepTitle: this.state.title
            }
        )

        this.setState({title: ''})

    }


    handleChange(event){
        this.setState({ title: event.target.value })
    }

    handleSubmit(event){ 
        if(this.props.formType === 'adding-to-genres'){
            this.addToGenres(event)
        } else if ( this.props.formType === 'adding-to-recipes'){
            this.addToRecipes(event)
        } else if ( this.props.formType === 'adding-to-ingredients' ){
            this.addToIngredients(event)
        } else if ( this.props.formType === 'adding-to-steps'){
            this.addToSteps(event)
        } else {
            alert('bug')
        }
    } 

    render(){
        const { title } = this.state 
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div> 
                    <TextField
                    id="Add Item"
                    label="Add Item"
                    className='form-control'
                    value={title}
                    onChange={this.handleChange.bind(this)}
                    margin="normal"
                    />  
                    <Button size='small' variant="fab" color="primary" aria-label="add" type='submit'>
                        <AddIcon />
                    </Button>

                </div>
            </form>
        )
    }
 
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)