import { IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import ToolbarContent from '../toolbar_content/ToolbarContent';
import useStyles from './AppBarLayoutStyles';

function AppBarLayout({...props}) {
    const classes = useStyles(useTheme());

    return (
      <AppBar position='fixed' className={clsx(classes.appBar, { [classes.appBarShift]: props.open, })} >
        <Toolbar>
          <IconButton color='inherit' aria-label='open drawer' onClick={props.handleDrawerOpen} edge='start'
              className={clsx(classes.menuButton, { [classes.hide]: props.open, })} >
              <MenuIcon />
          </IconButton>
          <ToolbarContent open={props.open} handleDrawerOpen={props.handleDrawerOpen} logout={props.logout}/>
        </Toolbar>
      </AppBar>
    );
}

export default AppBarLayout;
