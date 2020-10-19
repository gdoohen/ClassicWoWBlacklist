import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import HomeIcon from '@material-ui/icons/Home';
import LoginIcon from '@material-ui/icons/AccountBox'

const styles = {
    AppBar: {
        backgroundColor: "black"
    }
};

class Header extends Component {
    handleHomeClick = () => {
        this.props.history.push('/');
    }

    handleLoginClick = () => {
        this.props.history.push('/login');
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <AppBar classes={{ root: classes.AppBar }} position="static">
                    <Toolbar style={{ display: "flex", flexDirection: "row" }}>
                        <Tooltip title="Home">
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="Home"
                                onClick={this.handleHomeClick}
                                style={{ color: "yellow", marginLeft: "20vw" }}
                            >
                                <HomeIcon />
                            </IconButton>
                        </Tooltip>

                        <Link to="/" style={{ marginLeft: "auto", color: "yellow", textDecoration: "none" }}>Welcome to The Classic Blacklist!</Link>

                        {/* TODO This icon should switch to account management if logged in. */}
                        <div style={{ marginLeft: "auto" }}>
                            <Tooltip title="Login">
                                <IconButton
                                    edge="end"
                                    color="inherit"
                                    aria-label="Home"
                                    onClick={this.handleLoginClick}
                                    style={{ color: "yellow", marginRight: "20vw" }}
                                >
                                    <LoginIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Header));