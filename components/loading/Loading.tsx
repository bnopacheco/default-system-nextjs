import Modal from '@material-ui/core/Modal';
import { useTheme } from '@material-ui/styles';
import React from 'react';
import { connect } from 'react-redux';
import { useStyles } from './styles/LoadingStyle';
import { CircularProgress, Typography } from '@material-ui/core';

function Loading({ ...props }) {
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
    <Modal aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          open={open} className={classes.loading}>

        <div className={classes.box}>
            <CircularProgress size='6em' />
            <Typography style={{ padding: '1em' }} >Loading...</Typography>
        </div>

    </Modal>
  );
}

function mapStateToProps(state: any) {
  const activeLoadings: number = state.get('loadingsReducer').toJS().activeLoadings;
  return { activeLoadings };
}

function mapDispatchToProps(dispatch: any) {
  return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
