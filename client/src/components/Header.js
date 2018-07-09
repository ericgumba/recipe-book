import React, { Component } from 'react'
import AppBar from './AppBar'
import Popup from './Popup'
class Header extends Component {
    constructor(){
        super()
        this.state = { isShowingPopup: true, userName: '' }
    }

    setPopup(user){

        console.log(user)
        this.setState(
            {isShowingPopup: !this.state.isShowingPopup,
                userName: user
             })
    }        


    render(){
        const {isShowingPopup, userName} = this.state
        return( <div> 
                { isShowingPopup ? <AppBar nameDisplay={userName} openPopup={ (user) => this.setPopup(user) } /> : <Popup closePopup={(user) => this.setPopup(user)} />}
            </div>
            ) 
    }
}
export default Header