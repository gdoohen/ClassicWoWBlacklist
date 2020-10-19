import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import capitalize from 'lodash/capitalize';

import "../styles/tableWithoutPaging.css";

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import SearchIcon from '@material-ui/icons/ArrowRightAlt';

import CharacterSearch from '../components/characterSearch';

import * as services from '../services';
import { capitalizeRealm } from '../utils/formatRealm';
import STYLING from '../styles';

const PLACEHOLDER_BOI = {
    region: "US",
    realm: "Placeholder",
    character: "Placeholder",
    goodBoiPoints: 0,
    badBoiPoints: 0
};

const topTenGoodBoiColumns = [
    {
        Header: "Rank",
        accessor: "rank",
        width: 55
    },
    {
        Header: "Region",
        accessor: "region",
        width: 65
    },
    {
        Header: "Realm",
        accessor: "realm",
        width: 150
    },
    {
        Header: "Character",
        accessor: "character",
        width: 150
    },
    {
        Header: "Good Boi Points",
        accessor: "goodBoiPoints",
        width: 125
    }
];

// const topTenBadBoiColumns = [
//     {
//         Header:"Rank",
//         accessor: "rank",
//         width: 55
//     },
//     {
//         Header:"Region",
//         accessor: "region",
//         width: 65
//     },
//     {
//         Header:"Realm",
//         accessor: "realm",
//         width: 150
//     },
//     {
//         Header:"Character",
//         accessor: "character",
//         width: 150
//     },
//     {
//         Header:"Bad Boi Points",
//         accessor: "badBoiPoints",
//         width: 125
//     }
// ];

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: "US",
            realm: "",
            character: "",
            topTenGoodBois: [],
            topTenBadBois: []
        };
    }

    componentDidMount() {
        this.getTopTens();
    }

    async getTopTens() {
        const topTensResponse = await services.getTopTens();

        if (topTensResponse.status !== 200) {
            console.error("Failed to retrieve top tens =(", topTensResponse);
            return;
        }

        const { topTenGoodBoiReports = [], topTenBadBoiReports = [[]] } = topTensResponse.data;

        let topTenGoodBois = topTenGoodBoiReports.map((report, index) => {
            const { region, realm, character_name, count } = report;
            return { rank: index + 1, region, realm, character: character_name, goodBoiPoints: count };
        });

        if (topTenGoodBois.length < 10) { //TODO: This can be removed when I refactor the database to use foreign keys for good_boi_points so that there aren't points for player_reports that no longer exist because they were deleted because of twitch users.
            for (let i = topTenGoodBois.length + 1; i <= 10; i++) {
                topTenGoodBois.push(Object.assign({ rank: i }, PLACEHOLDER_BOI));
            }
        }

        let topTenBadBois = topTenBadBoiReports.map((report, index) => {
            const { region, realm, character_name, count } = report;
            return { rank: index + 1, region, realm, character: character_name, badBoiPoints: count };
        });

        if (topTenBadBois.length < 10) { //TODO: This can be removed when I refactor the database to use foreign keys for bad_boi_points so that there aren't points for player_reports that no longer exist because they were deleted because of twitch users.
            for (let i = topTenBadBois.length + 1; i <= 10; i++) {
                topTenBadBois.push(Object.assign({ rank: i }, PLACEHOLDER_BOI));
            }
        }

        const formattedTopTenGoodBois = topTenGoodBois.map(goodBoi => {
            return {
                rank: goodBoi.rank,
                region: goodBoi.region,
                realm: capitalizeRealm(goodBoi.realm),
                character: capitalize(goodBoi.character),
                goodBoiPoints: goodBoi.goodBoiPoints
            };
        });

        const formattedTopTenBadBois = topTenGoodBois.map(badBoi => {
            return {
                rank: badBoi.rank,
                region: badBoi.region,
                realm: capitalizeRealm(badBoi.realm),
                character: capitalize(badBoi.character),
                badBoiPoints: badBoi.badBoiPoints
            };
        });

        this.setState({ topTenGoodBois: formattedTopTenGoodBois, topTenBadBois: formattedTopTenBadBois });
    }

    handleSearchChange(characterObject) {
        this.setState(characterObject);
    }

    handleFetchPlayerReport() {
        const { region, realm, character } = this.state;
        if (realm.length > 0 && character.length > 0) {
            this.navigateToPlayerReport(region, realm, character);
        }
    }

    navigateToPlayerReport(region, realm, character) {
        this.props.history.push(`/report/${region}/${realm.trim()}/${character.trim()}`);
    }

    handleKeyPress(event) {
        if (event.key === "Enter") {
            this.handleFetchPlayerReport();
        }
    }

    handleRowClick(state, rowInfo) {
        if (rowInfo && rowInfo.row) {
            return {
                onClick: event => {
                    const { region, realm, character } = rowInfo.row;
                    this.navigateToPlayerReport(region, realm, character);
                }
            };
        } else {
            return {};
        }
    }

    render() {
        const { topTenGoodBois } = this.state;

        return (
            <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", overflowY: "auto" }} >
                <div onKeyPress={this.handleKeyPress.bind(this)} style={{ display: "flex", flexDirection: "row", alignItems: "center", alignSelf: "center", marginBottom: "5vh" }}>
                    <CharacterSearch handleChange={this.handleSearchChange.bind(this)} />
                    <Tooltip title="Search">
                        <IconButton onClick={this.handleFetchPlayerReport.bind(this)} style={{ marginLeft: 10, marginTop: 10, color: "#2196f3" }}>
                            <SearchIcon style={{ color: STYLING.PRIMARY_COLOR }} />
                        </IconButton>
                    </Tooltip>
                </div>

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <div style={{ display: "flex", flexDirection: "column", margin: 5, overflow: "auto" }}>
                        <h3 style={{ alignSelf: "center", margin: 4 }}>Top Ten Good Bois</h3>
                        <ReactTable
                            data={topTenGoodBois}
                            columns={topTenGoodBoiColumns}
                            defaultPageSize={10}
                            className="-striped -highlight"
                            showPagination={false}
                            getTrProps={this.handleRowClick.bind(this)}
                        />
                    </div>

                    {/* <div style={{ display: "flex", flexDirection: "column", margin: 5, overflow: "auto" }}>
                        <h3 style={{ alignSelf: "center", margin: 4 }}>Top Ten Bad Bois</h3>
                        <ReactTable
                            data={topTenBadBois}
                            columns={topTenBadBoiColumns}
                            defaultPageSize={10}
                            className="-striped -highlight"
                            showPagination={false}
                            getTrProps={this.handleRowClick.bind(this)}
                        />
                    </div> */}
                </div>
            </div>
        );
    }
}

export default withRouter(HomePage);