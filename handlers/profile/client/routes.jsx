import React from 'react';
import { Route, IndexRoute }  from 'react-router';
import { profile, profilePhoto} from './components';
import {ProfileContainer} from './containers';

export default (
    <Route component={profile} path='profile/dennis'>
        <IndexRoute component={ProfileContainer} />
    </Route>
);