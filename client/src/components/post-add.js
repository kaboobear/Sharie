import React from 'react';

import MyContext from './contextAPI'

import {Cont} from './contextAPI'
import {withRouter} from 'react-router-dom'




class AddPost extends React.Component {

    addPost(e){
        e.preventDefault();

        this.context.state.addPost();
        this.context.state.setPostForm('');
        this.props.history.push('/');
    }


    render() {
        return (
            <MyContext>
                {(context) => (
                        <div className="container">
                            <div className="page-title">Add Post</div>

                            <div className="flex-wrap center">
                                <form onSubmit={(e)=>{this.addPost(e)}} className="add-form">
                                    <div className="simple-input">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            value={context.state.postForm.name}
                                            onChange={context.state.handleChange}/>
                                    </div>

                                    <button type="submit" className="btn">Add</button>
                                </form>
                            </div>
                    </div>
                )}
            </MyContext>
        );
    }

    componentWillUnmount(){
            this.context.state.setPostForm('');
    }

}

AddPost.contextType = Cont;
export default withRouter(AddPost);
