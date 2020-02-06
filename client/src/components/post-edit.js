import React from 'react';

import MyContext from './contextAPI'
import ApiUrl from '../constants';

import axios from 'axios';

import {Cont} from './contextAPI'
import {withRouter} from 'react-router-dom'




class EditPost extends React.Component {

    editPost(id,e){
        e.preventDefault();

        this.context.state.editPost(id);
        this.context.state.setPostForm('');
        this.props.history.push('/');
    }


    render() {
        return (
            <MyContext>
                {(context) => (
                        <div className="container">
                        <div className="page-title">Edit Post</div>

                            <div className="flex-wrap center">
                                <form onSubmit={(e)=>{this.editPost(this.props.match.params.id,e)}} className="add-form">
                                    <div className="simple-input">
                                        <input
                                            type="text"
                                            name="name"
                                            value={context.state.postForm.name}
                                            onChange={context.state.handleChange}/>
                                    </div>

                                    <button type="submit" className="btn">Edit</button>
                                </form>
                            </div>
                        </div>
                )}
            </MyContext>
        );
    }




    componentDidMount(){
        axios.get(ApiUrl + '/posts/'+this.props.match.params.id).then(res=>{
            this.context.state.setPostForm(res.data.username);
        })
    }

    componentWillUnmount(){
            this.context.state.setPostForm('');
    }

}

EditPost.contextType = Cont
export default withRouter(EditPost);
