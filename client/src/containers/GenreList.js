
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GenreButtons from "../components/GenreButtons"; 
import RecipeCardsContainer from './RecipeCardsContainer';

// Container for GenreButtons and 

class GenreList extends Component {

    constructor(){
        super()

        this.state = { 
            showGenres: true,
            genreIndex: 0
        }
    }
 
 
    showRecipes(index){ 

        this.setState({showGenres: false, genreIndex: index});
        
    }

    handleBackButton(){
        this.setState({showGenres: true});
    }

    render(){
        console.log("genre array"); 

        const { showGenres } = this.state;
        const { articles } = this.props;  
        const genres = articles.map( article => { return article.genre } );
        return(
        <div className="genreRecipeDisplay">
        { showGenres ? <GenreButtons genres={ genres } 
        showRecipes={(index) => this.showRecipes(index)}
        /> 
        : 
        <RecipeCardsContainer recipes={articles[this.state.genreIndex].recipes}/>
 
        }
        </div>
        );
        
        
    }
} 

const mapDispatchToProps = dispatch => {

};

const mapStateToProps = state => {
    return { 
        articles: state.articles,
        username: state.username }

};

export default connect(mapStateToProps, mapDispatchToProps)(GenreList);