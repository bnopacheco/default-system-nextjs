import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from './styles/layoutStyles';
import ListMenu from './styles/ListMenu';
import AppBarLayout from './AppBarLayout';

function LayoutDrawer({ ...props }) {
  const theme = useTheme();
  const classes = useStyles(theme);
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
        {props.children}
      </main>

    </div>
  );
}

export default LayoutDrawer;
