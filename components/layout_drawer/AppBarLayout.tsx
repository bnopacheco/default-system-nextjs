import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './styles/appBarLayoutStyles';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';


function AppBarLayout({...props}) {
    
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: props.open, })} >

        <Toolbar>
            
          <IconButton color="inherit" aria-label="open drawer" onClick={props.handleDrawerOpen} edge="start"
            className={clsx(classes.menuButton, { [classes.hide]: props.open, })} >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Mini variant drawer
          </Typography>

        </Toolbar>

      </AppBar>
    )
}

export default AppBarLayout;