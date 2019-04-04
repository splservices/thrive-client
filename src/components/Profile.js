import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { connect } from 'react-redux';
import { getUser, followUser, unfollowUser } from "../actions/userActions";
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    bigAvatar: {
        margin: 10,
        width: 90,
        height: 90,
    },
    layout:{
        [theme.breakpoints.up(900+theme.spacing.unit * 3 * 2)]:{
            width:1050,
            marginLeft:'auto',
            marginRight:'auto'
        }
    },
    linedivider: {
        background: 'none',
        height: '1px',
        borderTop: '1px solid #e6e6e6',
        width: '100%',
        margin: 'auto',
        marginBottom: '10px'
    },
    postContent :{
        background: '#f8f8f8',
        borderRadius: 4,
        width: '100%',
        border: '1px solid #f1f2f2',
        marginBottom: 20,
        overflow: 'hidden',
        position: 'relative'
    }   ,
    postContainer:{
        padding:20
    },
    paper: {
        padding: theme.spacing.unit * 2,
    },
    post:{
        img:{
            width:'100%'
        }
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});


class Profile extends Component {
    state = {
        value: 0,
    };
    followUser = ()=>{
        this.props.followUser(this.props.userPage.userPage.data.username);
    };
    unfollowUser = ()=>{
        this.props.unfollowUser(this.props.userPage.userPage.data.username);
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    componentWillMount() {
       const { match }  = this.props;
       const { params} = match;
        this.props.getUser(params.userId);

    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login')
        }
    }

    render() {
        const { classes } = this.props;
        const { userPage } = this.props;
        const { data } = userPage.userPage;
        const { followers, following, alreadyFollowing, self } = userPage.userPage;
        const { value } = this.state;
        const renderFollowers =  followers.map(item=>{
            return (<p>{item.name}</p>)
        });
        const renderFollowing =  following.map(item=>{
            return (<p>{item.name}</p>)
        });
        return (
            <main className={classes.layout} style={{marginTop:20}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>

                            {data &&
                            <div>
                                <Grid container>
                                    <Grid item xs={2}>
                                        <Avatar alt="Remy Sharp" src={data.face} className={classes.bigAvatar} />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <p>{data.name}</p>
                                        <p>{data.username}</p>
                                        { self ? (''):alreadyFollowing?<Button onClick={this.unfollowUser} variant="contained" color="primary" className={classes.button}>Unfollow</Button>:<Button onClick={this.followUser} variant="contained" color="primary" className={classes.button}>Follow</Button>}

                                    </Grid>
                                </Grid>

                            </div>

                            }
                        </Paper>
                    </Grid>
                    <Grid container>
                        <AppBar position="static">
                            <Tabs value={value} onChange={this.handleChange}>
                                <Tab label="Timeline" />
                                <Tab label="Activities" />
                                <Tab label="Profile" />
                                <Tab label="Followers" />
                                <Tab label="Following" />
                            </Tabs>
                        </AppBar>
                        {value === 0 &&  <Typography component="div" style={{ padding: 8 * 3 }}>
                            Timeline
                        </Typography>}
                        {value === 1 &&  <Typography component="div" style={{ padding: 8 * 3 }}>
                            Activities
                        </Typography>}

                        {value === 2 &&  <Typography component="div" style={{ padding: 8 * 3 }}>
                            Profile
                        </Typography>}

                        {value === 3 &&  <Typography component="div" style={{ padding: 8 * 3 }}>

                            {renderFollowers}
                        </Typography>}

                        {value === 4 &&  <Typography component="div" style={{ padding: 8 * 3 }}>
                            {renderFollowing}
                        </Typography>}


                    </Grid>
                </Grid>
            </main>

        );
    }
}

const mapStateToProps = (state)=>({
    auth:state.auth,
    feed:state.feed,
    userPage:state.userPage,
    snackbar: state.snackbar
});

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {getUser, followUser, unfollowUser})(withStyles(styles)(Profile));