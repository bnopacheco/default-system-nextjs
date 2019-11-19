import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import useStyles from './styles/appBarLayoutStyles';

function AppBarLayout({...props}) {
    const classes = useStyles(useTheme());
    const { t } = useTranslation();

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

        </Toolbar>

      </AppBar>
    );
}

export default AppBarLayout;
