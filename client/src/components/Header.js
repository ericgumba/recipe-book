import React, { Component } from 'react'
import AppBar from './AppBar'
import Popup from './Popup'
class Header extends Component {
    constructor(){
        super()
        this.state = { isShowingPopup: true, userName: '' }
    }

    setPopup(userName){
        this.setState({isShowingPopup: !this.state.isShowingPopup,
             })
    }        


    render(){
        const {isShowingPopup, userName} = this.state
        return( <div> 
                { isShowingPopup ? <AppBar nameDisplay={userName} openPopup={ () => this.setPopup() } /> : <Popup closePopup={() => this.setPopup()} />}
            </div>
            ) 
    }
}
export default Header