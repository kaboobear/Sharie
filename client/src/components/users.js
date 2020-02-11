import React from 'react';

import MyContext from './contextAPI'

import {Cont} from './contextAPI'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import ApiUrl from '../constants';
import {Link} from 'react-router-dom'
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

    addFriend(user) {

        this
            .context
            .state
            .setFriends(this.context.state.friends.push(user));

        var currentUser = this.context.state.authInfo.user;
        currentUser
            .friendsArray
            .push(user._id);
        this
            .context
            .state
            .setUsers(this.context.state.users.map(elem => {
                if (elem._id === this.context.state.authInfo.user.id) {
                    elem
                        .friendsArray
                        .push(user._id);
                }
                return elem
            }))

        axios
            .post(ApiUrl + "/auth/update/" + this.context.state.authInfo.user.id, currentUser)
            .then(res => {
                var temp = user;
                temp.followers = temp.followers + 1;
                this
                    .context
                    .state
                    .setUsers(this.context.state.users.map(elem => {
                        if (elem._id === user._id) {
                            elem.followers = temp.followers
                        }
                        return elem
                    }))
                temp.notAuth = true;

                axios
                    .post(ApiUrl + "/auth/update/" + user._id, temp)
                    .then(res => {

                    })

                localStorage.removeItem("jwtToken");
                this
                    .context
                    .state
                    .setAuthToken(false);

                const {token} = res.data;

                localStorage.setItem("jwtToken", token);
                this
                    .context
                    .state
                    .setAuthToken(token);
            })
    }

    removeFriend(user) {
        axios
            .post(ApiUrl + '/auth/friends', this.context.state.authInfo.user.friendsArray)
            .then(res => {
                this
                    .context
                    .state
                    .setFriends(res.data);
            })

        var currentUser = this.context.state.authInfo.user;
        const index = currentUser
            .friendsArray
            .indexOf(user._id);
        if (index > -1) {
            currentUser
                .friendsArray
                .splice(index, 1);
        }

        this
            .context
            .state
            .setUsers(this.context.state.users.map(elem => {
                if (elem._id === this.context.state.authInfo.user.id) {
                    const index = elem
                        .friendsArray
                        .indexOf(user._id);
                    if (index > -1) {
                        elem
                            .friendsArray
                            .splice(index, 1);
                    }
                }
                return elem
            }))

        axios
            .post(ApiUrl + "/auth/update/" + this.context.state.authInfo.user.id, currentUser)
            .then(res => {
                var temp = user;
                temp.followers = temp.followers - 1;
                this
                    .context
                    .state
                    .setUsers(this.context.state.users.map(elem => {
                        if (elem._id === user._id) {
                            elem.followers = temp.followers
                        }
                        return elem
                    }))
                temp.notAuth = true;

                axios
                    .post(ApiUrl + "/auth/update/" + user._id, temp)
                    .then(res => {})

                localStorage.removeItem("jwtToken");
                this
                    .context
                    .state
                    .setAuthToken(false);

                const {token} = res.data;

                localStorage.setItem("jwtToken", token);
                this
                    .context
                    .state
                    .setAuthToken(token);

            })
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
                                    {(context.state.friends.length > 0)
                                        ? (
                                            <ul className="users-list">
                                                {context
                                                    .state
                                                    .friends
                                                    .map(user => (
                                                        <li key={user._id}>
                                                            <Link className="link" to={"/user/" + user._id}></Link>

                                                            <div className="user-img">
                                                                <img src="/img/photo.jpg" alt=""/>
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

                                                            <div
                                                                className="remove-friend-button"
                                                                onClick={() => {
                                                                this.removeFriend(user)
                                                            }}>
                                                                Unfollow
                                                            </div>
                                                        </li>
                                                    ))}
                                            </ul>
                                        )
                                        : (
                                            <div className="empty-title">List is empty</div>
                                        )
}

                                </div>

                                <div className="tabs-item">
                                    {(context.state.friends.length + 1 !== context.state.users.length)
                                        ? (
                                            <ul className="users-list">
                                                {context
                                                    .state
                                                    .users
                                                    .map(user => ((user._id !== context.state.authInfo.user.id && $.inArray(user._id, context.state.authInfo.user.friendsArray) === -1) && (
                                                        <li key={user._id}>
                                                            <Link className="link" to={"/user/" + user._id}></Link>

                                                            <div className="user-img">
                                                                <img src="/img/photo.jpg" alt=""/>
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

                                                            <div
                                                                className="add-friend-button"
                                                                onClick={() => {
                                                                this.addFriend(user)
                                                            }}>
                                                                Follow
                                                            </div>
                                                        </li>
                                                    )))}
                                            </ul>
                                        )
                                        : (
                                            <div className="empty-title">List is empty</div>
                                        )
}
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
