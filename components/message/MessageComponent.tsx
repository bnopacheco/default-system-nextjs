import useTheme from '@material-ui/styles/useTheme';
import React from 'react';
import { connect } from 'react-redux';
import { messagesAction } from '../../state/actions/messages.action';
import PropsBuilder from './model/builders/PropsBuilder';
import { Message } from './model/Message';
import Props from './model/Props';
import SnackbarContentWrapper from './SnackBarContentWrapper';
import { useStyles } from './styles/MessageComponentStyle';

function MessageComponent({ ...props }) {
    const classes = useStyles(useTheme());
    const [state, setState] = React.useState<Props[]>([]);

    React.useEffect(() => {
        if (props.messages) {
            setState(
                props.messages.map((message: Message, index: number) => {

                    if (message.secondsTimeout !== 0) {
                        if (!message.secondsTimeout) {
                            message.secondsTimeout = 5;
                        }
                        setTimeout(() => {
                            props.updateMessages(
                                props.messages.filter((messageFiltered: Message, i: number) => i !== index && messageFiltered)
                            );
                        }, (message.secondsTimeout * 1000));
                    }

                    return PropsBuilder.Builder()
                        .setVariant(message.variant)
                        .setMessage(message.message)
                        .setIndex(index)
                        .build();
                })
            );
        }

    }, [props.messages]);

    const handleClose = (index: number) => {
        props.updateMessages(
            props.messages.filter((message: Message, i: number) => i !== index && message)
        );
    };

    return (
        <div className={classes.alertMessage} >
            {
                state.map((item: Props) => {
                    return (
                        <SnackbarContentWrapper
                            onClose={handleClose}
                            variant={item.variant}
                            message={item.message}
                            index={item.index}
                            key={item.index}
                        />
                    );
                })

            }
        </div>
    );
}

function mapStateToProps(state: any) {
    const messages: Message[] = state.get('messagesReducer').toJS().messages;
    return { messages };
}

function mapDispatchToProps(dispatch: any) {
    return {
        updateMessages: (messages: Message[]) => {
            dispatch(() => dispatch(messagesAction(messages)));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageComponent);
