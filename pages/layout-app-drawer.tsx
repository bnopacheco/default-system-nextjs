import React from 'react';
import { connect } from 'react-redux';
import MessageComponent from '../components/alert/MessageComponent';
import Layout from '../components/layout_drawer/LayoutDrawer';
import Loading from '../components/loading/Loading';
import User from '../models/user.model';
import UserService from '../services/user.service';

function index({...props}) {

    React.useEffect(() => {
        props.loadUser();
    }, []);

    return (
        <Layout>
            <Loading />
            <MessageComponent />
            {
                <>
                    <p>Usuário: {props.user.name}</p>
                    <p>Email: {props.user.email}</p>
                </>
            }
        </Layout>
    );
}

function mapStateToProps(state: any) {
    const user: User = state.get('authReducer').toJS().user;
    const activeLoadings: number = state.get('loadingsReducer').toJS().activeLoadings;
    return { user, activeLoadings };
}

function mapDispatchToProps(dispatch: any) {
    return {
        loadUser: (id: number) => {
            dispatch(UserService.loadUser());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(index);
