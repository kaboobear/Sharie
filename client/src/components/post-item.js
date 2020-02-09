import React from 'react';

import MyContext from './contextAPI'
import axios from 'axios'

import {Cont} from './contextAPI'
import {withRouter} from 'react-router-dom'
import Moment from 'react-moment';
import $ from 'jquery';
import ApiUrl from '../constants';

class PostItem extends React.Component {

    componentDidMount() {
        var nested = $('.nested').eq(this.props.id);

        nested
            .find('.nested-btn')
            .click(function () {
                $('.nested .delete-btn').fadeOut(200);

                if ($(this).hasClass('active')) {
                    nested
                        .find('.delete-btn')
                        .fadeOut(200);
                    $(this).removeClass('active');
                } else {
                    nested
                        .find('.delete-btn')
                        .fadeIn(200);
                    $(this).addClass('active');
                }
            })

        $(document).mouseup(function (e) {
            var div = nested.find('.nested-btn');
            var div2 = nested.find('.delete-btn');

            if (div.hasClass('active')) {
                if (!div.is(e.target) && div.has(e.target).length === 0 && !div2.is(e.target) && div2.has(e.target).length === 0) {
                    div.removeClass('active');
                    div2.fadeOut(200);
                }
            }
        });
    }

    likePost(post) {
        if ($.inArray(this.context.state.authInfo.user.id, post.likesArray) === -1) {
            post
                .likesArray
                .push(this.context.state.authInfo.user.id);

            post.postLikes = post.postLikes + 1;
        } else {
            const index = post
                .likesArray
                .indexOf(this.context.state.authInfo.user.id);
            if (index > -1) {
                post
                    .likesArray
                    .splice(index, 1);
            }

            post.postLikes = post.postLikes - 1;
        }

        axios
            .post(ApiUrl + '/posts/update/' + post._id, post)
            .then(res => {
                this
                    .context
                    .state
                    .setPosts(this.context.state.posts.map(elem => {
                        if (post._id === elem._id) {
                            elem = post
                        }
                        return elem
                    }))
            })
    }

    render() {
        var post = this.props.post;

        return (
            <MyContext>
                {(context) => (
                    <div key={post._id} className="post-item">
                        <div className="flex-wrap">

                                <div className="nested">
                                    <div className={(post.authorId === context.state.authInfo.user.id) ? "nested-btn" : "nested-btn hidden"}><img src="img/dots-ico.png" alt=""/></div>
                                    <div
                                        onClick={() => {
                                        context
                                            .state
                                            .deletePost(post._id)
                                    }}
                                        className="delete-btn">
                                        delete
                                    </div>
                                </div>

                            <div className="post-item-img">
                                <img src="img/photo.jpg" alt=""/>
                            </div>

                            <div className="post-item-info">
                                <div className="post-item-info-top">
                                    <div className="post-item-author">
                                        {post.author.login}
                                    </div>

                                    <div className="post-item-date">
                                        <Moment fromNow>{post.createdAt}</Moment>
                                    </div>
                                </div>

                                <div className="post-item-text">
                                    {post.postText}
                                </div>

                                <div
                                    className={(post.authorId === context.state.authInfo.user.id)
                                    ? "post-item-btns current"
                                    : "post-item-btns"}>
                                    <div
                                        className={($.inArray(context.state.authInfo.user.id, post.likesArray) === -1)
                                        ? "post-item-btn like"
                                        : "post-item-btn like liked"}
                                        onClick={() => {
                                        this.likePost(post)
                                    }}>
                                        {($.inArray(context.state.authInfo.user.id, post.likesArray) === -1)
                                            ? (<img src="img/heart-ico.png" alt=""/>)
                                            : (<img src="img/heart-ico2.png" alt=""/>)}
                                        <span className="post-item-btn-cnt">
                                            {post.postLikes}
                                        </span>
                                    </div>

                                    <div className="post-item-btn share">
                                        <img src="img/share-ico.png" alt=""/>
                                        <span className="post-item-btn-cnt">
                                            {post.postShares}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </MyContext>
        );
    }

}

PostItem.contextType = Cont;
export default withRouter(PostItem);
