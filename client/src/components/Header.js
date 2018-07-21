import React, { Component } from 'react'
import AppBar from './AppBar'
import Popup from './Popup'
import { connect } from 'react-redux' 
import {login} from '../actions/index'

class Header extends Component {
    constructor(){
        super()
        this.state = { 
            isShowingPopup: false,
            popupType: "",
            username: ""
            }
    }
 

    setPopup(type){ 
        this.setState(
            {
                isShowingPopup: !this.state.isShowingPopup,
                popupType: type
             })
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

        // todo: add message or warning about invalid login 
    }

    handleRegister(username, password){ // 
        // todo uncomment once we determins this is safe
        this.registerUser(username, password).then( res => { 
            if(res.msg === 'failure'){
                alert("ERROR, USERNAME OR PASSWORD ALREADY TAKEN")
            } 
            this.setPopup("register")
        }).catch(err => {
            alert('ERROR, USERNAME OR PASSWORD ALREADY TAKEN')
            })

    }

    handleLogin(username, password){
        console.log("handle login called ... ") 
        this.loginUser(username, password).then( res => { 

            if (res.msg === 'failure'){
                alert("ERROR! USERNAME OR PASSWORD INCORRECT")
                this.setPopup("login")  
            } else{
                console.log(` Here is the value of the response:  ${res.username}`)  

                this.props.login(res.recipeBook)
                this.setPopup("login")  
            }
        }).catch( err => {
                console.log(   `error this username or password doesn't exist, ${err}` )
                alert('ERROR, LOGIN CREDENTIALS INVALID')
                this.setPopup("login")  
            }) 
    }

    render(){
        const {isShowingPopup, username} = this.state
        return( <div> 
                { !isShowingPopup ? <AppBar nameDisplay={username} 
                openPopup={(type) => this.setPopup(type)} /> : 
                <Popup 
                popupType={this.state.popupType} 
                handleLogin={ (username, password) => this.handleLogin( username, password )}
                handleRegister={ (username, password) => this.handleRegister( username, password ) }/>}
            </div>
            ) 
    }
}

const mapStateToProps = (state) => {
    return { 
        articles: state.articles,
        userName: state.userName }
}

const mapDispatchToProps = (dispatch) => { // accepts redux's dispatch function.
    return{
        login: recipeBook => { return dispatch(login(recipeBook)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)