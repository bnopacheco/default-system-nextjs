import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useTheme from '@material-ui/styles/useTheme';
import { mdiAccountCardDetails } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { connect } from 'react-redux';
import { ADMIN, USER } from '../../models/roles.types';
import User from '../../models/user.model';

const useStyles = makeStyles({
    card: {
      maxWidth: 345,
    },
  });

function Profile({...props}) {
    const classes = useStyles(useTheme());

    const user: User = props.user;

    return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2' >
                        <Icon path={mdiAccountCardDetails} title='User Profile' size={1} color='grey'/>
                        {` Profile`}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        Usuário: {user.name}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        Email: {user.email}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small' color='primary' disabled={!user.containsRole(USER)}>
                        ACTIVE FOR USER
                    </Button>
                    <Button size='small' color='primary' disabled={!user.containsRole(ADMIN)}>
                        ACTIVE FOR ADMIN
                    </Button>
                </CardActions>
            </Card>
    );
}

function mapStateToProps(state: any) {
    const user: User = state.get('authReducer').toJS().user;
    const activeLoadings: number = state.get('loadingsReducer').toJS().activeLoadings;
    return { user, activeLoadings };
}

export default connect(mapStateToProps)(Profile);
