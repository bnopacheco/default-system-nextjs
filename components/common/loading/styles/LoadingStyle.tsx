import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      position: 'absolute',
      width:  '100%',
      height:  '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    loading: {
      'z-index': '1700 !important',
    },
  }),
);
