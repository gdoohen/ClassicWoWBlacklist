import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { stringIncludesSomeElement } from './utils/arrayIncludes';

import Header from './components/header';
import Footer from './components/footer';

import DashboardPage from './pages/dashboardPage';
import PrivateBlacklist from './pages/privateBlacklist';

import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import ReportPage from './pages/reportPage';

import AccountCreatePage from './pages/accountCreatePage';
import AccountVerificationPage from './pages/accountVerificationPage';
import ResetPasswordPage from './pages/resetPassword';

import TermsOfServicePage from './pages/termsOfServicePage';
import PrivacyPolicyPage from './pages/privacyPolicyPage';
import FAQPage from './pages/faqPage';

import FourOFourPage from './pages/404Page';

import STYLING from './styles';

const LARGE_VIEW_PATHS = [
    "/account/dashboard"
];

const styles = {
    smallView: {
        backgroundColor: STYLING.PRIMARY_BACKGROUND_COLOR,
        margin: 25,
        padding: 10,
        height: "100%",
        maxHeight: "79vh",
        display: "flex", 
        justifyContent: "center",

        marginLeft: "20vw",
        marginRight: "20vw",
    },

    largeView: {
        backgroundColor: STYLING.PRIMARY_BACKGROUND_COLOR,
        margin: 25,
        padding: 10,
        height: "100%",
        maxHeight: "79vh",
        display: "flex", 
        justifyContent: "center"
    }
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            largeView: true
        };
    }

    // TODO: Tie path to redux state --> call this whenever path changes
    preRender() {
        const { largeView } = this.state;
        const path = window.location.pathname;

        if (stringIncludesSomeElement(path, LARGE_VIEW_PATHS) && !largeView) {
            this.setState({ largeView: true });
        } else if (!stringIncludesSomeElement(path, LARGE_VIEW_PATHS) && largeView) {
            this.setState({ largeView: false });
        }
    }

    render() {
        const { largeView } = this.state;

        return (
            <Router>
                <div style={{ height: "100vh", display: "flex", flexDirection: "column" }} >
                    <Header />

                    <Paper style={ largeView ? styles.largeView : styles.smallView }>
                        <Switch>
                            <Route path="/" exact component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/report/:region/:realm/:character" component={ReportPage} />

                            <Route path="/blacklist/:blacklistId" component={PrivateBlacklist} /> {/* Requires largeView */}
                            
                            <Route path="/account/dashboard" component={DashboardPage} /> {/* Requires largeView */}
                            <Route path="/account/create" component={AccountCreatePage} />
                            <Route path="/account/verify/:username" component={AccountVerificationPage} />
                            <Route path="/account/resetPassword" component={ResetPasswordPage} />

                            <Route path="/tos" component={TermsOfServicePage} />
                            <Route path="/privacyPolicy" component={PrivacyPolicyPage} />
                            <Route path="/faq" component={FAQPage} />

                            <Route path="/404" component={FourOFourPage} />
                            <Route component={FourOFourPage} />
                        </Switch>
                    </Paper>

                    <Footer />
                </div>
            </Router>
            
        );
    }
}

export default withStyles(styles)(App);