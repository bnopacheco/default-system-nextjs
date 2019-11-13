import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import User from '../../models/user.model';
import UserService from '../../services/user.service';
import Loading from '../loading/Loading';
import LoadingApp from '../loading/LoadingApp';
import ListMenu from '../menu_default/ListMenu';
import MessageComponent from '../message/MessageComponent';
import AppBarLayout from './AppBarLayout';
import useStyles from './styles/layoutStyles';

function LayoutMiniVariantDrawer({ ...props }) {
  const classes = useStyles(useTheme());
  const user: User = props.user;
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    user === undefined || user.id === undefined ? <LoadingApp /> :
    <div className={classes.root}>
      <AppBarLayout open={open} handleDrawerOpen={handleDrawerOpen}/>

      <Drawer variant='permanent'
        className={clsx(classes.drawer, { [classes.drawerOpen]: open, [classes.drawerClose]: !open, })}
        classes={{ paper: clsx({ [classes.drawerOpen]: open, [classes.drawerClose]: !open, }), }}
        open={open} >

        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />
        <ListMenu />
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Loading />
        <MessageComponent />
        {props.children}
      </main>

    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LayoutMiniVariantDrawer);
