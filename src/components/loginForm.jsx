import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {
    state = {
        account: { username: '', password: '' },
        errors: { }
    }

    render() { 
        const { account, errors } = this.state;

        return (
            <div>
                <h1>Login</h1>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        name="username"
                        label="Username"
                        value={account.username}
                        error={errors.username}
                        onChange={this.handleChange} />
                    <Input
                        name="password"
                        label="Password"
                        value={account.password}
                        error={errors.password}
                        onChange={this.handleChange} />
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }

    handleSubmit = e => {
        e.preventDefault();
        
        const errors = this.validate();

        this.setState(
            {errors: errors || {}}
        )

        if (!errors) {
            console.log('Yes');
        }
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = {...this.state.errors};
        const account = {...this.state.account};
        const errorMessage = this.validateProperty(input);

        if (errorMessage) {
            errors[input.name] = errorMessage;
        } else {
            delete errors[input.name];
        }
        
        account[input.name] = input.value;
        
        this.setState({
            account,
            errors
        });
    }

    validate = () => {
        const errors = {};
        const { account } = this.state;

        if (account.username.trim() === '') {
            errors.username = 'Username is required.'
        }

        if (account.password.trim() === '') {
            errors.password = 'Password is required.'
        }

        return Object.keys(errors).length === 0 ? null : errors;
    };

    validateProperty = ({ name, value }) => {
        if (name === 'username') {
            if (value.trim() === '') {
                return 'Username is required';
            }
        }

        if (name === 'password') {
            if (value.trim() === '') {
                return 'Password is required';
            }
        }
    }
}
 
export default LoginForm;