import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import { connect } from 'react-redux';
import { createPost } from "../actions/postActions";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            post:{
                image:null,
                text:''
            }
        }

    }

    showPreview = (e)=>{
        let file = this.refs.file.files[0];
        let reader = new FileReader();
        let url = reader.readAsDataURL(file);

        let post = this.state.post;


        reader.addEventListener("load", function () {
            post.image = reader.result;
                this.setState({
                    post
                })

        }.bind(this), false)

    };

    handleChange =(e)=>{
        let post = this.state.post;
        post.text = e.target.value;
        this.setState({
            post
        })
    };

    onSubmit = (e)=>{
        e.preventDefault();
        this.props.createPost(this.state.post.text)
    };

    render() {
        const { classes } = this.props;
        return (
            <form onSubmit={this.onSubmit}>
                {this.state.text}
                <TextField id="time" multiline={true} onChange={this.handleChange} placeholder='Click here to share and update....'  style={{width:'100%'}}  rows={2}
                           rowsMax={4} />
                <Grid container>
                    <Grid item xs={7}>
                        <img src={this.state.post.image} style={{width:60, maxHeight:60}}/>
                    </Grid>
                    <Grid item xs={5}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            ref="file"
                            name="face"
                            multiple
                            onChange={this.showPreview}
                            type="file"
                        />
                        <label htmlFor="raised-button-file">
                            <svg style={{width:40, height:40,float:'left', cursor:'pointer', marginTop:20, marginRight:10}} viewBox="0 0 24 24">
                                <path fill="#3f51b5" d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z" />
                            </svg>
                        </label>

                        <Button type="submit" color="primary"  variant="contained" size='large'  style={{ float:'left', margin:0,marginTop:20}}  className={classes.button} >
                            Share
                            <Icon className={classes.rightIcon}>send</Icon>
                        </Button>
                    </Grid>
                </Grid>

            </form>
        );
    }
}


CreatePost.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(null, {createPost})(withStyles(styles)(CreatePost))