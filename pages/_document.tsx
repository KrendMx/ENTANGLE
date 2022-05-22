import {
    Html, Head, Main, NextScript,
} from 'next/document';

const Document = () => (
    <Html lang="en">
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta
                name="description"
                content="Entangle App"
            />
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#111111" />
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css"
            />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
);

export default Document;
