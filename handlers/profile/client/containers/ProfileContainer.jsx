import React, { Component } from 'react';
import {hashHistory} from 'react-router';
import { Link } from 'react-router';
import {ProfileList} from '../components';

export default class ProfileContainer extends Component{

    constructor(props){
        super(props);

        this.state = {
            data: [],
            newData: {}
        };

        this.submit = this.submit.bind(this);
        this.setData = this.setData.bind(this);

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
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json()) // The json response to object literal
            .then(data => {
                this.setState({data: data})
            })
            .catch(err => console.error(err));

    }

    submit(){
        const newData = Object.assign({}, this.state.newData);

        fetch('/users/me',{
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(newData)
        }).then(response => response.json())
            .then(data => {
                // We go back to the newData list view
                hashHistory.push('profile/:userName');
            })
            .catch(err => console.error(err))
    }


    // We make sure to keep the state up-to-date to the latest input values
    setData(){
        const newData = {
            displayName: document.forms.form.displayName.value,
            profileName: document.forms.form.profileName.value,
            email: document.forms.form.email.value
        };

        this.setState({newData: newData});
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