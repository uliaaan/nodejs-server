import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class Profile extends PureComponent {

    //this.props.children where we render the three children components
    render() {
        return (
        <div className="profile">
            <div className="profile__content">
                <div className="profile__tabs">
                    <div className="profile__tab ng-scope profile__tab_current">
                        <div className="profile__tab-content">
                            <ul>
                                <Link to="/profile/dennis">
                                <li className="profile__tab-link ng-binding">
                                    Публичный профиль
                                </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        {this.props.children}
        </div>

    );
    }

}


