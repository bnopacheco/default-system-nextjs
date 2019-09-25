import React from 'react';
import { connect } from 'react-redux';
import User from '../models/user.model';
import UserService from '../services/user.service';
import UserBuilder from '../models/builders/UserBuilder';

function index({...props}) {

    React.useEffect(() => {
        props.findUser(1);
    }, []);

    return (
        <>
            <p>Usuário: {props.user.name}</p>
            <p>Email: {props.user.email}</p>
            <p>({ props.activeLoadings }) loading...</p>
        </>
    );
}

function mapStateToProps(state: any) {
    const user: User = state.get('user').toJS().user;
    const activeLoadings: number = state.get('loadings').toJS().activeLoadings;
    return { user, activeLoadings };
}

function mapDispatchToProps(dispatch: any) {
    return {
        findUser: (id: number) => {
            dispatch(UserService.findUser(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(index);
