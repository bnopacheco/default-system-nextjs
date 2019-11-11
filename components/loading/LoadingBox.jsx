import { useTheme } from '@material-ui/styles';
import React from 'react';
import { useStyles } from './styles/LoadingStyle';
import { CircularProgress, Typography } from '@material-ui/core';

function LoadingBox({ ...props }) {
    const classes = useStyles(useTheme());
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (props.activeLoadings > 0) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [props.activeLoadings]);

    return (
        <div className={classes.box}>
            <CircularProgress size='6em' />
            <Typography style={{ padding: '1em' }} >Loading...</Typography>
        </div>
    );
}

export default LoadingBox;