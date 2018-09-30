import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors: { }
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    render() { 
        return (
            <div>
                <h1>Login</h1>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username', undefined, true)}
                    {this.renderInput('password', 'Password', 'password', undefined)}
                    {this.renderButton('Login')}
                </form>
            </div>
        );
    }

    doSubmit = () => {
        console.log('Submitted');
    }
}
 
export default LoginForm;