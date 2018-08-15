import React, { Component } from 'react'  
import { connect } from 'react-redux' 
import { addGenre, addIngredient, addRecipe, addStep } from '../actions/index';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';  
import {login, logout} from '../actions/index';

class Popup extends Component {  

    constructor(){
        super()
        this.state = {username: '', password: ''}
    }


    async loginUser(){
        const data = {username: this.state.username, password: this.state.password}

        const response = await fetch("/login", {
            method: "POST",
            headers:{ "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })

        const body = await response.json();

        return body;
    }

    handleLogin(){
        console.log("handle login called ... ") 
        this.loginUser().then( res => { 

            if (res.msg === 'failure'){
                alert("ERROR! USERNAME OR PASSWORD INCORRECT") 
            } else{
                console.log(` Here is the value of the response:  ${res.username}`);

                this.props.login({recipeBook:res.recipeBook, username:res.username});
            }
        }).catch( err => { 
                alert('ERROR, LOGIN CREDENTIALS INVALID'); 
            }) 
    }  
    async registerUser(){   

        const data = {username: this.state.username, password: this.state.password};
        const response = await fetch("/newuser", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        const body = await response.json();

        return body; 
 
    }

    handleRegister(){ 
        this.registerUser().then( res => { 
            if(res.msg === 'failure'){
                alert("ERROR, USERNAME OR PASSWORD ALREADY TAKEN")
            }  else {
                this.props.login({recipeBook:res.recipeBook, username: res.username})
            }
        }).catch(err => {
            alert('ERROR, USERNAME OR PASSWORD ALREADY TAKEN')
            })

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


        const {popupType} = this.props

        console.log(` here is popup type ${this.props.popupType}`)

        if (popupType === "login"){
            this.handleLogin()  
        } else{
            this.handleRegister()
        }

        this.props.closePopup()
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


const mapStateToProps = (state) => {
    return { 
        articles: state.articles,
        username: state.username }
}

const mapDispatchToProps = (dispatch) => { // accepts redux's dispatch function.
    return{
        login: recipeBook => { return dispatch(login(recipeBook)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup)