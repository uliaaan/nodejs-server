import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class Profile extends PureComponent {

    //this.props.children where we render the three children components
    render() {
        return (
        <div className="profile">
            <div className="profile__menu col-3" role="navigation">

                        <nav class="menu" data-pjax="">
                            <h3 class="menu-heading">
                                Personal settings
                            </h3>

                            <Link to="/profile/dennis">
                                <a href="/settings/profile" class="js-selected-navigation-item selected menu-item" data-selected-links="avatar_settings /settings/profile">Profile</a>
                            </Link>

                            <Link to="/profile/dennis/add">
                                <a href="/settings/admin" class="js-selected-navigation-item menu-item" data-selected-links=" /settings/admin">Account</a>
                            </Link>
                        </nav>

            </div>
        {this.props.children}
        </div>

    );
    }

}


