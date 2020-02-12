import React from 'react';

import MyContext from './contextAPI'

import axios from 'axios'
import jwt_decode from "jwt-decode";
import notify from "./notifications";
import ApiUrl from '../constants';
import {Cont} from './contextAPI'
import {withRouter} from 'react-router-dom'

class Login extends React.Component {
    login(e) {
        e.preventDefault();

        var loginData = {
            mail: this.context.state.authInput.mail,
            pass: this.context.state.authInput.pass
        }

        axios
            .post(ApiUrl + "/auth/login/", loginData)
            .then(res => {
                notify.notifyFour();

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

                const decoded = jwt_decode(token);

                this
                    .context
                    .state
                    .setAuth(true, decoded);


                axios
                    .post(ApiUrl + '/auth/friends', decoded.friendsArray)
                    .then(res => {
                        console.log(res.data);
                        console.log("xx");

                        this.context
                            .state
                            .setFriends(res.data);

                        this
                            .context
                            .state
                            .setAuthInput('', '', '', '');

                        this
                            .context
                            .state
                            .setAuthErrors({login: '', mail: '', pass: '', pass2: ''});

                        this
                            .props
                            .history
                            .push('/');
                    })

            })
            .catch(err => {
                this
                    .context
                    .state
                    .setAuthErrors(err.response.data);
            });
    }

    componentWillUnmount() {
        this
            .context
            .state
            .setAuthErrors({login: '', mail: '', pass: '', pass2: ''});
    }

    render() {
        return (
            <MyContext>
                {(context) => (
                    <div className="login-section">
                        <div className="flex-wrap center">
                            <form
                                onSubmit={(e) => {
                                this.login(e)
                            }}
                                className="add-form"
                                autoComplete="off">
                                <div className="simple-input">
                                    <input
                                        type="text"
                                        name="mail"
                                        placeholder="Mail"
                                        value={context.state.authInput.mail}
                                        onChange={context.state.handleChange2}
                                        className={this.context.state.authErrors.mail && "error"}/> {this.context.state.authErrors.mail && (
                                        <div className="exclam">
                                            <img src="img/exclam-ico.png" alt=""/>
                                        </div>
                                    )}
                                </div>

                                <div className="simple-input">
                                    <input
                                        type="password"
                                        name="pass"
                                        placeholder="Password"
                                        className={this.context.state.authErrors.pass && "error"}
                                        value={context.state.authInput.pass}
                                        onChange={context.state.handleChange2}/> {this.context.state.authErrors.pass && (
                                        <div className="exclam">
                                            <img src="img/exclam-ico.png" alt=""/>
                                        </div>
                                    )}

                                    {/* {this.context.state.authErrors.pass && (
                                        <span className="error-message">
                                            {this.context.state.authErrors.pass}
                                        </span>
                                        )} */}
                                </div>

                                <button type="submit" className="btn">Sign In</button>

                            </form>
                        </div>
                    </div>
                )}
            </MyContext>
        );
    }

}

Login.contextType = Cont;
export default withRouter(Login);
