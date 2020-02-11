import React from 'react';

import MyContext from './contextAPI'

import {Cont} from './contextAPI'
import {withRouter} from 'react-router-dom'
import FriendInfo from './friend-info';
import PostItem from './post-item'
import {Link} from 'react-router-dom'

class Friend extends React.Component {

    render() {
        var id = 0;
        var friend;
        this.context.state.users.map(user=>{
            if(user._id === this.props.match.params.id){
                friend = user
            }
        })

        return (
            <MyContext>
                {(context) => (
                    <div className="posts-section">
                        <Link to="/" className="back-btn btn">
                            Back
                        </Link>

                        <FriendInfo id={this.props.match.params.id} friend={friend}/> {(friend.postsCount > 0)
                            ? context.state.posts.map((post) => (post.author._id === this.props.match.params.id) && (<PostItem key={post._id} id={id++} post={post}/>))
                            : (
                                <div className="post-item">
                                    <div className="empty-message">
                                        List is empty
                                    </div>
                                </div>
                            )
}
                    </div>
                )}
            </MyContext>
        );
    }

}

Friend.contextType = Cont;
export default withRouter(Friend);
