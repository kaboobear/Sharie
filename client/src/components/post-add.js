import React from 'react';

import MyContext from './contextAPI'

import {Cont} from './contextAPI'
import {withRouter} from 'react-router-dom'
import CurrentUser from './current-user'

class AddPost extends React.Component {

    addPost(e) {
        e.preventDefault();

        if (this.context.state.postForm.postText.length === 0) {
            this
                .context
                .state
                .setPostErrors("Field can't be empty");
        } else {
            this
                .context
                .state
                .addPost();
            this
                .context
                .state
                .setPostErrors("");
            this
                .context
                .state
                .setPostForm('');
        }
    }

    render() {
        return (
            <MyContext>
                {(context) => (
                    <div className="add-post-section">
                        <form
                            onSubmit={(e) => {
                            this.addPost(e)
                        }}
                            className="add-form">
                            <div className="simple-input">

                            <CurrentUser/>
                                
                                <textarea
                                    type="text"
                                    name="postText"
                                    placeholder="Type here..."
                                    value={context.state.postForm.postText}
                                    onChange={context.state.handleChange}></textarea>

                                <button type="submit" className="btn add-btn">Add</button>

                                {(context.state.postErrors.postText !== '') && (
                                    <div className="post-error">
                                        {context.state.postErrors.postText}
                                    </div>
                                )}
                            </div>
                        </form>

                    </div>
                )}
            </MyContext>
        );
    }

    componentWillUnmount() {
        this
            .context
            .state
            .setPostForm('');
    }

}

AddPost.contextType = Cont;
export default withRouter(AddPost);
