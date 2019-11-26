import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, makeStyles, TextField, Typography, useTheme } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Router from 'next/router';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import UserService from '../../services/user.service';
import LoadingApp from '../loading/LoadingApp';

const useStyles = makeStyles((theme) => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Copyright() {
    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            {`Copyright © `} <Link color='inherit' href='#'> website </Link> {`${new Date().getFullYear()}.`}
        </Typography>
    );
}

function Login({ ...props }) {

    const classes = useStyles(useTheme());

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberme, setRememberme] = useState(false);
    const [redirect, setRedirect] = useState<string | null>(null);

    if (props.isLoggedIn === true) {
        Router.push('/');
    }

    const handleLoginSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        props.login(email, password, rememberme, redirect);
    };

    useEffect(() => {
        const query: any = queryString.parse(window.location.search);
        console.log(query)
        if (query.redirect) {
            setRedirect(redirect);
        }
    }, []);

    return (
        props.loadingLogin ? <LoadingApp /> :
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='username'
                        label='Username'
                        name='username'
                        autoComplete='username'
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value='remember'
                                color='primary'
                                onChange={() => setRememberme(!rememberme)}/>
                        }
                        label='Remember me'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        disabled={(!email || !password)}
                        color='primary'
                        className={classes.submit}
                        onClick={handleLoginSubmit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href='#' variant='body2'>
                                Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                            <Link href='#' variant='body2'>
                                {'Don\'t have an account? Sign Up'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

function mapStateToProps(state: any) {
    const isLoggedIn: boolean = state.get('authReducer').toJS().isLoggedIn;
    const loadingLogin: boolean = state.get('loadingsReducer').toJS().loadingLogin;
    return { loadingLogin, isLoggedIn };
}

function mapDispatchToProps(dispatch: any) {
    return {
        login: (username: string, password: string, rememberme: boolean, redirect: string) => {
            dispatch(UserService.login(username, password, rememberme, redirect));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
