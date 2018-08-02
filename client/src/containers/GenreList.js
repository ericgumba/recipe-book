
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GenreButtons from "../components/GenreButtons";


class GenreList extends Component {

    constructor(){
        super()
    }

    render(){
        console.log("genre array");
        console.log(this.props.genres);
        return(
        <GenreButtons genres={this.props.genres} />
        )
        
        
    }
}

const mapDispatchToProps = dispatch => {

}

const mapStateToProps = state => {
    return { 
        genres: state.articles.map( article => { return article.genre; } ),
        username: state.username }

}

export default connect(mapStateToProps, mapDispatchToProps)(GenreList);