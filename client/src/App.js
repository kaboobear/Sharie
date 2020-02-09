import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

import Login from './components/login';
import Register from './components/register';
import Posts from './components/posts';
import Navbar from './components/navbar';
import Users from './components/users';

import {MyProvider} from './components/contextAPI';
import {Cont} from './components/contextAPI';
import MyContext from './components/contextAPI';
import $ from 'jquery';

import {BrowserRouter as Router, NavLink, Route, Redirect} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

class App extends React.Component {

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
            <Router>
                <MyProvider>
                    <MyContext>
                        {(context) => (
                            <div className="wrapper">
                                <div className="content-section">
                                    <div className="container">
                                        {(context.state.authInfo.isAuth)
                                            ? (
                                                <div className="flex-wrap">
                                                    <Navbar/>

                                                    <div className="main-section">
                                                        <Route path="/" exact component={Posts}/>
                                                    </div>

                                                    <Users/>
                                                </div>
                                            )
                                            : (
                                                <div className="auth-section">
                                                    <div className="tabs">
                                                        <NavLink className="auth-logo" to="/">
                                                            Sharie
                                                        </NavLink>

                                                        <ul className="tabs-buttons">
                                                            <NavLink exact to="/">Login</NavLink>
                                                            <NavLink exact to="/register">Registration</NavLink>
                                                        </ul>

                                                        <div className="tabs-items">
                                                            <Route path="/" exact component={Login}/>
                                                            <Route path="/register" exact component={Register}/>
                                                        </div>
                                                    </div>
                                                </div>

                                            )
}
                                    </div>
                                </div>

                                <ToastContainer containerId={'one'}/>
                            </div>
                        )}
                    </MyContext>
                </MyProvider>
            </Router>
        );
    }
}

App.contextType = Cont
export default App;
