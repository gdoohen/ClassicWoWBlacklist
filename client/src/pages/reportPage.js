import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import SubtractIcon from '@material-ui/icons/RemoveCircleOutline';

import Sponsor from '../components/sponsor';
import * as services from '../services';
import { capitalizeRealm } from '../utils/formatRealm';
import STYLING from '../styles';

const AUTO_REFRESH_DELAY = 15000; // Delay in ms

const styles = {
    iconButton: {
        color: STYLING.PRIMARY_COLOR
    },

    disabledIconButton: {
        color: STYLING.PRIMARY_COLOR_DISABLED
    }
};

class ReportPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoRefresh: false,
            region: "",
            realm: "",
            character: "",
            goodBoiPoints: 0,
            badBoiPoints: 0,
            hasVotedGood: false,
            hasVotedBad: false,
            sponsors: {}
        };
    }

    componentDidMount() {
        const { region, realm, character } = this.props.match.params;
        this.setState({ region, realm, character }, () => {
            this.getReport();
        });
    }

    async getReport() {
        const { region, realm, character } = this.state;
        const response = await services.getReport(region, realm, character);

        if (response.status === 200) {
            this.setState(response.data);
        } else {
            this.props.history.push(`/404`);
        }
    }

    voteGood() {
        const { region, realm, character } = this.state;
        services.voteGood(region, realm, character).then(() => {
            this.getReport();
        });
    }

    voteBad() {
        const { region, realm, character } = this.state;
        services.voteBad(region, realm, character).then(() => {
            this.getReport();
        });
    }

    sponsor(instance) {
        const { region, realm, character } = this.state;
        services.sponsor(region, realm, character, instance).then(() => {
            this.getReport();
        });
    }

    toggleAutoRefresh() {
        this.setState({ autoRefresh: !this.state.autoRefresh }, () => {
            this.autoRefresh();
        });
    }

    autoRefresh() {
        if (this.state.autoRefresh) {
            this.getReport().then(() => {
                setTimeout(this.autoRefresh.bind(this), AUTO_REFRESH_DELAY);
            });
        }
    }

    render() {
        const { autoRefresh, region, character, realm, goodBoiPoints, badBoiPoints, hasVotedGood, hasVotedBad, sponsors } = this.state;

        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginBottom: 25, overflowY: "auto" }}>
                <FormGroup row style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", width: "100%" }}>
                    <FormControlLabel
                        control={
                            <Switch checked={autoRefresh} value={autoRefresh} onChange={this.toggleAutoRefresh.bind(this)} />
                        }
                        label="Auto-Refresh"
                    />
                </FormGroup>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <p style={{ marginRight: 10 }}><b>Realm:</b>({region}) {capitalizeRealm(realm)}</p>
                        <p><b>Character:</b> {character}</p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <ThumbUpIcon  style={{ marginTop: 10, marginRight: 10, color: "green" }} />
                        <p>Good Boi Points: {goodBoiPoints}</p>
                        <Tooltip title={ hasVotedGood ? "You have already up voted this player" : "Up vote this player" }>
                            <div>   {/* This div is to allow a hover event to be sent to the tooltip when the button is disabled (hover events do not fire for disabled elements). */}
                                <IconButton disabled={hasVotedGood} onClick={this.voteGood.bind(this)}>
                                    <AddIcon style={hasVotedGood ? styles.disabledIconButton : styles.iconButton} />
                                </IconButton>
                            </div>
                        </Tooltip>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <ThumbDownIcon style={{ marginTop: 13, marginRight: 10, color: "red" }} />
                        <p>Bad Boi Points: {badBoiPoints}</p>
                        <Tooltip title={ hasVotedBad ? "You have already down voted this player" : "Down vote this player" }>
                            <div>   {/* This div is to allow a hover event to be sent to the tooltip when the button is disabled (hover events do not fire for disabled elements). */}
                                <IconButton disabled={hasVotedBad} onClick={this.voteBad.bind(this)}>
                                    <SubtractIcon style={hasVotedBad ? styles.disabledIconButton : styles.iconButton} />
                                </IconButton>
                            </div>
                        </Tooltip>
                    </div>
                </div>
                
                {sponsors &&
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", border: "1px solid gray", padding: 15 }} >
                            <h4 style={{ alignSelf: "center", margin: 0 }}>Sponsorships:</h4>

                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginRight: 50 }}>
                                    <p style={{ alignSelf: "center", textDecoration: "underline" }}>Dungeons</p>

                                    <Sponsor title="Temple of Atal'Hakkar" instance="temple_of_atalhakkar" sponsors={sponsors} sponsor={this.sponsor.bind(this)} />

                                    <Sponsor title="Blackrock Depths" instance="blackrock_depths" sponsors={sponsors} sponsor={this.sponsor.bind(this)} />

                                    <Sponsor title="Lower Blackrock Spire" instance="lower_blackrock_spire" sponsors={sponsors} sponsor={this.sponsor.bind(this)} />

                                    <Sponsor title="Upper Blackrock Spire" instance="upper_blackrock_spire" sponsors={sponsors} sponsor={this.sponsor.bind(this)} />

                                    <Sponsor title="Dire Maul" instance="dire_maul" sponsors={sponsors} sponsor={this.sponsor.bind(this)} />

                                    <Sponsor title="Scholomance" instance="scholomance" sponsors={sponsors} sponsor={this.sponsor.bind(this)} />

                                    <Sponsor title="Stratholme" instance="stratholme" sponsors={sponsors} sponsor={this.sponsor.bind(this)} />
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                    <p style={{ alignSelf: "center", textDecoration: "underline" }}>Raids</p>

                                    <Sponsor title="Molten Core" instance="molten_core" sponsors={sponsors} sponsor={this.sponsor.bind(this)} />

                                    <Sponsor title="Onyxia's Lair" instance="onyxias_lair" sponsors={sponsors} sponsor={this.sponsor.bind(this)} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(ReportPage);