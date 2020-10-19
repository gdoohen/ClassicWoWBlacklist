import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import capitalize from 'lodash/capitalize';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import CopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/RemoveCircleOutline';

import * as services from '../services';
import * as tokenSelectors from '../redux/token/reducer';
import * as tokenActions from '../redux/token/actions';

import CharacterSearch from '../components/characterSearch';

import { capitalizeRealm } from '../utils/formatRealm';
import STYLING from '../styles';
import "react-table/react-table.css";

class DashboardPage extends Component {
    constructor(props) {
        super(props);

        const boiColumns = [
            {
                Header:"Region",
                accessor: "region",
                width: 65
            },
        
            {
                Header:"Realm",
                accessor: "realm",
                width: 225,
                Cell: props => {
                    return capitalizeRealm(props.value);
                }
            },
        
            {
                Header:"Character",
                accessor: "character_name",
                width: 225,
                Cell: props => {
                    return capitalize(props.value);
                }
            },
        
            {
                Header: "Delete",
                Cell: ({ row }) => {
                    return (
                        <div style={{ height: "100%" }}>
                            <Tooltip title="Delete Me">
                                <IconButton onClick={this.handleRemoveFromBlacklistClick.bind(this, row)} style={{ padding: 0 }}>
                                    <DeleteIcon style={{ color: "red", padding: 0 }} />
                                </IconButton>
                            </Tooltip>
                        </div>
                    );
                }
            }
        ];

        this.state = {
            blacklistId: "",
            badBois: [],
            region: "US",
            realm: "",
            character: "",
            boiColumns
        };
    }

    componentDidMount() {
        this.getDashboardData();
    }

    async getDashboardData() {
        const { token } = this.props;
        if (token.length === 0) {
            this.props.history.push('/login');
        }

        const response = await services.getDashboardData(token);

        if (response.status === 200) {
            const { playerReports, blacklistId } = response.data;
            this.setState({ badBois: playerReports, blacklistId });
            
        } else if (response.status === 401) {
            this.props.dispatch(tokenActions.setToken(""));
            this.props.history.push(`/404`);
        } else {
            this.props.history.push(`/login`);
        }
    }

    async handleAddToBlacklistClick() {
        const { region, realm, character } = this.state;
        if (realm.length === 0 || character.length === 0) {
            return;
        }

        const { token } = this.props;
        const response = await services.addToBlacklist(token, { region, realm, character });

        if (response.status === 200) {
            this.getDashboardData();
        } else {
            if (response.data && response.data.token === "invalid") {
                console.error("addToBlacklist request ERROR: token was invalid");
                //TODO: redux logOut() --> should have side-effect of redirecting to login page
            } else if (response.data && response.data.update === "failed") {
                console.error("addToBlacklist ERROR - data failure", response.data);
            }
        }
    }

    async handleRemoveFromBlacklistClick(row) {
        const { region, realm, character_name } = row;
        const { token } = this.props;
        
        const response = await services.removeFromBlacklist(token, { region, realm, character: character_name });
    
        if (response.status === 200) {
            this.getDashboardData();
        } else {
            if (response.data && response.data.token === "invalid") {
                console.error("removeFromBlacklist request ERROR: token was invalid");
                //TODO: redux logOut() --> should have side-effect of redirecting to login page
            } else if (response.data && response.data.update === "failed") {
                console.error("removeFromBlacklist ERROR - data failure", response.data);
            }
        }
    }

    generateBlacklistShareLink() {
        const { blacklistId } = this.state;
        return `https://www.classicblacklist.com/blacklist/${blacklistId}`;
    }

    handleSearchChange(characterObject) {
        this.setState(characterObject);
    }

    render() {
        const { badBois, boiColumns, blacklistId } = this.state;

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                {blacklistId > 0 &&
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                        <p>Blacklist Share Link: <b>{this.generateBlacklistShareLink()}</b></p>
                        <Tooltip title="Copy to Clipboard">
                            <CopyToClipboard text={this.generateBlacklistShareLink()}>
                                <IconButton style={{ marginLeft: 10, color: "#2196f3" }}>
                                    <CopyIcon style={{ color: STYLING.PRIMARY_COLOR }} />
                                </IconButton>
                            </CopyToClipboard>
                        </Tooltip>
                    </div>
                }

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                    <CharacterSearch handleChange={this.handleSearchChange.bind(this)} />
                    <Button onClick={this.handleAddToBlacklistClick.bind(this)} style={{ alignSelf: "center", margin: 10, backgroundColor: STYLING.PRIMARY_COLOR }}>Add to Blacklist</Button>
                </div>
                
                <div style={{ height: "100%", display: "flex", flexDirection: "column", margin: 25, overflow: "auto" }}>
                    <h3 style={{ alignSelf: "center", margin: 4 }}>Blacklist</h3>
                    <ReactTable
                        data={badBois}
                        columns={boiColumns}
                        defaultPageSize={10}
                        className="-striped -highlight"
                        showPagination={true}
                        filterable
                        defaultFilterMethod={(filter, row) => {
                            return String(row[filter.id].toLowerCase()).includes(filter.value.toLowerCase());
                        }}
                    />
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

export default connect(mapStateToProps)(withRouter(DashboardPage));