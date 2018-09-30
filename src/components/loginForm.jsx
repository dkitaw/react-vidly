import React, { Component } from 'react';

class LoginForm extends Component {
    state = {
        account: { username: '', password: '' }
    }

    render() { 
        const { account } = this.state;

        return (
            <div>
                <h1>Login</h1>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            value={account.username} 
                            onChange={this.handleChange}
                            id="username" 
                            name="username"
                            type="text" 
                            className="form-control" 
                            autoFocus />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            value={account.password} 
                            onChange={this.handleChange}
                            id="password" 
                            name="password"
                            type="text" 
                            className="form-control" />
                    </div>
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }

    handleSubmit = e => {
        e.preventDefault();
    };

    handleChange = ({ currentTarget: input }) => {
        const account = {...this.state.account};
        account[input.name] = input.value;
        this.setState({
            account
        });
    }
}
 
export default LoginForm;