import React from 'react';

import {Link, NavLink} from 'react-router-dom'
import MyContext from './contextAPI'

class Header extends React.Component {
    render() {
        return (
            <MyContext>
                {(context) => (
                    <div className="header-section">
                        <div className="container">
                            <div className="flex-wrap">
                                <Link to="/" className="header-logo">React Test</Link>

                                <div className="header-user-block">
                                    {context.state.authInfo.isAuth
                                        ? (
                                            <div className="unauth">
                                                <div className="user-title">
                                                    {context.state.authInfo.user.login}
                                                </div>
                                                <div onClick={context.state.logout} className="logout-btn btn">Logout</div>
                                            </div>
                                        )
                                        : (
                                            <div className="unauth">
                                                <NavLink to="/login">Login</NavLink>
                                                <NavLink to="/register">Register</NavLink>
                                            </div>
                                        )}

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </MyContext>
        );
    }
}

export default Header;
