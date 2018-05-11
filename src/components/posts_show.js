import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';
import { Animated } from "react-animated-css";


class PostsShow extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>
        }

        return (
            <div className="container">
            <br />
            <br />
                <Link to="/" className="btn btn-secondary"><i className="fa fa-arrow-alt-circle-left" />&nbsp; Back To Index</Link>
                    <Animated animationIn="fadeIn" animationInDelay="0" isVisible={true}>
                        <h3 className="postTitle">{post.title}</h3>
                        <h6><i className="fa fa-box" />&nbsp;&nbsp;{post.categories}</h6>
                        <p>{post.content}</p>
                    </Animated>
                <button
                 className="btn btn-danger pull-xs-right"
                 onClick={this.onDeleteClick.bind(this)}
                >
                  Delete Post
                </button>
            </div>     
        );
    };
}

function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);

