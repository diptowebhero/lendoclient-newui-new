import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    const { styleElements } = this.props;
    const { locale } = this.props;
    const dir = locale === "fa" ? "rtl" : "ltr";
    return (
      <Html lang={locale} dir={dir}>
        <Head>{styleElements}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
