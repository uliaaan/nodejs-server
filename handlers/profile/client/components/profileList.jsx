import React, {PureComponent} from 'react';
import {Link} from 'react-router';
import profilePublic from './profilePublic.jsx';

export default class profileList extends PureComponent{

    render(){

        const {publicProfileData} = this.props;

        console.log(publicProfileData);

        return(
            <div>
                {publicProfileData
                    .filter(data => data.displayName.toLowerCase())
                    .map((data, i)=>{
                        return(
                            <profilePublic {...data} />

                        );

                    })

                }

            </div>

        );
    }











}