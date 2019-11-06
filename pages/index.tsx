import React from 'react';
import Home from '../components/home/home';
import LayoutPersistentDrawer from '../components/layout_persistent_drawer/LayoutPersistentDrawer';
import { auth, withAuthSync } from '../utils/auth';

const HomePage = () =>   <LayoutPersistentDrawer><Home /></LayoutPersistentDrawer>;

HomePage.getInitialProps = async (ctx) => {
    const token = auth(ctx);
    return { token };
};

export default withAuthSync(HomePage);
