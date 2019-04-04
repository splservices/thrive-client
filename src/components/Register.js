import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import { registerUser} from "../actions/authActions";
import _ from 'lodash';
import {openSnackbar} from "./Notifier";
import CircularProgress from "@material-ui/core/CircularProgress";
import Hidden from "@material-ui/core/Hidden";

const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const usernameRegex = /^[a-zA-Z0-9]+$/;
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
        marginTop:10
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

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spacing: '16',
            loading:false,
            redirect:false,
            name:'',
            username:'',
            email:'',
            password:'',
            ConfirmPassword:'',
            user:{
                name:'',
                username:'',
                email:'',
                password:'',
                confirmPassword:''
            },
            formErrors:{
                name:{
                    invalid:false,
                    touched:false,
                    message:''
                },
                username:{
                    invalid:false,
                    touched:false,
                    message:''
                },
                email:{
                    invalid:false,
                    touched:false,
                    message:''
                },
                password:{
                    invalid:false,
                    touched:false,
                    message:''
                },
                confirmPassword:{
                    invalid:false,
                    touched:false,
                    message:''
                }
            }
        };

    }

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

    handleChange = (e)=> {
        const {name, value} = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case 'name':
                formErrors.name.message = value.length < 3 ? 'Minimum 3 Characters required' : '';
                formErrors.name.invalid = value.length < 3;
                break;
            case 'username':

                let usernameMessage  = (value.length < 5 || !usernameRegex.test(value)) ? 'Invalid Username':'';
                let usernameInvalid = (value.length < 5 || !usernameRegex.test(value));

                formErrors.username.message = usernameMessage;
                formErrors.username.invalid = usernameInvalid;
                break;
            case 'email':
                formErrors.email.message = emailRegex.test(value) && value.length > 0  ? '':'Invalid Email';
                formErrors.email.invalid = !emailRegex.test(value) && value.length > 0 ;
                break;
            case 'password':
                let passwordMessage = '';
                let passwordInvalid;
                if (value.length < 5) {
                    passwordMessage = 'Minimum 5 Characters required';
                    passwordInvalid = true;
                } else if (value !== this.state.user.confirmPassword) {
                    passwordMessage = 'Password do not match';
                    passwordInvalid = true;
                } else {
                    passwordMessage = '';
                    passwordInvalid = false;
                    formErrors.confirmPassword.message = passwordMessage;
                    formErrors.confirmPassword.invalid = passwordInvalid;
                }
                formErrors.password.message = passwordMessage;
                formErrors.password.invalid = passwordInvalid;
                break;
            case 'confirmPassword':
                let confirmMessage = '';
                let confirmInvalid = false;
                if(value.length < 5){
                    confirmMessage = 'Minimum 5 Characters required' ;
                    confirmInvalid = true;
                }else if(value !== this.state.user.password){
                    confirmMessage = 'Password do not match';
                    confirmInvalid = true;
                }else{
                    confirmMessage = '';
                    confirmInvalid = false;
                    formErrors.password.message = confirmMessage;
                    formErrors.password.invalid = confirmInvalid;
                }
                formErrors.confirmPassword.message = confirmMessage;
                formErrors.confirmPassword.invalid = confirmInvalid;
                break;
            default:
                break;

        }
        let user = this.state.user;
        user[name] = value;
        this.setState({
            formErrors,
            user
        },()=>{
        })
    };
    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/feed')
        }
    }


    onSubmit = (e)=>{
        e.preventDefault();
        let valid = true;

        _.forOwn(this.state.user, (value, key)=>{
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

            let newUser = {name:this.state.user.name, username:this.state.user.username, email:this.state.user.email, password:this.state.user.password};
            this.props.registerUser(newUser, this.props.history, openSnackbar);

        }

    };



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

                    <Grid item  xs={12} sm={6}>
                        <div className="authWrapper">
                            <div className="authInnerWrapper">
                                <div className="authBox">
                                    <Typography variant="h4" gutterBottom style={{marginTop:20}}>
                                        Register {user?user.name:''}
                                    </Typography>
                                    <Fade in={this.state.loading}>
                                        <LinearProgress  color="secondary" />
                                    </Fade>

                                    <form onSubmit={this.onSubmit}>
                                        <FormControl  className={classes.text} fullWidth >
                                            <InputLabel htmlFor="name">Name</InputLabel>
                                            <Input
                                                id="name"
                                                className={classes.error}
                                                name="name"
                                                value={this.state.user.name}
                                                onChange={this.handleChange}
                                                onFocus={this.onFocusChange}
                                                onBlur={this.onBlurChange}
                                                error={formErrors.name.invalid}
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
                                                open={formErrors.name.invalid && formErrors.name.touched}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={<React.Fragment><span className={classes.arrow} ref={this.handleArrowRef} />{formErrors.name.message}</React.Fragment>}
                                                error={formErrors.password.invalid}
                                            ><i style={{position:'absolute', top:30, right:0}}></i></Tooltip>
                                        </FormControl>
                                        <FormControl className={classes.text} fullWidth >
                                            <InputLabel htmlFor="username">Username</InputLabel>
                                            <Input
                                                id="username"
                                                className={classes.error}
                                                name="username"
                                                value={this.state.user.username}
                                                onChange={this.handleChange}
                                                onFocus={this.onFocusChange}
                                                onBlur={this.onBlurChange}
                                                error={formErrors.username.invalid}
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
                                                open={formErrors.username.invalid && formErrors.username.touched}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={<React.Fragment><span className={classes.arrow} ref={this.handleArrowRef} />{formErrors.username.message}</React.Fragment>}
                                                error={formErrors.username.invalid}
                                            ><i style={{position:'absolute', top:30, right:0}}></i></Tooltip>
                                        </FormControl>
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
                                                error={formErrors.email.invalid}
                                            ><i style={{position:'absolute', top:30, right:0}}></i></Tooltip>
                                        </FormControl>
                                        <FormControl  className={classes.text} fullWidth >
                                            <InputLabel htmlFor="password">Password</InputLabel>
                                            <Input
                                                id="password"
                                                className={classes.error}
                                                name="password"
                                                type="password"
                                                value={this.state.user.password}
                                                onChange={this.handleChange}
                                                onFocus={this.onFocusChange}
                                                onBlur={this.onBlurChange}
                                                error={formErrors.password.invalid}
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
                                                open={formErrors.password.invalid && formErrors.password.touched}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={<React.Fragment><span className={classes.arrow} ref={this.handleArrowRef} />{formErrors.password.message}</React.Fragment>}
                                                error={formErrors.password.invalid}
                                            ><i style={{position:'absolute', top:30, right:0}}></i></Tooltip>

                                        </FormControl>
                                        <FormControl  className={classes.text} fullWidth >
                                            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                                            <Input
                                                id="confirmPassword"
                                                className={classes.error}
                                                name="confirmPassword"
                                                type="password"
                                                value={this.state.user.confirmPassword}
                                                onChange={this.handleChange}
                                                onFocus={this.onFocusChange}
                                                onBlur={this.onBlurChange}
                                                error={formErrors.confirmPassword.invalid}
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
                                                open={formErrors.confirmPassword.invalid && formErrors.confirmPassword.touched}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                title={<React.Fragment><span className={classes.arrow} ref={this.handleArrowRef} />{formErrors.confirmPassword.message}</React.Fragment>}
                                                error={formErrors.confirmPassword.invalid}
                                            ><i style={{position:'absolute', top:30, right:0}}></i></Tooltip>

                                        </FormControl>
                                        <Button type="submit" disabled={this.props.auth.isLoading} variant="contained" color="primary"  fullWidth={true} size='large' className={classes.button}>
                                            Register {this.props.auth.isLoading && <CircularProgress size={24} className={classes.progress} style={{marginLeft:10}} color="secondary" />}
                                        </Button>
                                        <Typography variant="body2" gutterBottom style={{marginTop:20}} >
                                            Already have an Account? <Link component={RouterLink} to="/login">Sign In</Link>
                                        </Typography>
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
Register.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { registerUser })(withStyles(styles)(Register));