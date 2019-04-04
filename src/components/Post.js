import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PostHeader from "./PostHeader";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Comment from "./Comment";


const styles = theme => ({
    root: {
        flexGrow: 1
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

    post:{
        img:{
            width:'100%'
        }
    },

});

class Post extends Component {
    render() {
        console.log(`in the post component`)
        console.log(this.props)
        const {item} = this.props;
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.postContent} style={{marginTop:20}}>
                    <PostHeader headerAttrs = {item.creator}/>
                    {/*<img style={{width:'100%'}} alt='post' src={'http://mythemestore.com/friend-finder/images/post-images/1.jpg'} />*/}
                    <div className={classes.postContainer}>
                        {item.content}
                    </div>
                    <Grid container spacing={0} style={{paddingLeft:15, paddingRight:15}}>
                    <Grid item xs={2}>
                    <svg style={{width:24, height:24, marginBottom:10, marginRight:10}} viewBox="0 0 24 24">
                    <path fill="#3f51b5" d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z" />
                    </svg>

                    <svg style={{width:24, height:24, marginBottom:10}} viewBox="0 0 24 24">
                    <path fill="#3f51b5" d="M21,11L14,4V8C7,9 4,14 3,19C5.5,15.5 9,13.9 14,13.9V18L21,11Z" />
                    </svg>

                    {/*<svg style={{width:24, height:24}} viewBox="0 0 24 24">*/}
                    {/*<path fill="#3f51b5" d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" />*/}
                    {/*</svg>*/}

                    </Grid>
                    <Grid item xs={2}>


                    </Grid>
                    <Grid item xs={4}></Grid>
                    </Grid>
                    <div className={classes.linedivider}></div>
                    <Comment/>
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);
