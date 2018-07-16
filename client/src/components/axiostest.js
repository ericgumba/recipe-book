import React, { Component } from 'react'
import axios from 'axios'

// get user data from database
class AxiosTest extends Component {
    constructor(){
        super()
        this.state = {
            username: ''

        }
    }

    componentDidMount(){
        retrieveUserData().then(res => { 
            this.setState({username: res.username }) } ).catch( err => {
                console.log(err)}
            )
    }

    async retrieveUserData(){
        const response = await axios.get('/')

        const body =  await response.json()
        console.log(body)

        return body

    }
}

export default AxiosTest