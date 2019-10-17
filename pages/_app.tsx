import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { fromJS } from 'immutable';
import withRedux from 'next-redux-wrapper';
import React from 'react';
import { Provider } from 'react-redux';
import MessageComponent from '../components/alert/MessageComponent';
import Layout from '../components/layout_app_bar/LayoutAppBar';
import Loading from '../components/loading/Loading';
import UserBuilder from '../models/builders/UserBuilder';
import { loadingsAction } from '../state/actions/loading.action';
import { messagesAction } from '../state/actions/messages.action';
import { initialStore } from '../state/store';
import theme from '../theme/Theme';

const MyApp = ({ Component, pageProps, store }) => {

    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }, []);

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
                {/* <Layout>
                    <Loading />
                    <MessageComponent />
                    <Component {...pageProps} />
                </Layout> */}
            </ThemeProvider>
        </Provider>
    );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
};

export default withRedux(initialStore, {
    serializeState: (state) => state.toJS(),
    deserializeState: (state) => fromJS(state),
  })(MyApp);
