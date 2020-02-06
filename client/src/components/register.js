import React from 'react';

import axios from 'axios'
import notify from "./notifications";

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

        console.log(register);

        axios
            .post("http://localhost:5000/auth/register/", register)
            .then(res => {
                this
                    .context
                    .state
                    .setAuthInput('', this.context.state.authInput.mail, this.context.state.authInput.pass, '');

                this
                    .context
                    .state
                    .setAuthErrors({login: '', mail: '', pass: '', pass2: ''});

                notify.notifySix();

                this
                    .props
                    .history
                    .push('/login');
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
                            <div className="page-title">Register</div>

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
                                            onChange={context.state.handleChange2}/>{this.context.state.authErrors.login && (
                                            <span className="error-message">
                                                {this.context.state.authErrors.login}
                                            </span>
                                        )}
                                    </div>

                                    <div className="simple-input">
                                        <input
                                            type="text"
                                            name="mail"
                                            placeholder="E-mail"
                                            value={context.state.authInput.mail}
                                            onChange={context.state.handleChange2}/>{this.context.state.authErrors.mail && (
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
                                            onChange={context.state.handleChange2}/>{this.context.state.authErrors.pass && (
                                            <span className="error-message">
                                                {this.context.state.authErrors.pass}
                                            </span>
                                        )}
                                    </div>

                                    <div className="simple-input">
                                        <input
                                            type="password"
                                            name="pass2"
                                            placeholder="Password Again"
                                            value={context.state.authInput.pass2}
                                            onChange={context.state.handleChange2}/>{this.context.state.authErrors.pass2 && (
                                            <span className="error-message">
                                                {this.context.state.authErrors.pass2}
                                            </span>
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