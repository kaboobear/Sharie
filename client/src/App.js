import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from './components/header';
import Login from './components/login';
import Register from './components/register';
import Posts from './components/posts';
import PostAdd from './components/post-add';
import PostEdit from './components/post-edit';

import {MyProvider} from './components/contextAPI'
import {Cont} from './components/contextAPI'
import MyContext from './components/contextAPI'

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';

class App extends React.Component {
    render() {
        return (
            <Router>
                <MyProvider>
                    <MyContext>
                        {(context) => (
                            <div className="wrapper">
                                <Header/>



                                <div className="content-section">
                                    <Route path="/" exact component={Posts}/>

                                    <Route path="/posts/add" exact component={PostAdd}/>

                                    <Route path="/posts/edit/:id" exact component={PostEdit}/>

                                    <Route
                                        path="/login"
                                        exact
                                        render={props => {
                                        return (context.state.authInfo.isAuth !== true)
                                            ? <Login/>
                                            : <Redirect to="/"/>
                                    }}/>

                                    <Route
                                        path="/register"
                                        exact
                                        render={props => {
                                        return (context.state.authInfo.isAuth !== true)
                                            ? <Register/>
                                            : <Redirect to="/"/>
                                    }}/>
                                </div>



                                <ToastContainer enableMultiContainer containerId={'one'}/>
                                <ToastContainer enableMultiContainer containerId={'one'}/>
                                <ToastContainer enableMultiContainer containerId={'one'}/>
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
