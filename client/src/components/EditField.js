import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'; 
import React from 'react';
export const EditField = (props) => {
    return (
    <div>
    <TextField
    id="Add Item"
    label="Add Item"
    className='form-control'
    value={props.ingredient}
    onChange={ () => alert("this")}
    margin="normal"
    />  
    <Button size='small' variant="fab" color="primary" aria-label="add" type='submit'>
        <AddIcon />
    </Button>

    </div>
    )
}


EditField.propTypes = {
    ingredient: PropTypes.string.isRequired
} 