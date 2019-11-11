import { Avatar, Card, CardContent, Grid, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { PowerSettingsNew } from '@material-ui/icons';
import { useTheme } from '@material-ui/styles';
import React from 'react';
import User from '../../models/user.model';
import useStyles from './styles/layoutAppBarStyles';

function menuAppBar({...props}) {

    const classes = useStyles(useTheme());

    const user: User = props.user;
    return (
        <Menu
            anchorEl={props.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={props.menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={props.isMenuOpen}
            onClose={props.handleMenuClose}>

        <Grid container spacing={1} style={{padding: '1em', width: '25em'}} >
                {
                    (user && user.image) &&
                    <Grid item xs={12} className={classes.cardAvatar}>
                        <Avatar alt={user.name} src={user.image} style={{height: '6em', width: '6em'}}/>
                    </Grid>
                }
            <Grid item xs={12}>
                <Typography gutterBottom variant='h5' component='h2'>
                    Profile
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body2' color='textSecondary' component='p'>
                    User: {user.name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body2' color='textSecondary' component='p'>
                    Email: {user.email}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body2' color='textSecondary' component='p'>
                    Company: {user.company ? user.company.name : ' - '}
                </Typography>
            </Grid>
        </Grid>

        <MenuItem onClick={() => props.logout() }>
            <ListItemIcon><PowerSettingsNew /></ListItemIcon>
            <ListItemText primary={'Logout'} />
        </MenuItem>

    </Menu>
    );
}

export default menuAppBar;
