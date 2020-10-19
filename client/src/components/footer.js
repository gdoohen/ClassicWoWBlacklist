import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as tokenSelectors from '../redux/token/reducer';

class Footer extends Component {
    render() {
        const { token } = this.props;

        return (
            <div style={{ marginTop: "auto", marginBottom: "1vh", display: "flex", flexDirection: "column", alignItems: "center", borderTop: "1px solid black" }}>
                {token && token.length === 0 &&
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <p style={{ marginBottom: 5, marginTop: 5 }} >If you would like to create your own blacklist to share with friends, consider&nbsp;</p>
                        <Link to="/account/create">creating an account</Link>
                        <p style={{ marginBottom: 5, marginTop: 5 }} >&nbsp;or&nbsp;</p>
                        <Link to="/login">logging in</Link>
                        <p style={{ marginBottom: 5, marginTop: 5 }} >.</p>
                    </div>
                }
                
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Link to="/tos" style={{ marginRight: 10 }}>Terms Of Service</Link>
                    <Link to="/privacyPolicy" style={{ marginRight: 10 }}>Privacy Policy</Link>
                    <Link to="/faq" style={{ marginRight: 10 }}>FAQ</Link>
                    <a href="https://discordapp.com/invite/wbKjp3v" target="_blank" rel="noopener noreferrer">Contact</a>
                </div>

                <p style={{ color: "white", margin: 0, fontSize: "9pt" }}>We recommend using the lastest Chrome or Firefox versions if you are experiencing difficulties with the site.</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: tokenSelectors.token(state)
    };
};

export default connect(mapStateToProps)(withRouter(Footer));