import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, MenuOpen, PowerSettingsNew } from '@material-ui/icons';
import Menu from '@material-ui/icons/Menu';
import Router from 'next/router';
import { connect } from 'react-redux';
import User from '../../models/user.model';
import UserService from '../../services/user.service';

function ListMenu({...props}) {
    return (
        <List>

          <ListItem button key={'Home'} onClick={() => { Router.push('/'); }}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>

          <ListItem button key={'Mini Variant Drawer'} onClick={() => { Router.push('/layout-mini-variant-drawer'); }}>
            <ListItemIcon><Menu /></ListItemIcon>
            <ListItemText primary={'Mini Variant Drawer'} />
          </ListItem>

          <ListItem button key={'Send email'} onClick={() => { Router.push('/layout-persistent-drawer'); }}>
            <ListItemIcon><MenuOpen /></ListItemIcon>
            <ListItemText primary={'Persistent Drawer'} />
          </ListItem>

          <ListItem button key={'Logout'} onClick={() => props.logout() }>
            <ListItemIcon><PowerSettingsNew /></ListItemIcon>
            <ListItemText primary={'Logout'} />
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
