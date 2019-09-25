import makeStyles from '@material-ui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
    alertMessage: {
        position: 'fixed',
        bottom: '1em',
        left: '1em',
        margin: '1em',
        minWidth: '25%',
        zIndex: 1600,
    },
}));
