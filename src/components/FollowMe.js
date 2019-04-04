import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {ListItemSecondaryAction} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {connect} from "react-redux";
import {followUser, getUser, unfollowUser} from "../actions/userActions";

const styles = theme => ({
    root: {
        position:'sticky',
        top:0,
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});

class FollowMe extends React.Component {
    state = {
        alignment: 'left',
        formats: ['bold'],
    };

    componentWillMount() {
        //this.props.getPosts();

    }

    render(){
        const { classes } = this.props;
        const { alignment, formats } = this.state;
        return (
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Pradeep"
                    />

                    <ListItemSecondaryAction>
                        <ToggleButtonGroup value={formats} onChange={this.handleFormat}>
                            <ToggleButton size="small" value="bold" style={{fontSize:10}}>
                                Follow
                            </ToggleButton>
                            <ToggleButton value="italic" >
                                <CloseIcon style={{padding:0}}/>
                            </ToggleButton>

                        </ToggleButtonGroup>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Summer BBQ"
                    />
                    <ListItemSecondaryAction>
                        <ToggleButtonGroup value={formats} onChange={this.handleFormat}>
                            <ToggleButton size="small" value="bold" style={{fontSize:10}}>
                                Follow
                            </ToggleButton>
                            <ToggleButton value="italic" >
                                <CloseIcon style={{padding:0}}/>
                            </ToggleButton>

                        </ToggleButtonGroup>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/3.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Oui Oui"
                    />
                    <ListItemSecondaryAction>
                        <ToggleButtonGroup value={formats} onChange={this.handleFormat}>
                            <ToggleButton size="small" value="bold" style={{fontSize:10}}>
                                Follow
                            </ToggleButton>
                            <ToggleButton value="italic" >
                                <CloseIcon style={{padding:0}}/>
                            </ToggleButton>

                        </ToggleButtonGroup>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        );
    }

}

FollowMe.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FollowMe);

//export default connect(mapStateToProps, {getUser, followUser, unfollowUser})(withStyles(styles)(Profile));
