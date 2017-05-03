import React from 'react';
import { Route, IndexRoute }  from 'react-router';
import { profile, profilePhoto, About} from './components';
import {ProfileContainer} from './containers';

export default (
    <Route component={profile} path='profile/dennis'>
        <IndexRoute component={ProfileContainer} />
        <Route path="add" component={ About } />
    </Route>
);