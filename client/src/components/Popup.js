import React, { Component } from 'react'  
import { connect } from 'react-redux' 
import { addGenre, addIngredient, addRecipe, addStep } from '../actions/index'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'; 

class Popup extends Component {  

    constructor(){
        super()
        this.state = {username: '', password: ''}
    }

    handleUsernameChange(e){
        this.setState({username: e.target.value})
    }
    handlePasswordChange(e){
        this.setState({password: e.target.value})
    }
    handleSubmit(e){
        e.preventDefault()
        console.log(e.target.value)
        this.props.closePopup(this.state.username) 
    }

    render(){
        const {username, password} = this.state
        return(  
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div> 
                <TextField
                id="username"
                label="username"
                className='form-control'
                value={username}
                onChange={this.handleUsernameChange.bind(this)}
                margin="normal"
                />  
                <TextField
                id="Password"
                label="Password"
                className='form-control'
                value={password}
                onChange={this.handlePasswordChange.bind(this)}
                margin="normal"
                />  
                <Button size='small' variant="fab" color="primary" aria-label="add" type='submit'>
                    Submit
                </Button> 
            </div>
        </form>
            ) 
    }
}
export default Popup