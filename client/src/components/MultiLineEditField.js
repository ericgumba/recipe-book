import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'; 
import React, {Component} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';


// recipeCardsContainer -> recipe -> editCard -> multilineeditcard
class MultiLineEditField extends Component{

    constructor(props){
        super(props);
        this.state = {
            text: this.props.step
        };

    }

    handleChange(e){
        console.log(e.target.value);
        this.props.handleStepEdit(this.props.index,e.target.value);
        this.setState({text: e.target.value});
        
    }
    handleDelete = () => {

        this.props.handleDeleteStep(this.props.index);
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
                <Button size='small' variant="fab" color="primary" aria-label="add" type='submit' onClick={this.handleDelete}>
                    <DeleteIcon />
                </Button>
            
            </div>
        )
    }
}  


MultiLineEditField.propTypes = {
    step: PropTypes.string.isRequired
} 

export default MultiLineEditField;