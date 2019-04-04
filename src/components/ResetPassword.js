import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Link as RouterLink } from 'react-router-dom';
import Hidden from "@material-ui/core/Hidden";
import { connect } from 'react-redux';
import { loginUser } from "../actions/authActions";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import {openSnackbar}  from "./Notifier";
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'lodash';
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Redirect } from 'react-router-dom'

const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

function arrowGenerator(color) {
    return {
        '&[x-placement*="bottom"] $arrow': {
            top: 0,
            left: 0,
            marginTop: '-0.95em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '0 1em 1em 1em',
                borderColor: `transparent transparent ${color} transparent`,
            },
        },
        '&[x-placement*="top"] $arrow': {
            bottom: 0,
            left: 0,
            marginBottom: '-0.95em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '1em 1em 0 1em',
                borderColor: `${color} transparent transparent transparent`,
            },
        },
        '&[x-placement*="right"] $arrow': {
            left: 0,
            marginLeft: '-0.95em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent ${color} transparent transparent`,
            },
        },
        '&[x-placement*="left"] $arrow': {
            right: 0,
            marginRight: '-0.95em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 0 1em 1em',
                borderColor: `transparent transparent transparent ${color}`,
            },
        },
    };
}

const styles = theme => ({

    root: {
        flexGrow: 1,
        minHeight:'100vh',
    },
    paper: {
        textAlign:'center'
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    button:{
        marginTop: 20
    },
    text:{
        position:'relative',
        marginTop:10
    },
    error:{

    },
    arrow: {
        position: 'absolute',
        fontSize: 6,
        width: '3em',
        height: '3em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
    },
    bootstrapPopper: arrowGenerator(theme.palette.common.black),
    bootstrapTooltip: {
        backgroundColor: theme.palette.common.black,
    },
    bootstrapPlacementLeft: {
        margin: '0 8px',
    },
    bootstrapPlacementRight: {
        margin: '0 8px',
    },
    bootstrapPlacementTop: {
        margin: '8px 0',
    },
    bootstrapPlacementBottom: {
        margin: '8px 0',
    }
});


class ResetPassword extends Component {
    constructor(props){
        super(props);

        this.state ={
            arrowRef:null,
            user:{
                email:'',
                password:''
            },
            loading:false,
            remember:false,
            formErrors:{
                email:{
                    invalid:false,
                    touched:false,
                    message:''
                },
                password:{
                    invalid:false,
                    touched:false,
                    message:''
                }
            }
        };

    }

    onSubmit = (e)=>{
        e.preventDefault();

        let valid = true;
        _.forOwn(this.state.user,(value, key)=>{
            if(!value.length){
                //Blank Form
                let formErrors = {...this.state.formErrors};
                formErrors[key]['invalid'] = true;
                formErrors[key]['message'] = 'Required';
                this.setState({formErrors});
                valid = false;
            }else{
                //Filled Form
                const filteredErrors = _.filter(this.state.formErrors, (o)=>{
                    return o.invalid
                });
                valid = (!_.size(filteredErrors));
            }
        });
        if(valid){
            let {user} = this.state;
            this.setState({
                loading:true
            });
            this.props.loginUser(user, this.props.history,openSnackbar);
        }
    };

    handleChange = (e)=>{
        const {name, value} = e.target;

        let formErrors = this.state.formErrors;
        switch(name){
            case 'email':
                formErrors.email.message = emailRegex.test(value) && value.length > 0  ? '':'Invalid Email';
                formErrors.email.invalid = !!(!emailRegex.test(value) && value.length) ;
                break;
            case 'password':
                formErrors.password.invalid = !value.length;
                formErrors.password.message = value.length ? '': 'Required';
                break;
            default:
                break;

        }

        let user = this.state.user;
        user[name] = value;

        this.setState({
            formErrors, user
        })
    };

    handleArrowRef = (node)=>{
        this.setState({
            arrowRef:node
        })
    };

    onFocusChange = e=>{
        const {name} = e.target;
        let formErrors = this.state.formErrors;
        formErrors[name]['touched'] = true;
        this.setState({
            formErrors
        })
    };
    onBlurChange = e=>{
        const {name} = e.target;
        let formErrors = this.state.formErrors;
        formErrors[name]['touched'] = false;
        this.setState({
            formErrors
        })
    };

    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/profile')
        }
    }

    render() {
        const { classes } = this.props;
        const { formErrors } = this.state;
        const { user } = this.props.auth;
        return (

            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Hidden only="xs">
                        <Grid item xs={12} sm={6}>
                            <div className="captionBox">
                                <Typography style={{color:'white'}} variant="h4" gutterBottom>
                                    Volupn
                                </Typography>
                                <Typography style={{color:'white'}}  variant="subtitle1" gutterBottom>
                                    subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                                </Typography>
                            </div>
                        </Grid>
                    </Hidden>

                    <Grid item xs={12} sm={6}>
                        <div className="authWrapper">
                            <div className="authInnerWrapper">
                                <div className="authBox">
                                    <Typography variant="h4" gutterBottom style={{marginTop:20}}>
                                        Reset Password
                                    </Typography>
                                    {/*<Button href="/api/auth/google" variant="contained" color="primary" fullWidth={true} size='large'>Login with Google</Button>*/}
                                    <form onSubmit={this.onSubmit}>

                                        <FormControl className={classes.text} fullWidth >
                                            <InputLabel htmlFor="email">Email</InputLabel>
                                            <Input
                                                id="email"
                                                className={classes.error}
                                                name="email"
                                                value={this.state.user.email}
                                                onChange={this.handleChange}
                                                onFocus={this.onFocusChange}
                                                onBlur={this.onBlurChange}
                                                error={formErrors.email.invalid}
                                                noValidate
                                            />
                                            <Tooltip
                                                classes={{
                                                    popper:classes.bootstrapPopper,
                                                    tooltip:classes.bootstrapTooltip,
                                                    tooltipPlacementRight: classes.bootstrapPlacementRight,

                                                }}
                                                PoppersProps={{
                                                    popperOptions:{
                                                        modifiers:{
                                                            arrow:{
                                                                enabled: Boolean(this.state.arrowRef),
                                                                element: this.state.arrowRef,
                                                            }
                                                        }
                                                    }
                                                }}
                                                placement="right"
                                                open={formErrors.email.invalid && formErrors.email.touched}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={<React.Fragment><span className={classes.arrow} ref={this.handleArrowRef} />{formErrors.email.message}</React.Fragment>}
                                                error={formErrors.password.invalid}
                                            ><i style={{position:'absolute', top:30, right:0}}></i></Tooltip>
                                        </FormControl>



                                        <Button type="submit" disabled={this.props.auth.isLoading} variant="contained" color="primary" fullWidth={true} size='large' className={classes.button}>
                                            Reset {this.props.auth.isLoading && <CircularProgress size={24} className={classes.progress} style={{marginLeft:10}} color="secondary" />}

                                        </Button>

                                    </form>
                                </div>
                            </div>


                        </div>

                    </Grid>

                </Grid>
            </div>


        );
    }
}

const mapStateToProps = (state)=>({
    auth:state.auth,
    snackbar: state.snackbar
});

ResetPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { loginUser })(withStyles(styles)(ResetPassword)) ;