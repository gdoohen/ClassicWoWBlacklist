import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import * as services from '../services';

const styles = {
    link: {
        cursor: "pointer",
        textDecoration: "underline",
        color: "#5445AD"
    },

    disabledLink: {
        textDecoration: "underline",
        color: "grey"
    }
};

class AccountVerificationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            verificationCode: "",
            verificationCodeError: false,
            verificationCodeHelperText: "",
            verificationCodeResent: false
        };
    }

    componentDidMount() {
        const { username } = this.props.match.params;
        this.setState({ username });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    async handleVerify() {
        const { username, verificationCode } = this.state;
        const verifyResult = await services.verifyAccount(username, verificationCode);

        if (verifyResult.status === 200) {
            this.props.history.push(`/login`);
        } else {
            this.setState({
                verificationCodeError: true,
                verificationCodeHelperText: "Invalid verification code"
            });
        }
    }

    handleKeyPress(event) {
        if (event.key === "Enter") {
            this.handleVerify();
        }
    }

    async handleResendVerificationCode() {
        const { verificationCodeResent, username } = this.state;
        
        if (verificationCodeResent) return;

        services.resendVerificationCode(username).then(() => {
            this.setState({ verificationCodeResent: true });
        });
    }

    render() {
        const { verificationCode, verificationCodeError, verificationCodeHelperText, verificationCodeResent } = this.state;

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <TextField
                    autoFocus
                    label="Verification Code"
                    value={verificationCode}
                    error={verificationCodeError}
                    helperText={verificationCodeHelperText}
                    onChange={this.handleChange("verificationCode")}
                    onKeyPress={this.handleKeyPress.bind(this)}
                />
                <Button onClick={this.handleVerify.bind(this)} style={{ marginTop: 15, backgroundColor: "yellow" }}>Verify</Button>

                <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>If you didn't recieve a verication code and you've checked your spam folders,&nbsp;</p>
                    <p onClick={this.handleResendVerificationCode.bind(this)} style={verificationCodeResent ? styles.disabledLink : styles.link}>click here to resend the verification code.</p>
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(AccountVerificationPage));