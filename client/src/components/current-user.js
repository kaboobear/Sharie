import React from 'react';
import MyContext from './contextAPI'
import {Cont} from './contextAPI'
import {withRouter} from 'react-router-dom'

class User extends React.Component {
    logout(){
        this.context.state.logout();
    }

    render() {
        return (
            <MyContext>
                {(context) => (
                    <div className="current-user">
                        <div className="current-user-img">
                            <img src="img/photo.jpg" alt=""/>
                        </div>

                        <div className="current-user-info">
                            <div className="current-user-name">
                                {context.state.authInfo.user.login}
                            </div>

                            <div className="current-user-posts current-user-val">
                                {context.state.authInfo.user.postsCount} Posts
                            </div>

                            <div className="current-user-followers current-user-val">
                            {context.state.authInfo.user.followers}  Followers
                            </div>
                        </div>

                        <div onClick={()=>{this.logout()}} className="logout-btn btn">Logout</div>
                    </div>
                )}
            </MyContext>
        );
    }
}

User.contextType = Cont;
export default withRouter(User);
