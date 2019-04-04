import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from "@material-ui/core/IconButton";

const styles = {
    avatar: {
        margin: 10,
        width: 50,
        height: 50,
    },
    bigAvatar: {
        margin: 10,
        width: 90,
        height: 90,
    },
};
const options = [
    'None',
    'Atria',
    'Callisto',
];
const ITEM_HEIGHT = 48;
class PostHeader extends Component {
    state = {
        anchorEl: null,
    };
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const { classes, headerAttrs } = this.props;
        return (
            <div>
                <Grid container>
                    <Grid item xs={2}>
                        <Avatar alt="Remy Sharp" src={headerAttrs.face} className={classes.avatar} />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h6" gutterBottom style={{marginTop:10, marginBottom:0}}>
                            {headerAttrs.name}
                        </Typography>
                        <Typography variant="caption" gutterBottom>3 hrs</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            aria-label="More"
                            aria-owns={open ? 'long-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            style={{float:'right', marginTop:8}}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={this.handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: 200,
                                },
                            }}
                        >
                            {options.map(option => (
                                <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleClose}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

PostHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostHeader);