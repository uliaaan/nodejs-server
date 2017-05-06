import React, { Component } from 'react';
import { Link } from 'react-router';
import {ProfileList} from '../components';

export default class ProfileContainer extends Component{

    constructor(props){
        super(props);

        this.state = {
            data: []
        };


    }

    // Once the component mounted it fetches the data from the server
    componentDidMount(){
        this.getPublicProfile();
    }

    getPublicProfile(){
        fetch('http://javascript.in/users/me', {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            credentials: 'include'
        }).then(response => response.json()) // The json response to object literal
            .then(data => {
                this.setState({data: data})
            })
            .catch(err => console.error(err));

    }


    render(){

        const {data}  = this.state;

        return (
            <div>
                <ProfileList data={data}></ProfileList>

            </div>
        );
    }
}