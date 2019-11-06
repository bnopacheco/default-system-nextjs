import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import nextCookie from 'next-cookies';
import Router from 'next/router';
import React from 'react';
import MessageComponent from '../alert/MessageComponent';
import Loading from '../loading/Loading';
import ListMenu from '../menu_default/ListMenu';
import AppBarLayout from './AppBarLayout';
import useStyles from './styles/layoutStyles';

function LayoutMiniVariantDrawer({ ...props }) {
  const classes = useStyles(useTheme());
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <AppBarLayout open={open} handleDrawerOpen={handleDrawerOpen}/>

      <Drawer variant='permanent'
        className={clsx(classes.drawer, { [classes.drawerOpen]: open, [classes.drawerClose]: !open, })}
        classes={{ paper: clsx({ [classes.drawerOpen]: open, [classes.drawerClose]: !open, }), }}
        open={open} >

        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            { <ChevronLeftIcon /> }
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

export default LayoutMiniVariantDrawer;
