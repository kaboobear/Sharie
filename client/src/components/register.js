import React from 'react';

import axios from 'axios'
import notify from "./notifications";
import ApiUrl from '../constants';

import MyContext from './contextAPI'
import {Cont} from './contextAPI'
import {withRouter} from 'react-router-dom'

class Register extends React.Component {

    register(e) {
        e.preventDefault();

        var register = {
            login: this.context.state.authInput.login,
            mail: this.context.state.authInput.mail,
            pass: this.context.state.authInput.pass,
            pass2: this.context.state.authInput.pass2
        }

        axios
            .post(ApiUrl + "/auth/register/", register)
            .then(res => {
                notify.notifySix();

                this
                    .context
                    .state
                    .setAuthInput('', this.context.state.authInput.mail, this.context.state.authInput.pass, '');

                this
                    .context
                    .state
                    .setAuthErrors({login: '', mail: '', pass: '', pass2: ''});

                axios
                    .get(ApiUrl + '/auth/')
                    .then(users => {
                        this
                            .context
                            .state
                            .setUsers(users.data);

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
                    <div className="register-section">
                        <div className="flex-wrap center">
                            <form
                                onSubmit={(e) => {
                                this.register(e)
                            }}
                                className="add-form"
                                autoComplete="off">
                                <div className="simple-input">
                                    <input
                                        type="text"
                                        name="login"
                                        placeholder="Login"
                                        value={context.state.authInput.login}
                                        onChange={context.state.handleChange2}
                                        className={this.context.state.authErrors.login && "error"}/> {this.context.state.authErrors.login && (
                                        <div className="exclam">
                                            <img src="img/exclam-ico.png" alt=""/>
                                        </div>
                                    )}
                                </div>

                                <div className="simple-input">
                                    <input
                                        type="text"
                                        name="mail"
                                        placeholder="E-mail"
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
                                        value={context.state.authInput.pass}
                                        onChange={context.state.handleChange2}
                                        className={this.context.state.authErrors.pass && "error"}/> {this.context.state.authErrors.pass && (
                                        <div className="exclam">
                                            <img src="img/exclam-ico.png" alt=""/>
                                        </div>
                                    )}
                                </div>

                                <div className="simple-input">
                                    <input
                                        type="password"
                                        name="pass2"
                                        placeholder="Password Again"
                                        value={context.state.authInput.pass2}
                                        onChange={context.state.handleChange2}
                                        className={this.context.state.authErrors.pass2 && "error"}/> {this.context.state.authErrors.pass2 && (
                                        <div className="exclam">
                                            <img src="img/exclam-ico.png" alt=""/>
                                        </div>
                                    )}
                                </div>

                                <button type="submit" className="btn">Sign Up</button>
                            </form>
                        </div>
                    </div>
                )}
            </MyContext>
        );
    }
}

Register.contextType = Cont
export default withRouter(Register);