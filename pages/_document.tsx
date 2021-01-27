import type { DocumentProps } from 'next/document'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document<DocumentProps> {
  public render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <link rel="icon" href="/logo/LogoIcon.png" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
               (adsbygoogle = window.adsbygoogle || []).push({
                   google_ad_client: "ca-pub-6248776021404303",
                   enable_page_level_ads: true
              });
                `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
