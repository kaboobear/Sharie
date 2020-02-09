import React from 'react';

import MyContext from './contextAPI'

import {Cont} from './contextAPI'
import {withRouter} from 'react-router-dom'
import {NavLink} from 'react-router-dom'




class Navbar extends React.Component {

    render() {
        return (
            <MyContext>
                {(context) => (
                    <div className="navbar-section">
                        <NavLink className="navbar-logo" to="/">
                            Sharie
                        </NavLink>

                        <ul className="navbar-list">
                            <li>
                                <NavLink exact to ='/'> <div className="navbar-list-img"><img src="img/home-ico.png" alt=""/></div> Home</NavLink>
                            </li>
                            <li>
                                <NavLink exact to ='/profile'><div className="navbar-list-img"><img src="img/user-ico.png" alt=""/></div>Profile</NavLink>
                            </li>
                            <li>
                                <NavLink exact to ='/settings'><div className="navbar-list-img"><img src="img/settings-ico.png" alt=""/></div>Settings</NavLink>
                            </li>
                            <li>
                                <NavLink exact to ='/about'><div className="navbar-list-img"><img src="img/book-ico.png" alt=""/></div>About</NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </MyContext>
        );
    }

}

Navbar.contextType = Cont;
export default withRouter(Navbar);
