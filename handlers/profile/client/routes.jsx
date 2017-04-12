import React from 'react';
import { Route, IndexRoute }  from 'react-router';
import profilePhoto from './components/profilePhoto';


export default (
    <Route component={profilePhoto} path='profile/dennis'>
        <IndexRoute component={profilePhoto} />
    </Route>
);