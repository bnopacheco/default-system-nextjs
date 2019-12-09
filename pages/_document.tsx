import { ServerStyleSheets } from '@material-ui/styles';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import theme from '../theme/Theme';

class DocumentDefault extends Document {
  public render() {
    return (
      <html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
          />
          {/* PWA primary color */}
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link rel='preload' type='image/x-icon' href='/favicon.ico' />
          <link rel='preload' type='image/x-icon' sizes='192x192'  href='/static/icons/icon-192x192.png' />
          <link rel='apple-touch-icon' href='/static/icons/apple-touch-icon' />
          <link rel='preload' type='image/x-icon' href='/static/icons/icon-512x512.png' />
          <meta name='msapplication-square310x310logo' content='/static/icons/icon_largetile.png'></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

DocumentDefault.getInitialProps = async (ctx) => {

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key='styles'>
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  };
};

export default DocumentDefault;
