import React, { PureComponent } from 'react';
import {Link} from 'react-router';

export default class ProfileList extends PureComponent {

    render () {

        const{data} = this.props;
        console.log(data);
        return (

            <div className="profile ng-scope">
                <div className="profile__title">
                    <div className="profile__title-content">
                        <p className="profile__note">Управление аккаунтом</p>
                    </div>
                </div>
                <div className="profile__fields profile__fields_about">


                    <form className="profile-field profile-field_editable">
                       <div className="profile-field__group">
                            <div className="profile-field__lcell">
                                <div className="profile-field__name">
                                    <label htmlFor="displayName">Имя пользователя:</label>
                                </div>
                            </div>

                            <div className="profile-field__rcell">
                                <div className="profile-field__change">
                                    <div className="profile-field__change-content">
                                        <div className="profile-field__control text-input text-input_small">
                                            <div>
                                                <input type="text" id="displayName" className="text-input__control" value={data.displayName} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                       </div>

                        <div className="profile-field__group">
                            <div className="profile-field__lcell">
                                <div className="profile-field__name">
                                    <label htmlFor="profileName">Имя страницы профиля:</label>
                                </div>
                            </div>

                            <div className="profile-field__rcell">
                                <div className="profile-field__change">
                                    <div className="profile-field__change-content">
                                        <div className="profile-field__control text-input text-input_small">
                                            <div>
                                                <input type="text" id="profileName" className="text-input__control" value={data.profileName} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="profile-field__group">
                            <div className="profile-field__lcell">
                                <div className="profile-field__name">
                                    <label htmlFor="email">Email:</label>
                                </div>
                            </div>

                            <div className="profile-field__rcell">
                                <div className="profile-field__change">
                                    <div className="profile-field__change-content">
                                        <div className="profile-field__control text-input text-input_small">
                                            <div>
                                                <input type="text" id="email" className="text-input__control" value={data.email} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="profile-field__group">
                            <div className="profile-field__lcell">
                                <div className="profile-field__name">
                                    <label htmlFor="email">Изменить пароль:</label>
                                </div>
                            </div>
                        </div>

                        <div className="profile-field__ok-cancel">
                            <button type="submit" className="button button_action profile-field__save">
                                <span className="button__text">Сохранить</span>
                            </button>
                        </div>

                    </form>


                </div>
            </div>


        );

    }
}