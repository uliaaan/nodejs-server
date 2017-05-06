import React, { PureComponent } from 'react';
import {Link} from 'react-router';

export default class About extends PureComponent {

    render () {

        const{data} = this.props;
        console.log(data);
        return (

            <div className="profile ng-scope">
                <div className="profile__title">
                    <div className="profile__title-content">
                        <p className="profile__note">Информация о вас, которая будет видна другим посетителям.</p>
                    </div>
                </div>
                <div className="profile__fields profile__fields_about">
                    <form name="form" className="profile-field profile-field_editable ng-pristine ng-valid ng-isolate-scope">

                        <div className="profile-field__lcell">
                            <div className="profile-field__name ng-binding">Имя:</div>
                        </div>

                        <div className="profile-field__rcell">
                            <div className="profile-field__value ng-binding">
                                Dennis Samsonov
                            </div>

                            <div className="profile-field__change ng-hide">
                                <div className="profile-field__change-content">
                                    <div className="profile-field__control text-input text-input_small">
                                        <div>
                                            <input placeholder="Иван Иванович" type="text" name="input"
                                                   className="text-input__control ng-pristine ng-untouched ng-valid ng-scope ng-isolate-scope ng-empty"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-field__ok-cancel">
                                    <button type="submit" className="button button_action profile-field__save">
                                        <span className="button__text">Сохранить</span>
                                    </button>
                                    <button type="button" className="profile-field__cancel">Отмена</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


        );

    }
}