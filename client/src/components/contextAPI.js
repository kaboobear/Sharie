import React from 'react'

import axios from 'axios'
import jwt_decode from "jwt-decode";
import notify from './notifications'

const Cont = React.createContext();
const Provider = Cont.Provider;
const Consumer = Cont.Consumer;

class MyProvider extends React.Component {
    constructor() {
        super();

        this.state = {
            posts: [],
            postForm: {
                name: ''
            },
            authInput: {
                login: '',
                mail: '',
                pass: '',
                pass2: ''
            },
            authErrors: {
                login: '',
                mail: '',
                pass: '',
                pass2: ''
            },
            authInfo: {
                isAuth: false,
                user: {}
            },

            handleChange: (e) => {
                const {name, value, type, checked} = e.target;
                type === "checkbox"
                    ? this.setState({
                        postForm: {
                            [name]: checked
                        }
                    })
                    : this.setState({
                        postForm: {
                            [name]: value
                        }
                    });
            },

            handleChange2: (e) => {
                const {name, value, type, checked} = e.target;
                type === "checkbox"
                    ? this.setState({
                        authInput: {
                            ...this.state.authInput,
                            [name]: checked
                        }
                    })
                    : this.setState({
                        authInput: {
                            ...this.state.authInput,
                            [name]: value
                        }
                    });
            },

            setAuth: (isAuth, user) => {
                this.setState({
                    authInfo: {
                        isAuth: isAuth,
                        user: user
                    }
                })
            },

            setAuthToken: (token) => {
                if (token) {
                    axios.defaults.headers.common["Authorization"] = token;
                } else {
                    delete axios.defaults.headers.common["Authorization"];
                }
            },

            setAuthErrors: (array) => {
                this.setState({
                    authErrors: {
                        login: array.login,
                        mail: array.mail,
                        pass: array.pass,
                        pass2: array.pass2
                    }
                })
            },

            setAuthInput: (login, mail, pass, pass2) => {
                this.setState({
                    authInput: {
                        login: login,
                        mail: mail,
                        pass: pass,
                        pass2: pass2
                    }
                })
            },

            setPostForm: (name) => {
                this.setState({
                    postForm: {
                        name: name
                    }
                })
            },


            logout: () => {
                localStorage.removeItem("jwtToken");
                this
                    .state
                    .setAuthToken(false);

                this.state.setAuth(false,{});

                console.log(this.state.authInfo);

                notify.notifyFive();
            },

            deletePost: (id) => {
                notify.notifyThree();
                axios.delete('http://localhost:5000/posts/' + id);

                this.setState(currentState => {
                    return {
                        posts: currentState
                            .posts
                            .filter((post) => (post._id !== id))
                    }
                })
            },

            addPost: () => {
                notify.notifyOne();

                const post = {
                    username: this.state.postForm.name
                }

                axios
                    .post('http://localhost:5000/posts/add/', post)
                    .then(res => {
                        this.setState((prevState) => {
                            return {
                                posts: prevState
                                    .posts
                                    .concat(res.data),
                                postForm: {
                                    name: ''
                                }
                            }
                        })
                    });
            },

            editPost: (id) => {
                notify.notifyTwo();

                const post = {
                    username: this.state.postForm.name
                }

                axios.post('http://localhost:5000/posts/update/' + id, post);

                this.setState((prevState) => {
                    return {
                        posts: prevState
                            .posts
                            .map(function (elem) {
                                if (id === elem._id) {
                                    var temp = elem;
                                    temp.username = prevState.postForm.name;
                                    return temp;
                                }

                                return elem;
                            }),
                        postForm: {
                            name: ''
                        }
                    }
                })

            }
        }
    }

    componentDidMount() {

        if (localStorage.jwtToken) {
            const token = localStorage.jwtToken;
            this
                .state
                .setAuthToken(token);
            const decoded = jwt_decode(token);
            this.state.setAuth(true,decoded);

            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                this.state.setAuth(false,{});
            }
        }

        axios
            .get('http://localhost:5000/posts/')
            .then(posts => {
                this.setState({posts: posts.data})
            })
    }







    render() {
        return (
            <Provider value={{
                state: this.state
            }}>
                {this.props.children}
            </Provider>
        )
    }

}

export {MyProvider}
export {Cont}
export default Consumer