import React from 'react';
import LayoutMiniVariantDrawer from '../components/layout_mini_variant_drawer/LayoutMiniVariantDrawer';
import Profile from '../components/profile/Profile';
import { auth, withAuthSync } from '../utils/auth';

const LayoutMiniVariantDrawerPage = () => <LayoutMiniVariantDrawer><Profile /></LayoutMiniVariantDrawer>;

LayoutMiniVariantDrawerPage.getInitialProps = async (ctx) => {
    const token = auth(ctx);
    return { token };
};

export default withAuthSync(LayoutMiniVariantDrawerPage);
