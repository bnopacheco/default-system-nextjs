import { CircularProgress, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import CompanyBuilder from '../../models/builders/CompanyBuilder';
import ModuleBuilder from '../../models/builders/ModuleBuilder';
import RoleBuilder from '../../models/builders/RoleBuilder';
import UserBuilder from '../../models/builders/UserBuilder';
import Module from '../../models/module';
import {
    CUSTOMES_RELATIONSHIP_MANAGEMENT,
    FINANCE_AND_ACCOUNTING,
    HUMAN_RESOURCE,
    INVENTORY,
    PURCHASE,
    SALES_AND_MARKETING,
    SUPPLY_CHAIN_MANAGEMENT
} from '../../models/modules.type';
import Role from '../../models/role';
import {
    ADMIN,
    USER,
    VENDOR
} from '../../models/roles.types';
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
            const modules: Module[] = [];

            userDecodedCookie.roles.forEach((role: any) => {
                switch (role.name) {
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

            userDecodedCookie.modules.forEach((modulle: any) => {
                switch (modulle.name) {
                    case HUMAN_RESOURCE:
                        modules.push(ModuleBuilder.builder().setName(HUMAN_RESOURCE).build());
                        break;
                    case INVENTORY:
                        modules.push(ModuleBuilder.builder().setName(INVENTORY).build());
                        break;
                    case SALES_AND_MARKETING:
                        modules.push(ModuleBuilder.builder().setName(SALES_AND_MARKETING).build());
                        break;
                    case PURCHASE:
                        modules.push(ModuleBuilder.builder().setName(PURCHASE).build());
                        break;
                    case FINANCE_AND_ACCOUNTING:
                        modules.push(ModuleBuilder.builder().setName(FINANCE_AND_ACCOUNTING).build());
                        break;
                    case CUSTOMES_RELATIONSHIP_MANAGEMENT:
                        modules.push(ModuleBuilder.builder().setName(CUSTOMES_RELATIONSHIP_MANAGEMENT).build());
                        break;
                    default:
                        modules.push(ModuleBuilder.builder().setName(SUPPLY_CHAIN_MANAGEMENT).build());
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
                .setModules(modules)
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
