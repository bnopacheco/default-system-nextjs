import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, MenuOpen, Person, PowerSettingsNew, ShoppingCart } from '@material-ui/icons';
import Menu from '@material-ui/icons/Menu';
import Router from 'next/router';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { HUMAN_RESOURCE, SALES_AND_MARKETING } from '../../../models/modules.type';
import User from '../../../models/user.model';
import UserService from '../../../services/user.service';

function ListMenu({...props}) {
    const { t } = useTranslation();
    const user: User = props.user;

    return (
        <List style={{marginLeft: '0.5em'}}>

          <ListItem button key={'home'} onClick={() => { Router.push('/'); }}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary={t('menu.home')} />
          </ListItem>

          {
            user.containsModule(SALES_AND_MARKETING) &&
            <ListItem button key={'sales'} onClick={() => { Router.push('/sales-and-marketing'); }}>
              <ListItemIcon><ShoppingCart /></ListItemIcon>
              <ListItemText primary={t('menu.sales')} />
            </ListItem>
          }

          {
            user.containsModule(HUMAN_RESOURCE) &&
            <ListItem button key={'hr'} onClick={() => { Router.push('/human-resources'); }}>
              <ListItemIcon><Person /></ListItemIcon>
              <ListItemText primary={t('menu.hr')} />
            </ListItem>
          }

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
