import { CircularProgress, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import CompanyBuilder from '../../models/builders/CompanyBuilder';
import RoleBuilder from '../../models/builders/RoleBuilder';
import UserBuilder from '../../models/builders/UserBuilder';
import Role from '../../models/role';
import { ADMIN, USER, VENDOR } from '../../models/roles.types';
import User from '../../models/user.model';
import UserService from '../../services/user.service';
import { getCookie } from '../../utils/cookie';
import { useStyles } from './styles/LoadingStyle';

function loadingUserCookies(loadUser: (user: User) => void) {
    if (typeof localStorage !== 'undefined') {
        const userCookie = getCookie('user');
        if (userCookie) {
            const userDecodedCookie = JSON.parse(atob(decodeURIComponent(userCookie)));
            const roles: Role[] = [];
            userDecodedCookie.roles.forEach((role: string) => {
                switch (role) {
                    case ADMIN:
                        roles.push(RoleBuilder.builder().setName(ADMIN).build());
                        break;
                    case VENDOR:
                        roles.push(RoleBuilder.builder().setName(VENDOR).build());
                        break;
                    default:
                        roles.push(RoleBuilder.builder().setName(USER).build());
                        break;
                }
            });

            const company = CompanyBuilder.builder()
                                .setId(userDecodedCookie.company.id)
                                .setName(userDecodedCookie.company.name)
                                .build();

            const user: User = UserBuilder.builder()
                .setId(userDecodedCookie.id)
                .setName(userDecodedCookie.name)
                .setEmail(userDecodedCookie.email)
                .setImage(userDecodedCookie.image)
                .setRoles(roles)
                .setToken(userDecodedCookie.token)
                .setCompany(company)
                .build();

            loadUser(user);
        }
    }
}

function LoadingApp({ ...props }) {
    const { t } = useTranslation();
    const classes = useStyles(useTheme());

    React.useEffect(() => {
        loadingUserCookies(props.loadUser);
    }, []);

    return (
        <div className={classes.box}>
            <CircularProgress size='6em' />
            <Typography style={{ padding: '1em' }} >{t('loading')}</Typography>
        </div>
    );
}

function mapStateToProps(state: any) {
    return { };
}

function mapDispatchToProps(dispatch: any) {
    return {
        loadUser: (user: User) => {
            dispatch(UserService.loadUser(user));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingApp);
