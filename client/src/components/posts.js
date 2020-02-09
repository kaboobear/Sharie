import React from 'react';
import MyContext from './contextAPI'
import PostAdd from './post-add';
import PostItem from './post-item'


class Posts extends React.Component {

    render() {
        var id = 0;

        return (
            <MyContext>
                {(context) => (
                    <div className="posts-section">
                        <PostAdd/> 

                        {(context.state.posts.length > 0)
                            ? context.state.posts.map((post) => (
                            <PostItem key={post._id} id={id++} post={post}/>
                            ))
                            : (<div className="post-item">
                                <div className="empty-message">
                                    List is empty
                                </div>
                              </div>)
                        }
                    </div>
                )}
            </MyContext>
        );
    }

}

export default Posts;
