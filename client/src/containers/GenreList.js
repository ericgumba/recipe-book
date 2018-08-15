
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GenreButtons from "../components/GenreButtons"; 
import RecipeCardsContainer from './RecipeCardsContainer';
import Form from "../components/Form"
import { login, logout, showGenre, showRecipe } from "../actions/index"

// Container for GenreButtons AND (?) recipe

class GenreList extends Component {

    constructor(props){
        super(props) 

        this.state = { 
            showGenres: this.props.showGenres,
            genreIndex: 0
        }
    }

    componentWillUpdate(){
        
    }
 
    showRecipes(index){ 
        this.props.showRecipe(index);
        this.setState({showGenres: false, genreIndex: index});
        
    } 
    render(){ 
        const { showGenres, articles, genreIndex } = this.props;   
        const genres = articles.map( article => { return article.genre } );
        return(
        <div className="genreRecipeDisplay">
        { showGenres ? 
        <div>
            <Form formType={"adding-to-genres"} />
            <GenreButtons genres={ genres } 
            showRecipes={(index) => this.showRecipes(index)}
        /> 
        </div>
        : 
        <div>
            <Form formType={"adding-to-recipes"} genreIndex={this.state.genreIndex}/>
            <RecipeCardsContainer recipes={articles[this.state.genreIndex].recipes} genreIndex={this.state.genreIndex}/> 
        </div>
        }
        </div>
        );
        
        
    }
} 
 


const mapDispatchToProps = (dispatch) => { // accepts redux's dispatch function.
    return{
        login: recipeBook => { return dispatch(login(recipeBook)) },
        logout: () => { return dispatch(logout()) },
        showGenre: () => {return dispatch(showGenre() )},
        showRecipe: (index) => { return dispatch( showRecipe(index)) }
    };
}

const mapStateToProps = state => {
    return { 
        articles: state.articles,
        username: state.username,
        showGenres: state.showGenres,
        showRecipes: state.showRecipes,
        genreIndex: state.genreIndex
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(GenreList);