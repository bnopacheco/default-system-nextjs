import { Avatar, Badge, Button, InputBase } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import User from '../../models/user.model';
import UserService from '../../services/user.service';
import MenuAppBar from '../menu_app_bar/MenuAppBar';
import MobileMenu from '../mobile_menu/MobileMenu';
import useStyles from './styles/appBarLayoutStyles';

function AppBarLayout({...props}) {
    const classes = useStyles(useTheme());
    const { t, i18n } = useTranslation();
    const user: User = props.user;

    const [language, setLanguage] = React.useState('en');
    const [anchorLanguageEl, setAnchorLanguageEl] = React.useState<null | HTMLElement>(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isMenuOpen = Boolean(anchorEl);
    const isLanguageOpen = Boolean(anchorLanguageEl);

    React.useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    function handleLanguageOpen(event: React.MouseEvent<HTMLElement>) {
      setAnchorLanguageEl(event.currentTarget);
    }

    function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
      setMobileMoreAnchorEl(event.currentTarget);
    }

    function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
      setAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        setMobileMoreAnchorEl(null);
        setAnchorLanguageEl(null);
    }

    function handleLanguage(lng: string) {
      setLanguage(lng);
      handleMenuClose();
    }

    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';

    return (
        <AppBar position='fixed' className={clsx(classes.appBar, { [classes.appBarShift]: props.open, })} >

        <Toolbar>

          <IconButton color='inherit' aria-label='open drawer' onClick={props.handleDrawerOpen} edge='start'
            className={clsx(classes.menuButton, { [classes.hide]: props.open, })} >
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' noWrap>
            {t('app_bar.label')}
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

              <Button color='inherit' onClick={handleLanguageOpen} style={{padding: '0em'}}>{language}</Button>

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
                      (!user || !user.name) && <AccountCircle />
                  }

                  {
                      (user && user.image) &&
                      <Avatar alt={user.name} src={user.image} className={classes.avatar} />
                  }

                  {
                      (user && user.name && !user.image) &&
                      <Avatar className={classes.avatar}>{user.name.substring(0, 1).toUpperCase()}</Avatar>
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

        <MobileMenu handleProfileMenuOpen={handleProfileMenuOpen}
            mobileMoreAnchorEl={mobileMoreAnchorEl}
            mobileMenuId={mobileMenuId}
            isMobileMenuOpen={isMobileMenuOpen}
            handleMobileMenuClose={handleMenuClose}
            handleLanguageOpen={handleLanguageOpen}
            language={language}/>

        <MenuAppBar anchorEl={anchorEl}
            menuId={menuId}
            isMenuOpen={isMenuOpen}
            handleMenuClose={handleMenuClose}
            user={user}
            logout={props.logout}/>

        <Menu
            anchorEl={anchorLanguageEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isLanguageOpen}
            onClose={handleMenuClose} >
            <MenuItem onClick={() => handleLanguage('en')}>En</MenuItem>
            <MenuItem onClick={() => handleLanguage('es')}>Es</MenuItem>
            <MenuItem onClick={() => handleLanguage('pt')}>Pt</MenuItem>
        </Menu>

      </AppBar>
    );
}

function mapStateToProps(state: any) {
  const user: User = state.get('authReducer').toJS().user;
  return { user };
}

function mapDispatchToProps(dispatch: any) {
  return {
      logout : () => {
        dispatch(UserService.logout());
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarLayout);
