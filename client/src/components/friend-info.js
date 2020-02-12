import React from 'react';

import MyContext from './contextAPI'
import notify from "./notifications";

import {Cont} from './contextAPI'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import $ from 'jquery'
import ApiUrl from '../constants';

class FriendInfo extends React.Component {

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
                    <div className="current-user friend">
                        <div className="current-user-img">
                            <img src="/img/photo.jpg" alt=""/>
                        </div>

                        <div className="current-user-info">
                            <div className="current-user-name">
                                {this.props.friend.login}
                            </div>

                            <div className="current-user-posts current-user-val">
                                {this.props.friend.postsCount} Posts
                            </div>

                            <div className="current-user-followers current-user-val">
                                {this.props.friend.followers} Followers
                            </div>
                        </div>

                        {(($.inArray(this.props.friend._id, context.state.authInfo.user.friendsArray)) === -1)
                            ? (
                                <div
                                    className="add-friend-button big btn"
                                    onClick={() => {
                                    this.addFriend(this.props.friend)
                                }}>
                                    Follow
                                </div>
                            )
                            : (
                                <div
                                    className="remove-friend-button big btn"
                                    onClick={() => {
                                    this.removeFriend(this.props.friend)
                                }}>
                                    Unfollow
                                </div>
                            )
}
                    </div>
                )}
            </MyContext>
        )
    }

}

FriendInfo.contextType = Cont;
export default withRouter(FriendInfo);
