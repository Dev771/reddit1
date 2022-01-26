import React, { useState } from 'react';
import { Avatar, Paper, Grid, Container, Typography, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './Styles';
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux';

import './Styles.css';
import Input from './input';
import Icon from './icon';
import { AUTH } from '../../constants/index';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../actions/Auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSignUp, setisSignUp] = useState(true);
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const switchState = () => {
        setisSignUp(!isSignUp);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignUp) {
            dispatch(signUp(formData, navigate));
        } else {
            dispatch(signIn(formData, navigate));
        }

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    

    const googleSuccess = (res) => {
        const result = res?.profileObj;
        const token  = res?.tokenId;
        try {
            dispatch({type: AUTH, data: { result, token }});
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = () => {
        console.log("Google Sign In Was A Failure Just Like U!!!!, Try Again Dumb Ass");
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {
                            isSignUp && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label='Email' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignUp && (
                            <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' />
                        )}
                    </Grid>
                    <Button variant='contained' color='primary' className={classes.submit} type='submit' fullWidth>
                            {isSignUp ? 'SignUp' : 'SignIn' }
                    </Button>
                    <GoogleLogin 
                        clientId='478668842778-9dp0645g3thr4oga6kfrldi9ktehvsce.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='secondary' onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'fullWidth>
                            Google SignIn
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Button variant='contained' className={classes.submit} type='button' fullWidth onClick={()=> switchState()}>
                        {isSignUp ? 'Already have a Account : SignIn' : 'Dont Have A Account : SignIn' }
                    </Button>
                </form>
            </Paper>
        </Container>
    )
};

export default Auth;
