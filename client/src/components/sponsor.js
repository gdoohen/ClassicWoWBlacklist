import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircleOutline';

import STYLING from '../styles';

const styles = {
    iconButton: {
        color: STYLING.PRIMARY_COLOR
    },

    disabledIconButton: {
        color: STYLING.PRIMARY_COLOR_DISABLED
    }
};

class Sponsor extends Component {
    render() {
        const { title, instance, sponsors, sponsor } = this.props;

        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <p>{title}: { sponsors[instance] && sponsors[instance].sponsorCount ? sponsors[instance].sponsorCount : 0}</p>
                <Tooltip title={ sponsors[instance] && sponsors[instance].hasSponsored ? "You have already sponsored this player" : "Sponsor player" }>
                <div>   {/* This div is to allow a hover event to be sent to the tooltip when the button is disabled (hover events do not fire for disabled elements). */}
                    <IconButton disabled={sponsors[instance] && sponsors[instance].hasSponsored} onClick={sponsor.bind(this, instance)}>
                        <AddIcon style={sponsors[instance] && sponsors[instance].hasSponsored ? styles.disabledIconButton : styles.iconButton} />
                    </IconButton>
                </div>
                </Tooltip>
            </div>
        );
    }
}

Sponsor.propTypes = {
    title: PropTypes.string.isRequired,
    instance: PropTypes.string.isRequired,
    sponsors: PropTypes.object.isRequired,
    sponsor: PropTypes.func.isRequired
};

export default withRouter(Sponsor);