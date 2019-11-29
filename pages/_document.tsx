import { ServerStyleSheets } from '@material-ui/styles';
import nextCookie from 'next-cookies';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import theme from '../theme/Theme';

class DocumentDefault extends Document {
  public render() {
    return (
      <html lang='en'>
        <Head>
          <title>Default System NextJS</title>
          <meta
            name='description'
            content='Sistema com mínimo implementado para uma aplicação WEB. A ideia deste projeto é
              disponibilizar um template de sistema com o mínimo necessário para iniciar um projeto frontend em react'
          />
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
          />
          {/* PWA primary color */}
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
          <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />
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
