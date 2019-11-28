import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { HUMAN_RESOURCE } from '../../models/modules.type';
import User from '../../models/user.model';

function HumanResources({...props}) {
    const { t } = useTranslation();
    const user: User = props.user;

    return (
        !user.containsModule(HUMAN_RESOURCE) ? <>{t('unauthorized_module')}</> :
        <>{t('human_resources.human_resources_title')}</>
    );
}

function mapStateToProps(state: any) {
    const user: User = state.get('authReducer').toJS().user;
    return { user };
}

export default connect(mapStateToProps)(HumanResources);
