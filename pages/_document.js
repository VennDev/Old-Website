import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
    return (
        <Html lang="en" suppressHydrationWarning = "true">
            <Head/>
            <body className='bg-dark'>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
