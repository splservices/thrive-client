import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const styles = {
    avatar: {
        margin: 10,
        width: 50,
        height: 50,
        marginTop:0
    },
    bigAvatar: {
        margin: 10,
        width: 90,
        height: 90,
    },
};

class Comment extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container style={{padding:0}}>
                    <Grid item xs={2}><Avatar alt="Remy Sharp" src="http://mythemestore.com/friend-finder/images/users/user-4.jpg" className={classes.avatar} /></Grid>
                    <Grid item xs={10} style={{paddingRight:10}}>
                        <TextField
                        id="standard-name"
                        placeholder="Write a comment..."
                        className="{}"
                        style={{width:'100%', marginTop:10}}
                        value=""
                        margin="normal"
                    />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={2}><Avatar alt="Remy Sharp" src="http://mythemestore.com/friend-finder/images/users/user-4.jpg" className={classes.avatar} /></Grid>
                    <Grid item xs={10}>
                        <Typography variant="body2" gutterBottom>
                            Thank you for this. A suggestion if I may - other people's health (physical and mental) is not my responsibility either unless I'm a certified medical care provider who is treating them.
                        </Typography>
                       </Grid>
                </Grid>
            </div>
        );
    }
}

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);