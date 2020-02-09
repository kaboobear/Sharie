import React from 'react';

import MyContext from './contextAPI'

import {Cont} from './contextAPI'
import {withRouter} from 'react-router-dom'
import $ from 'jquery'

class Users extends React.Component {

    componentDidMount() {
        $('.tabs-buttons')
            .on('click', 'li:not(.active)', function () {
                $(this)
                    .addClass('active')
                    .siblings()
                    .removeClass('active')
                    .parent()
                    .next('.tabs-items')
                    .find('.tabs-item')
                    .fadeOut(0)
                    .removeClass('active')
                    .eq($(this).index())
                    .fadeIn(0)
                    .addClass('active');
            });

    }

    render() {
        return (
            <MyContext>
                {(context) => (
                    <div className="users-section">

                        <div className="tabs">
                            <ul className="tabs-buttons">
                                <li className="active">Friends</li>
                                <li>World</li>
                            </ul>

                            <div className="tabs-items">
                                <div className="tabs-item active">
                                    <ul className="users-list">
                                        <li>
                                            <div className="user-img">
                                                <img src="img/photo.jpg" alt=""/>
                                            </div>

                                            <div className="user-info">
                                                <div className="user-nick">
                                                    Alla
                                                </div>
                                                <div className="user-val">
                                                    0 Posts
                                                </div>
                                                <div className="user-val">
                                                    0 Followers
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="tabs-item">
                                    <ul className="users-list">
                                        {context
                                            .state
                                            .users
                                            .map(user => (
                                                <li key={user._id}>
                                                    <div className="user-img">
                                                        <img src="img/photo.jpg" alt=""/>
                                                    </div>

                                                    <div className="user-info">
                                                        <div className="user-nick">
                                                            {user.login}
                                                        </div>
                                                        <div className="user-val">
                                                            {user.postsCount} Posts
                                                        </div>
                                                        <div className="user-val">
                                                            {user.followers} Followers
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </MyContext>
        );
    }
}

Users.contextType = Cont;
export default withRouter(Users);
