import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import User from '../../models/user.model';
import { loadingsAction } from '../../state/actions/loading.action';
import { messagesAction } from '../../state/actions/messages.action';
import MessageBuilder from '../alert/model/builders/MessageBuilder';

function Home({...props}) {

    return (
        <>
            <Button onClick={() => {props.loadMessage(); }}>
                Show message
            </Button>
            <Button onClick={() => { props.incrementLoading(); }}>
                Show loading
            </Button>
        </>
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
                        .setSecondsTimeout(3)
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
        },
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Home);
