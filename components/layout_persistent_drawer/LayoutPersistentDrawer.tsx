import { Avatar } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import Router from 'next/router';
import React from 'react';
import { connect } from 'react-redux';
import User from '../../models/user.model';
import { auth, withAuthSync } from '../../utils/auth';
import MessageComponent from '../alert/MessageComponent';
import Loading from '../loading/Loading';
import Drawer from './Drawer';
import MenuAppBar from './MenuAppBar';
import MobileMenu from './MobileMenu';
import useStyles from './styles/layoutAppBarStyles';

function LayoutPersistentDrawer({...props}) {
    const classes = useStyles(useTheme());
    const user: User = props.user;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';

    const [open, setOpen] = React.useState(false);

    return (
        <>
            <div className={classes.grow}>
                <AppBar position='static'>

                    <Toolbar>

                        <IconButton
                            edge='start'
                            className={classes.menuButton}
                            color='inherit'
                            aria-label='open drawer'
                            onClick={() => {setOpen(!open); } }>
                            <MenuIcon />
                        </IconButton>

                        <Typography className={classes.title} variant='h6' noWrap>
                            Material-UI
                        </Typography>

                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}/>
                        </div>

                        <div className={classes.grow} />

                        <div className={classes.sectionDesktop}>

                            <IconButton aria-label='show 4 new mails' color='inherit' className={classes.appBarButton}>
                                <Badge badgeContent={4} color='secondary'>
                                    <MailIcon />
                                </Badge>
                            </IconButton>

                            <IconButton aria-label='show 17 new notifications' color='inherit' className={classes.appBarButton}>
                                <Badge badgeContent={17} color='secondary'>
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>

                            <IconButton
                                edge='end'
                                aria-label='account of current user'
                                aria-controls={menuId}
                                aria-haspopup='true'
                                onClick={handleProfileMenuOpen}
                                color='inherit'
                                className={classes.appBarButton}>
                                {
                                    (user && user.image) ?
                                    <Avatar alt={props.user.name} src={props.user.image} className={classes.avatar} /> :
                                    <Avatar className={classes.avatar}>{props.user.name.substring(0, 1).toUpperCase()}</Avatar>
                                }
                                {
                                    !user && <AccountCircle />
                                }
                            </IconButton>

                        </div>

                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label='show more'
                                aria-controls={mobileMenuId}
                                aria-haspopup='true'
                                onClick={handleMobileMenuOpen}
                                color='inherit'>
                                <MoreIcon />
                            </IconButton>
                        </div>

                    </Toolbar>

                </AppBar>

                <MobileMenu handleProfileMenuOpen={handleProfileMenuOpen}
                    mobileMoreAnchorEl={mobileMoreAnchorEl}
                    mobileMenuId={mobileMenuId}
                    isMobileMenuOpen={isMobileMenuOpen}
                    handleMobileMenuClose={handleMobileMenuClose}/>

                <MenuAppBar anchorEl={anchorEl}
                    menuId={menuId}
                    isMenuOpen={isMenuOpen}
                    handleMenuClose={handleMenuClose}/>

                <Drawer open={open} setOpen={setOpen} />

            </div>
            <div style={{padding: '1em'}}>
                <Loading />
                <MessageComponent />
                {props.children}
            </div>
        </>
    );
}

function mapStateToProps(state: any) {
    const user: User = state.get('authReducer').toJS().user;
    return { user };
}

function mapDispatchToProps(dispatch: any) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutPersistentDrawer);
