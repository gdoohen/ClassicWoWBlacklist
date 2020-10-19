import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import STYLING from '../../styles';
import SERVERS from './servers.json';

import "./characterSearch.css";

const styles = {
    reactSelect: {
        width: 200,
        alignSelf: "flex-end",
        marginLeft: 10,

        "& :hover": {
            borderColor: `${STYLING.PRIMARY_COLOR} !important`,
        },

        "& .react-select__control": {
            backgroundColor: STYLING.PRIMARY_BACKGROUND_COLOR,
            borderColor: "black",
        },

        "& .react-select__control--is-focused": {
            backgroundColor: STYLING.PRIMARY_BACKGROUND_COLOR,
            borderColor: `${STYLING.PRIMARY_COLOR} !important`,
            boxShadow: `0 0 0 1px ${STYLING.PRIMARY_COLOR}`
        },

        "& .react-select__indicator": {
            color: STYLING.PRIMARY_COLOR
        },

        "& .react-select__indicator:hover": {
            color: STYLING.PRIMARY_COLOR
        },

        "& .react-select__indicator-separator": {
            backgroundColor: "black"
        }
    },

    textInput: {
        "& label.Mui-focused": {
            color: "black"
        },

        "& .MuiInput-underline:hover:before": {
            borderBottomColor: "yellow"
        },

        "& .MuiInput-underline:before": {
            borderBottomColor: "black"
        },
        
        "& .MuiInput-underline:after": {
            borderBottomColor: "yellow"
        }
    }
};

class CharacterSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: "US",
            realm: "",
            character: ""
        };
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value }, () => {
            if (this.props.handleChange) {
                const { region, realm, character } = this.state;
                this.props.handleChange({ region, realm, character });
            }
        });
    }

    handleSelectChange(value) {
        this.setState({ realm: value.value }, () => {
            if (this.props.handleChange) {
                const { region, realm, character } = this.state;
                this.props.handleChange({ region, realm, character });
            }
        });
    }

    generateSelectOptions(region) {
        return SERVERS[region].map(server => {
            return { value: server, label: server };
        });
    }

    render() {
        const { classes } = this.props;
        const { region, character, realm } = this.state;
        const selectOptions = this.generateSelectOptions(region);

        return (
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", alignSelf: "center" }} >
                <FormControl>
                    <InputLabel style={{ color: "gray" }}>Region</InputLabel>
                    <Select
                        value={region}
                        onChange={this.handleChange("region")}
                        variant="outlined"
                    >           
                        <MenuItem value="US">US</MenuItem>
                        <MenuItem value="EU">EU</MenuItem>
                        <MenuItem value="OC">OC</MenuItem>
                    </Select>
                </FormControl>

                <ReactSelect
                    value={{ value: realm, label: realm }}
                    onChange={this.handleSelectChange.bind(this)}
                    options={selectOptions}
                    className={classes.reactSelect}
                    classNamePrefix={"react-select"}
                />

                <TextField
                    label="Character"
                    value={character}
                    onChange={this.handleChange("character")}
                    style={{ marginLeft: 10 }}
                    classes={{ root: classes.textInput }}
                />
            </div>
        );
    }
}

CharacterSearch.propTypes = {
    handleChange: PropTypes.func
};

export default withRouter(withStyles(styles)(CharacterSearch));
