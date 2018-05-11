import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import { Animated } from "react-animated-css";

class PostsIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
       return _.map(this.props.posts, post => {
            return (
                <Link to={`/posts/${post.id}`}>
                    <li className="list-group-item" key={post.id}>
                            {post.title}
                            <span className="pull-xs-right" key={post.content}>
                                {post.content}
                            </span>
                    </li>
                </Link>
          );
       });
    }

    render() {
        return (
            <div className="container postsIndex">
                <div className="text-xs-right">
                    <Animated animationIn="bounceInDown" animationInDelay="0" isVisible={true}>
                        <Link className="btn btn-primary" to="/posts/new">
                            Add a Post &nbsp; <i className="fa fa-plus" />
                        </Link>
                    </Animated>
                </div>
                <Animated animationIn="fadeInDown" animationInDelay="0" isVisible={true}>
                    <h3>Posts</h3><br />
                </Animated>
                    <ul className="list-group">
                        <Animated animationIn="bounceInLeft" animationInDelay="0" isVisible={true}>
                            {this.renderPosts()}
                        </Animated>
                    </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex); 