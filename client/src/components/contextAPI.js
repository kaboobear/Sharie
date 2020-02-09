import React from 'react'

import axios from 'axios'
import jwt_decode from "jwt-decode";
import notify from './notifications';
import ApiUrl from '../constants';

const Cont = React.createContext();
const Provider = Cont.Provider;
const Consumer = Cont.Consumer;

class MyProvider extends React.Component {
    constructor() {
        super();

        this.state = {
            posts: [],
            users: [],
            postForm: {
                postText: ''
            },
            postErrors: {
                postText: ''
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

            setLoaded: (bool) => {
                this.setState({isLoaded: bool})
            },

            setAuth: (isAuth, user) => {
                this.setState({
                    authInfo: {
                        isAuth: isAuth,
                        user: user
                    }
                })
            },

            setAuthUser: (user) => {
                this.setState({
                    authInfo: {
                        ...this.state.authInfo,
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

            setPostErrors: (error) => {
                this.setState({
                    postErrors: {
                        postText: error
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

            setPostForm: (postText) => {
                this.setState({
                    postForm: {
                        postText: postText
                    }
                })
            },

            setUsers: (usersArr) => {
                this.setState({
                    ...this.state,
                    users: usersArr
                })
            },

            setPosts: (posts) => {
                this.setState({
                    ...this.state,
                    posts: posts
                })
            },

            logout: () => {
                localStorage.removeItem("jwtToken");
                this
                    .state
                    .setAuthToken(false);

                this
                    .state
                    .setAuth(false, {});

                notify.notifyFive();
            },

            deletePost: (id) => {
                notify.notifyThree();
                axios
                    .delete(ApiUrl + '/posts/' + id)
                    .then(res => {
                        var authInfo = {
                            id: this.state.authInfo.user.id,
                            login: this.state.authInfo.user.login,
                            mail: this.state.authInfo.user.mail,
                            pass: this.state.authInfo.user.pass,
                            followers: this.state.authInfo.user.followers,
                            postsCount: this.state.authInfo.user.postsCount - 1
                        }

                        axios
                            .post(ApiUrl + '/auth/update/' + this.state.authInfo.user.id, authInfo)
                            .then(res => {
                                var temp = this.state.authInfo.user;
                                temp.postsCount = temp.postsCount - 1;
                                this
                                    .state
                                    .setAuthUser(temp);

                                localStorage.removeItem("jwtToken");
                                this
                                    .state
                                    .setAuthToken(false);

                                const {token} = res.data;

                                localStorage.setItem("jwtToken", token);
                                this
                                    .state
                                    .setAuthToken(token);

                                this
                                    .state
                                    .setUsers(this.state.users.map(elem => {
                                        if (elem._id === this.state.authInfo.user.id) {
                                            elem.postsCount = elem.postsCount - 1;
                                        }
                                        return elem;
                                    }))

                                this.setState(currentState => {
                                    return {
                                        posts: currentState
                                            .posts
                                            .filter((post) => (post._id !== id))
                                    }
                                })

                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
            },

            addPost: () => {
                notify.notifyOne();

                const post = {
                    authorId: this.state.authInfo.user.id,
                    postText: this.state.postForm.postText,
                    postShared: 0,
                    postLikes: 0,
                    postShares: 0
                }

                axios
                    .post(ApiUrl + '/posts/add/', post)
                    .then(res => {
                        axios
                            .get(ApiUrl + '/posts/')
                            .then(posts => {
                                this.setState({posts: posts.data})

                                var authInfo = {
                                    id: this.state.authInfo.user.id,
                                    login: this.state.authInfo.user.login,
                                    mail: this.state.authInfo.user.mail,
                                    pass: this.state.authInfo.user.pass,
                                    followers: this.state.authInfo.user.followers,
                                    postsCount: this.state.authInfo.user.postsCount + 1
                                }

                                axios
                                    .post(ApiUrl + '/auth/update/' + this.state.authInfo.user.id, authInfo)
                                    .then(res => {
                                        var temp = this.state.authInfo.user;
                                        temp.postsCount = temp.postsCount + 1;
                                        this
                                            .state
                                            .setAuthUser(temp);

                                        localStorage.removeItem("jwtToken");
                                        this
                                            .state
                                            .setAuthToken(false);

                                        const {token} = res.data;

                                        localStorage.setItem("jwtToken", token);
                                        this
                                            .state
                                            .setAuthToken(token);

                                        this
                                            .state
                                            .setUsers(this.state.users.map(elem => {
                                                if (elem._id === this.state.authInfo.user.id) {
                                                    elem.postsCount = elem.postsCount + 1;
                                                }
                                                return elem;
                                            }))

                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })

                            })
                    });
            },

            editPost: (id) => {
                notify.notifyTwo();

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
            this
                .state
                .setAuth(true, decoded);

            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                this
                    .state
                    .setAuth(false, {});
            }
        }

        axios
            .get(ApiUrl + '/posts/')
            .then(posts => {
                this.setState({posts: posts.data})
            })

        axios
            .get(ApiUrl + '/auth/')
            .then(users => {
                this
                    .state
                    .setUsers(users.data);
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