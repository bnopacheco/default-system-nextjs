import React from 'react';
import Modal from '@material-ui/core/Modal';
import { useStyles } from './styles/LoadingStyle';
import { useTheme } from '@material-ui/styles';
import { connect } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import clsx from 'clsx';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function Loading({ ...props }) {
  const classes = useStyles(useTheme());
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (props.activeLoadings > 0) {
      setOpen(true);
    } else {
    setOpen(false);
    }
  }, [props.activeLoadings]);

  return (
    <div>
      <Modal aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
            open={open} className={classes.loading}>

        <div style={modalStyle} className={ classes.paper }>
          <LinearProgress />
        </div>

      </Modal>;
    </div >
  );
}

function mapStateToProps(state: any) {
  const activeLoadings: number = state.get('loadings').toJS().activeLoadings;
  return { activeLoadings };
}

function mapDispatchToProps(dispatch: any) {
  return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
