import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                {/* Next.js 15 automatically handles favicon.ico in app directory */}
                <meta name="theme-color" content="#000000" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
} 