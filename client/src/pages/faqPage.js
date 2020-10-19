import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class FAQPage extends Component {
    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                <h1 style={{ borderBottom: "2px solid black" }}>FAQs</h1>
                <h3>Features coming soon&#8482;</h3>
                <ol>
                    <li>Your suggestion here. Contact us down below to let us know what features you would like to see added to the site!</li>
                </ol>
            </div>
        );
    }
}

export default withRouter(FAQPage);