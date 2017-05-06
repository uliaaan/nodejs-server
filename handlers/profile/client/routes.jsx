import React from 'react';
import { Route, IndexRoute }  from 'react-router';
import { Profile } from './components';
import { ProfileContainer} from './containers';

export default (
    <Route component={Profile} path='profile/:userName'>
        <IndexRoute component={ProfileContainer} />
    </Route>
);
