import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import * as services from '../services';

const ERROR_TEXTS = {
    INVALID_USERNAME: "Username must contain 4-20 characters",
    NON_UNIQUE_USERNAME: "Username is already taken",
    INVALID_PASSWORD: "Password must contain 8-32 characters",
    INVALID_CONFIRM_PASSWORD: "Must match password",
    INVALID_EMAIL: "Must contain 7-40 characters and be a valid email",
    NON_UNIQUE_EMAIL: "Email is already taken",
    CREATION_ERROR: "Server failed to create account"
};

class AccountCreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            usernameError: false,
            usernameHelperText: "",

            password: "",
            passwordError: false,
            passwordHelperText: "",

            confirmPassword: "",
            confirmPasswordError: false,
            confirmPasswordHelperText: "",

            email: "",
            emailError: false,
            emailHelperText: "",

            creationError: ""
        };
    }

    handleChange = name => event => {
        const value = event.target.value;
        let update = { [name]: value };

        if (name === "username") {
            if (value.length < 4 || value.length > 20) {
                update.usernameError = true;
                update.usernameHelperText = ERROR_TEXTS.INVALID_USERNAME;
            } else {
                update.usernameError = false;
                update.usernameHelperText = "";
            }
        } else if (name === "password") {
            if (value.length < 8 || value.length > 32) {
                update.passwordError = true;
                update.passwordHelperText = ERROR_TEXTS.INVALID_PASSWORD;
            } else {
                update.passwordError = false;
                update.passwordHelperText = "";
            }
        } else if (name === "confirmPassword") {
            if (value !== this.state.password) {
                update.confirmPasswordError = true;
                update.confirmPasswordHelperText = ERROR_TEXTS.INVALID_CONFIRM_PASSWORD;
            } else {
                update.confirmPasswordError = false;
                update.confirmPasswordHelperText = "";
            }
        } else if (name === "email") {
            if (value.length < 7 || value.length > 40 || !value.includes("@")) {
                update.emailError = true;
                update.emailHelperText = ERROR_TEXTS.INVALID_EMAIL;
            } else {
                update.emailError = false;
                update.emailHelperText = "";
            }
        }

        this.setState(update);
    };

    async createAccount() {
        const { username, password, email } = this.state;
        const response = await services.createAccount(username, password, email);

        if (response.status === 200) {
            this.props.history.push(`/account/verify/${username}`);
        } else {
            let update = {};
            
            const {username, password, email } = response.data;

            if (username) {
                if (username === "invalid") {
                    update.usernameError = true;
                    update.usernameHelperText = ERROR_TEXTS.INVALID_USERNAME;
                } else if (username === "non-unique") {
                    update.usernameError = true;
                    update.usernameHelperText = ERROR_TEXTS.NON_UNIQUE_USERNAME;
                }
            } else if (password === "invalid") {
                update.passwordError = true;
                update.passwordHelperText = ERROR_TEXTS.INVALID_PASSWORD;
            } else if (email) {
                if (email === "invalid" || email === "failedMailgunValidation") {
                    update.emailError = true;
                    update.emailHelperText = ERROR_TEXTS.INVALID_EMAIL;
                } else if (email === "non-unique") {
                    update.emailError = true;
                    update.emailHelperText = ERROR_TEXTS.NON_UNIQUE_EMAIL;
                }
            } else {
                update.creationError = ERROR_TEXTS.CREATION_ERROR;
            }

            this.setState(update);
        }
    }

    render() {
        const {
            username, usernameError, usernameHelperText,
            password, passwordError, passwordHelperText,
            confirmPassword, confirmPasswordError, confirmPasswordHelperText,
            email, emailError, emailHelperText,
            creationError
        } = this.state;

        return (
            <div style={{ display: "flex", flexDirection: "column", minWidth: 300 }}>
                <TextField
                    autoFocus
                    label="Username"
                    value={username}
                    error={usernameError}
                    helperText={usernameHelperText}
                    onChange={this.handleChange("username")}
                    style={{ marginBottom: 15 }}
                />
                
                <TextField
                    type="password"
                    label="Password"
                    value={password}
                    error={passwordError}
                    helperText={passwordHelperText}
                    onChange={this.handleChange("password")}
                    style={{ marginBottom: 15 }}
                />
                
                <TextField
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    error={confirmPasswordError}
                    helperText={confirmPasswordHelperText}
                    onChange={this.handleChange("confirmPassword")}
                    style={{ marginBottom: 15 }}
                />
                
                <TextField
                    label="Email"
                    value={email}
                    error={emailError}
                    helperText={emailHelperText}
                    onChange={this.handleChange("email")}
                    style={{ marginBottom: 25 }}
                />
                
                <Button
                    size="small"
                    variant="contained"
                    onClick={this.createAccount.bind(this)}
                    style={{
                        background: "yellow",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    Create Account
                </Button>

                {creationError.length > 0 &&
                    <p style={{ color: "red" }}>{creationError}</p>
                }
            </div>
        );
    }
}

export default withRouter(AccountCreatePage);