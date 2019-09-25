import React from 'react';
import SnackbarContentWrapper from './SnackBarContentWrapper';
import Props from './model/Props';
import { Message } from './model/Message';
import PropsBuilder from './model/builders/PropsBuilder';
import { connect } from 'react-redux';
import { useStyles } from './styles/MessageComponentStyle';
import { messagesAction } from '../../state/actions/messages.action';
import useTheme from '@material-ui/styles/useTheme';

function MessageComponent({ ...props }) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [state, setState] = React.useState<Props[]>([]);

    React.useEffect(() => {
        if (props.messages) {
            setState(
                props.messages.map((message: Message, index: number) => {
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
    const messages: Message[] = state.get('messages').toJS().messages;
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
