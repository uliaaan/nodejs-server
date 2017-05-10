import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class Profile extends PureComponent {

    //this.props.children where we render the three children components
    render() {
        return (
        <div className="profile clearfix">
            <div className="profile__menu" role="navigation">

                        <nav className="profile__menu-list" >
                            <h5 className="profile__menu-heading">
                                Personal settings
                            </h5>

                            <Link to="/profile/dennis" className="profile__menu-item">
                                Profile
                            </Link>

                            <Link to="/profile/dennis/add" className="profile__menu-item">
                                Account
                            </Link>
                        </nav>
            </div>

            <div className="profile__content">
                {this.props.children}
            </div>
        </div>

    );
    }

}


