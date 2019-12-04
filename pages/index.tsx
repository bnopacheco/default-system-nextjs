import React from 'react';
import Home from '../components/home/home';
import Layout from '../components/layout/Layout';
import { auth, withAuthSync } from '../utils/auth';

const HomePage = () => <Layout><Home/></Layout>;

HomePage.getInitialProps = async (ctx) => {
    const token = auth(ctx);
    return { token };
};

export default withAuthSync(HomePage);
