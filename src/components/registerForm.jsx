import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import * as userService from '../services/userService';
import authService from '../services/authService';

class RegisterForm extends Form {
    state = {
        data: { username: '', password: '', name: '' },
        errors: { }
    }

    schema = {
        username: Joi.string().email({ minDomainAtoms: 2 }).label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    };

    render() { 
        return (
            <div>
                <h1>Register</h1>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username', undefined, true)}
                    {this.renderInput('password', 'Password', 'password', undefined)}
                    {this.renderInput('name', 'Name', undefined, undefined)}
                    {this.renderButton('Register')}
                </form>
            </div>
        );
    }

    doSubmit = async () => {
        try {
            const response = await userService.register(this.state.data);
            authService.loginWithJwt(response.headers['x-auth-token']);
            window.location = '/';
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = error.response.data;
                this.setState({ errors });
            }
        }
    }
}
 
export default RegisterForm;