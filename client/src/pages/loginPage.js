import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import * as services from '../services';
import * as tokenSelectors from '../redux/token/reducer';
import * as tokenActions from '../redux/token/actions';
import styling from '../styles';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            usernameError: false,
            usernameHelperText: "",
            password: "",
            passwordError: false,
            passwordHelperText: ""
        };
    }

    async componentDidMount() {
        const { token } = this.props;

        if (token.length > 0) {
            const loginResponse = await services.loginWithToken(token);

            if (loginResponse.status === 200) {
                this.props.history.push(`/account/dashboard`);
            } else {
                this.props.dispatch(tokenActions.setToken(""));
            }
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    async handleLogin() {
        const { username, password } = this.state;
        const loginResponse = await services.login(username, password);
        
        if (loginResponse.status === 200) {
            const { token } = loginResponse.data;

            if (token !== undefined) {
                this.props.dispatch(tokenActions.setToken(token));
                this.props.history.push(`/account/dashboard`);
            }
        } else {
            const { username, banned, verified, isPasswordValid } = loginResponse.data;

            if (username === "invalid") {
                this.setState({
                    usernameError: true,
                    usernameHelperText: "Invalid username"
                });
            } else if (banned === true) {
                this.props.history.push(`/banned`); // TODO: Create banned page
            } else if (verified === false) {
                this.props.history.push(`/account/verify/${username}`);
            } else if (isPasswordValid === false) {
                this.setState({
                    passwordError: true,
                    passwordHelperText: "Invalid password"
                });
            }
        }
    }

    handleKeyPress(event) {
        if (event.key === "Enter") {
            this.handleLogin();
        }
    }

    render() {
        const { username, usernameError, usernameHelperText, password, passwordError, passwordHelperText } = this.state;

        return (
            <div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onKeyPress={this.handleKeyPress.bind(this)}>
                    <div stlye={{ display: "flex", flexDirection: "row" }}>
                        <TextField
                            label="Username"
                            value={username}
                            error={usernameError}
                            helperText={usernameHelperText}
                            onChange={this.handleChange("username")}
                        />

                        <TextField
                            type="password"
                            label="Password"
                            value={password}
                            error={passwordError}
                            helperText={passwordHelperText}
                            onChange={this.handleChange("password")}
                            style={{ marginLeft: 10 }}
                        />
                    </div>

                    <Button onClick={this.handleLogin.bind(this)} style={{ alignSelf: "center", marginTop: 25, backgroundColor: styling.PRIMARY_COLOR }}>Login</Button>

                    <Link to="/account/resetPassword" style={{ marginTop: 25 }}>Forgot password?</Link>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <p>New here?&nbsp;</p>
                        <Link to="/account/create">Create an account</Link>
                        <p>&nbsp;now!</p>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: tokenSelectors.token(state)
    };
};

export default connect(mapStateToProps)(withRouter(LoginPage));