import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, MenuOpen, PowerSettingsNew } from '@material-ui/icons';
import Menu from '@material-ui/icons/Menu';
import Router from 'next/router';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import User from '../../models/user.model';
import UserService from '../../services/user.service';

function ListMenu({...props}) {
    const { t } = useTranslation();

    return (
        <List>

          <ListItem button key={'home'} onClick={() => { Router.push('/'); }}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary={t('menu.home')} />
          </ListItem>

          <ListItem button key={'mini_variant_drawer'} onClick={() => { Router.push('/layout-mini-variant-drawer'); }}>
            <ListItemIcon><Menu /></ListItemIcon>
            <ListItemText primary={t('menu.mini_variant_drawer')} />
          </ListItem>

          <ListItem button key={'persistent_drawer'} onClick={() => { Router.push('/layout-persistent-drawer'); }}>
            <ListItemIcon><MenuOpen /></ListItemIcon>
            <ListItemText primary={t('menu.persistent_drawer')} />
          </ListItem>

          <ListItem button key={'logout'} onClick={() => props.logout() }>
            <ListItemIcon><PowerSettingsNew /></ListItemIcon>
            <ListItemText primary={t('menu.logout')} />
          </ListItem>

      </List>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListMenu);
