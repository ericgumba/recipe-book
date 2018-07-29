import React, { Component } from 'react'
import AppBar from './AppBar'
import Popup from './Popup'
import { connect } from 'react-redux' 
import {login, logout} from '../actions/index'

class Header extends Component {
    constructor(){
        super()
        this.state = {  
            username: ""
            }
    } 

    async loginUser(user, pass){
        const data = {username: user, password: pass}

        const response = await fetch("/login", {
            method: "POST",
            headers:{ "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })

        const body = await response.json()

        return body
    }

    async registerUser(newUser, newPassword){ 
        console.log(`async register user called ${newUser} and ${newPassword}`)

        const data = {username: newUser, password: newPassword}
        const response = await fetch("/newuser", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })

        const body = await response.json()

        return body
 
    }

    handleRegister(username, password){ 
        this.registerUser(username, password).then( res => { 
            if(res.msg === 'failure'){
                alert("ERROR, USERNAME OR PASSWORD ALREADY TAKEN")
            }  
        }).catch(err => {
            alert('ERROR, USERNAME OR PASSWORD ALREADY TAKEN')
            })

    }


    handleLogout(){

        this.props.logout();

        window.location.reload();

    } 

    render(){ 
        console.log("USER NAME IS::: " + this.props.username )
        return( <div>   
                <AppBar nameDisplay={this.props.username} 
                openPopup={(type) => this.setPopup(type)} 
                logout={ () => this.handleLogout() }
                handleLogin={ (username, password) => this.handleLogin( username, password )}
                handleRegister={ (username, password) => this.handleRegister( username, password ) }/>
                /> 
            </div>
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
        login: recipeBook => { return dispatch(login(recipeBook)) },
        logout: () => { return dispatch(logout()) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)