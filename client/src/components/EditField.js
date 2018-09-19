import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
 import DeleteIcon from '@material-ui/icons/Delete';

import React, {Component} from 'react';
import { login, logout, showGenre, showRecipe, removeRecipe, addImage } from "../actions/index";
import { connect } from 'react-redux';

// recipeCardsContainer -> recipe -> editCard -> multilineeditcard
class EditField extends Component{

    constructor(props){
        super(props);
        this.state = {
            text: this.props.ingredient
        };

    }

    handleChange(e){
        console.log(e.target.value);
        this.props.handleIngredientEdit(this.props.index, e.target.value);
        this.setState({text: e.target.value}); 
    }

    handleDelete = () => {

        this.props.handleDeleteIngredient(this.props.index);
    }

    render(){
        return (
            <div>
                <TextField
                id="Add Item"
                label="Add Item"
                className='form-control'
                multiline
                value={this.state.text}
                onChange={this.handleChange.bind(this)}
                margin="normal"
                />  
                <Button size='small' variant="fab" color="primary" aria-label="add" type='submit' onClick={ this.handleDelete  }>
                    <DeleteIcon />
                </Button>
 
            </div>
        )
    }
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
         addImage: image => {return dispatch(addImage(image))} 
     }
 };
 export default connect(mapStateToProps, mapDispatchToProps)(EditField);