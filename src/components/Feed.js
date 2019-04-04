import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import NavNewsFeed from "./NavNewsFeed";
import FollowMe from "./FollowMe";
import CreatePost from "./CreatePost";
import Post from "./Post";
import Hidden from "@material-ui/core/Hidden";
import { connect } from 'react-redux';
import { getPosts } from "../actions/postActions";

const styles = theme => ({
    root: {
        flexGrow: 1
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

class Feed extends Component {
    componentWillMount() {
        this.props.getPosts();

    }

    componentDidMount() {

        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login')
        }
    }

    render() {
        const { classes } = this.props;
        const renderPosts =  this.props.feed.feeds.map(item=>{
            return (<Post item={item}/>)
        });
        return (
            <main className={classes.layout} style={{marginTop:20}}>
                <Grid container  className={classes.root} spacing={24}>
                    <Hidden only="xs">
                        <Grid item xs={12} sm={2} >
                            <NavNewsFeed/>
                        </Grid>
                    </Hidden>

                    <Grid item xs={12} sm={6}>

                        <CreatePost/>
                        {renderPosts}

                    </Grid>
                    <Hidden only="xs">
                        <Grid item xs={12} sm={4}>
                            <FollowMe/>
                        </Grid>
                    </Hidden>

                </Grid>
            </main>

        );
    }
}

const mapStateToProps = (state)=>({
    auth:state.auth,
    feed:state.feed,
    snackbar: state.snackbar
});

Feed.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {getPosts})(withStyles(styles)(Feed));