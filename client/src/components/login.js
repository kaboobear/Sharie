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

                notify.notifyFour();

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
            .catch(err => {
                this
                    .context
                    .state
                    .setAuthErrors(err.response.data);
            });

    }



    render() {
        return (
            <MyContext>
                {(context) => (
                        <div className="container">
                            <div className="page-title">Login</div>

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
                                            onChange={context.state.handleChange2}/> {this.context.state.authErrors.mail && (
                                            <span className="error-message">
                                                {this.context.state.authErrors.mail}
                                            </span>
                                        )}
                                    </div>

                                    <div className="simple-input">
                                        <input
                                            type="password"
                                            name="pass"
                                            placeholder="Password"
                                            value={context.state.authInput.pass}
                                            onChange={context.state.handleChange2}/> {this.context.state.authErrors.pass && (
                                            <span className="error-message">
                                                {this.context.state.authErrors.pass}
                                            </span>
                                        )}
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
