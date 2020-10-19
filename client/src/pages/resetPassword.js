import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import * as services from '../services';


class ResetPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailError: false,
            emailHelperText: "",
            passwordResetRequestSent: false,
            passwordReset: false
        };
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    async handleResetPassword() {
        if (this.state.passwordResetRequestSent) return;

        this.setState({ passwordResetRequestSent: true }, async () => {
            const { email } = this.state;
            const resetPasswordResult = await services.resetPassword(email);
    
            if (resetPasswordResult.status === 200) {
                this.setState({ passwordReset: true });
            } else {
                this.setState({
                    emailError: true,
                    emailHelperText: "Invalid email",
                    passwordResetRequestSent: false
                });
            }
        });
    }

    handleKeyPress(event) {
        if (event.key === "Enter") {
            this.handleResetPassword();
        }
    }

    render() {
        const { email, emailError, emailHelperText, passwordReset, passwordResetRequestSent } = this.state;

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <TextField
                    autoFocus
                    label="Email"
                    value={email}
                    error={emailError}
                    helperText={emailHelperText}
                    onChange={this.handleChange("email")}
                    onKeyPress={this.handleKeyPress.bind(this)}
                    style={{ width: 250 }}
                />

                <Button disabled={passwordResetRequestSent} onClick={this.handleResetPassword.bind(this)} style={{ marginTop: 25, backgroundColor: "yellow" }}>Reset</Button>

                {passwordReset &&
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <p>Your new password has been sent to your email. You can&nbsp;</p>
                        <Link to="/login">login here.</Link>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(ResetPasswordPage);