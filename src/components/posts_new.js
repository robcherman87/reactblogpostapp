import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';
import { Animated } from "react-animated-css";

class PostsNew extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                 className="form-control"
                  type="text"
                  {...field.input}
                />
                <div className="text-help">{touched ? error : ''}</div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className = "container">
             <br />
             <br />
             <br />
                <div className = "col-md-6 col-md-offset-3">
                        <Animated animationIn="bounceInLeft" animationInDelay="0" isVisible={true}>
                            <h3>Enter a new post</h3>
                        </Animated>
                        <br />
                        <br />
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Animated animationIn="bounceInUp" isVisible={true}>
                                <Field
                                label="Title"
                                name="title"
                                component={this.renderField}
                                />
                            </Animated>
                            <Animated animationIn="bounceInUp" isVisible={true}>
                                <Field 
                                label="Categories"
                                name="categories"
                                component={this.renderField}
                                />
                            </Animated>
                            <Animated animationIn="bounceInUp" isVisible={true}>
                                <Field 
                                label="Post Content"
                                name="content"
                                component={this.renderField}
                                />
                            </Animated>
                                
                                <button type="submit" className="btn btn-primary">Submit</button>&nbsp;
                                <Link to="/" className="btn btn-danger">Cancel</Link>
                            
                        </form> 
                    </div> 
            </div>      
        );
    }
}

function validate(values) {
    const errors = {};

    //Validate the inputs from 'values' 
    if (!values.title) {
        errors.title = "Enter a title";
    }

    if (!values.categories) {
        errors.categories = "Enter some categories";
    }

    if (!values.content) {
        errors.content = "Enter some content please";
    }    
    // if errors is empty, the form is fine to submit
    // if errors has *any* properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);

