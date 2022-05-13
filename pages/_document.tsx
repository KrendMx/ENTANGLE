import {
    Html, Head, Main, NextScript,
} from 'next/document';

const Document = () => (
    <Html lang="en">
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <link
                href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap"
                rel="stylesheet"
            />
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
