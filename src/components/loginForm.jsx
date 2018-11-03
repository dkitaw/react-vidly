import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import authService from '../services/authService';

class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors: { }
    }

    schema = {
        username: Joi.string().email({ minDomainAtoms: 2 }).label('Username'),
        password: Joi.string().required().min(5).label('Password')
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

    doSubmit = async () => {
        try {
            const { data } = this.state;
            await authService.login(data.username, data.password);
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
 
export default LoginForm;