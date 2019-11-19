import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        title: { marginBottom: '1em', color: '#333' },
        header: { width: '100%', display: 'flex', backgroundColor: '#eee', fontWeight: 700, color: '#333', fontSize: '0.9em' },
        line: { width: '100%', display: 'flex' },
        cell: { padding: '0.5em' },

    })
);

