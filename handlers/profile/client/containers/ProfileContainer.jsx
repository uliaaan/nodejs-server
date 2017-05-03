import React, { Component } from 'react';
import { Link } from 'react-router';
import {profileList} from '../components'

export default class ProfileContainer extends Component{

    constructor(props){
        super(props);

        this.state = {
            publicProfile: []
        };


    }

    // Once the component mounted it fetches the data from the server
    componentDidMount(){
        this.getPublicProfile();
    }

    getPublicProfile(){
        fetch('http://javascript.in/users/me', {
            headers: new Headers({'Content-Type': 'application/json'})
        }).then(response => response.json()) // The json response to object literal
            .then(data => this.setState({publicProfile: data}))
            .catch(err => console.error(err));

    }


    render(){

        const {publicProfile}  = this.state;

        return (
            <profileList publicProfileData={publicProfile} />
        );
    }
}