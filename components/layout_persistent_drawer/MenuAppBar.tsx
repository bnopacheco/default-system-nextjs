import { Avatar, Card, CardContent, Grid, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { PowerSettingsNew } from '@material-ui/icons';
import { useTheme } from '@material-ui/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import User from '../../models/user.model';
import useStyles from './styles/layoutAppBarStyles';

function menuAppBar({...props}) {
    const { t } = useTranslation();
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
                    (user && user.image && user.name) &&
                    <Grid item xs={12} className={classes.cardAvatar}>
                        <Avatar alt={user.name} src={user.image} style={{height: '6em', width: '6em'}}/>
                    </Grid>
                }
            <Grid item xs={12}>
                <Typography gutterBottom variant='h5' component='h2'>
                    {t('app_bar_profile.profile')}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body2' color='textSecondary' component='p'>
                    {t('app_bar_profile.user')} {user.name ? user.name : ''}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body2' color='textSecondary' component='p'>
                    {t('app_bar_profile.email')} {user.email ? user.email : ''}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body2' color='textSecondary' component='p'>
                    {t('app_bar_profile.company')} {(user.company && user.company.name ) ? user.company.name : ''}
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
