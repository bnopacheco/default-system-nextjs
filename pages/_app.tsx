import React from "react";
import App from "next/app";
import Layout from "../components/layout_app_bar/LayoutAppBar";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import theme from "../theme/Theme";

class DefaultApp extends App {

    // tslint:disable-next-line: member-access
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    public render() {
        const { Component, pageProps } = this.props;
        return (
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        );
    }
}

export default DefaultApp;
