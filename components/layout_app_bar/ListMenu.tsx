import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { connect } from 'react-redux';
import User from '../../models/user.model';
import { loadingsAction } from '../../state/actions/loading.action';
import { messagesAction } from '../../state/actions/messages.action';
import MessageBuilder from '../alert/model/builders/MessageBuilder';

function ListMenu({...props}) {
    return (
        <List>

          <ListItem button key={'Inbox'} onClick={() => {props.loadMessage(); }}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={'Inbox'} />
          </ListItem>

          <ListItem button key={'Send email'} onClick={() => { props.incrementLoading(); }}>
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary={'Send email'} />
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
      loadMessage: () => {
          dispatch(() => { dispatch(
              messagesAction([
                  MessageBuilder.builder()
                      .setVariant('info')
                      .setMessage('Mensagem de teste')
                      .build()
              ])
          ); });
      },
      incrementLoading: () => {
        dispatch(() => {
          dispatch(loadingsAction(1));
          setTimeout(() => {
            dispatch(loadingsAction(-1));
          }, 3000);
        });
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMenu);
