import React from 'react';
import MyContext from './contextAPI'
import {Link} from 'react-router-dom'

class Posts extends React.Component {

    render() {
        return (

            <MyContext>
                {(context) => (
                    <div className="posts-section">
                        <div className="container">

                            <div className="posts-table">

                                {(context.state.posts.length > 0)
                                    ? context.state.posts.map((post) => (
                                        <div key={post._id} className="post-item">
                                            <div className="post-name">{post.username}</div>

                                            <div className="post-btns">
                                                <Link to={'/posts/edit/' + post._id} className="post-btn">Edit</Link>

                                                <div
                                                    onClick={() => {
                                                    context
                                                        .state
                                                        .deletePost(post._id)
                                                }}
                                                    className="post-btn">Delete</div>
                                            </div>
                                        </div>
                                    ))
                                    : <div className="post-item">
                                        <div className="empty-message">
                                            List is empty
                                        </div>
                                    </div>
}

                            </div>

                            <div className="wrap post-wrap">
                                <Link to="/posts/add" className="add-post-btn btn">Add Post</Link>
                            </div>

                        </div>
                    </div>
                )}
            </MyContext>

        );
    }

}

export default Posts;
