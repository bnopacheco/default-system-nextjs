import React from 'react';
import LayoutPersistentDrawer from '../components/layout_persistent_drawer/LayoutPersistentDrawer';
import Profile from '../components/profile/Profile';
import { auth, withAuthSync } from '../utils/auth';

const LayoutPersistentDrawerPage = () => <LayoutPersistentDrawer><Profile /></LayoutPersistentDrawer>;

LayoutPersistentDrawerPage.getInitialProps = async (ctx) => {
    const token = auth(ctx);
    return { token };
};

export default withAuthSync(LayoutPersistentDrawerPage);
