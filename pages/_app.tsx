import React from 'react';
import Layout from '../components/layout_app_bar/LayoutAppBar';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import theme from '../theme/Theme';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { fromJS } from 'immutable';
import { initialStore } from '../state/store';
import { userAction } from '../state/actions/user.action';
import UserBuilder from '../models/builders/UserBuilder';
import { messagesAction } from '../state/actions/messages.action';
import { loadingsAction } from '../state/actions/loading.action';
import Loading from '../components/loading/Loading';
import MessageComponent from '../components/alert/MessageComponent';

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
                <Layout>
                    <Loading />
                    <MessageComponent />
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </Provider>
    );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
    // we can dispatch from here too
    ctx.store.dispatch(userAction(UserBuilder.builder().build()));

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    ctx.store.dispatch(messagesAction([]));
    ctx.store.dispatch(loadingsAction(0));

    return { pageProps };
};

export default withRedux(initialStore, {
    serializeState: (state) => state.toJS(),
    deserializeState: (state) => fromJS(state),
  })(MyApp);
