import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import capitalize from 'lodash/capitalize';

import "react-table/react-table.css";

import { capitalizeRealm } from '../utils/formatRealm';
import * as services from '../services';

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
    }
];

class PrivateBlacklist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blacklistId: "",
            username: "",
            badBois: [],
        };
    }

    componentDidMount() {
        const { blacklistId } = this.props.match.params;
        this.setState({ blacklistId }, () => {
            this.getPrivateBlacklistData();
        });
    }

    async getPrivateBlacklistData() {
        const { blacklistId } = this.state;
        const response = await services.getPrivateBlacklistData(blacklistId);

        if (response.status === 200) {
            const { playerReports, username } = response.data;
            this.setState({ badBois: playerReports, username });
        } else {
            console.error("Failed to retrieve private blacklist", response);
            this.props.history.push(`/404`);
        }
    }

    navigateToPlayerReport(region, realm, character) {
        this.props.history.push(`/report/${region}/${realm.trim()}/${character.trim()}`);
    }

    handleRowClick(state, rowInfo) {
        if (rowInfo && rowInfo.row) {
            return {
                onClick: event => {
                    const { region, realm, character_name } = rowInfo.row;
                    this.navigateToPlayerReport(region, realm, character_name);
                }
            };
        } else {
            return {};
        }
    }

    render() {
        const { username, badBois } = this.state;

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
               <div style={{ height: "100%", display: "flex", flexDirection: "column", margin: 25, overflow: "auto" }}>
                    {username.length > 0 &&
                        <h3 style={{ alignSelf: "center", margin: 4 }}>{capitalize(username)}'s Blacklist</h3>
                    }
                    
                    <ReactTable
                        data={badBois}
                        columns={boiColumns}
                        defaultPageSize={10}
                        className="-striped -highlight"
                        showPagination={true}
                        getTrProps={this.handleRowClick.bind(this)}
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

export default withRouter(PrivateBlacklist);