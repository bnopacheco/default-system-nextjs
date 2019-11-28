import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { SALES_AND_MARKETING } from '../../models/modules.type';
import User from '../../models/user.model';

function SalesAndMarketing({...props}) {
    const { t } = useTranslation();
    const user: User = props.user;

    return (
        !user.containsModule(SALES_AND_MARKETING) ? <>{t('unauthorized_module')}</> :
        <>{t('sales_and_marketing.sales_and_marketing_title')}</>
    );
}

function mapStateToProps(state: any) {
    const user: User = state.get('authReducer').toJS().user;
    return { user };
}

export default connect(mapStateToProps)(SalesAndMarketing);
