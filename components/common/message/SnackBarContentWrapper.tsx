import { Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import useTheme from '@material-ui/styles/useTheme';
import clsx from 'clsx';
import Props from './model/Props';
import { variantIcon } from './SnackContentProps';
import { useStyles } from './styles/SnackBarContentWrapperStyle';

export default function SnackbarContentWrapper(props: Props) {
    const classes = useStyles(useTheme());

    const { className, message, onClose, variant, index, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <Snackbar
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
            }}
            open={true}>
            <SnackbarContent
                className={clsx(classes[variant], className, classes.margin)}
                aria-describedby='client-snackbar'
                message={
                    <div id='client-snackbar' className={classes.message}>
                        <Icon className={clsx(classes.icon, classes.iconVariant)} />
                        {message}
                    </div>
                }
                action={[
                    <IconButton key='close' aria-label='close' color='inherit' onClick={() => { onClose(index); }}>
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
                {...other}
            />
        </Snackbar>
    );
}
