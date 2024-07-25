// import node module libraries
import Head from 'next/head';
import {useRouter} from 'next/router';
import {NextSeo} from 'next-seo';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {Analytics} from '@vercel/analytics/react';

// import theme style scss file
import 'styles/theme.scss';
import "../styles/dataTables.min.css";
import "../styles/globals.css";
import "datatables.net";

const $ = require('jquery');

// import default layouts
import DefaultDashboardLayout from 'layouts/DefaultDashboardLayout';
import {Loader} from "../components/loading/Loader";
import React, {useEffect} from "react";
import {isAuthorized} from "../components/server/server-helpers";
import {Authentication} from "../components/auth/Authentication";
import {DEFAULT_SCRIPT_ID, SCRIPT_URL, Turnstile} from "@marsidev/react-turnstile";
import Script from "next/script";

function MyApp({Component, pageProps, ...props}) {
    const router = useRouter();
    const pageURL = process.env.baseURL + router.pathname;
    const title = "JG Status Tracker";
    const description = "Software used to view data from the game Anime Defenders in ROBLOX's game list."
    const keywords = "JG, Status, Tracker, Anime, Defenders, ROBLOX, Game, List, Data, View, Software";

    // Identify the layout, which will be applied conditionally
    const Layout = Component.Layout || (router.pathname.includes('dashboard') ?
        (router.pathname.includes('instructor') || router.pathname.includes('student') ?
            DefaultDashboardLayout : DefaultDashboardLayout) : DefaultDashboardLayout)

    const {req} = props;
    const isAuth = isAuthorized(req);

    if (typeof window === "object") {
        $(document).ready(function(){
            setTimeout(function(){
                $('#loading').hide();
                $('#loading').attr('style', 'display: none !important');
            }, 2500);
        });
    }

    return (
        <Authentication>
            <SSRProvider>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="keywords" content={keywords}/>
                    <link rel="shortcut icon" href="/icon.png" type="image/png"/>
                </Head>
                <NextSeo
                    title={title}
                    description={description}
                    canonical={pageURL}
                    openGraph={{
                        url: pageURL,
                        title: title,
                        description: description,
                        site_name: process.env.siteName
                    }}
                />
                <Layout>
                    <div id="loading">
                        <Script
                            id={DEFAULT_SCRIPT_ID}
                            src={SCRIPT_URL}
                            strategy="beforeInteractive"
                        />
                        <Turnstile siteKey='0x4AAAAAAAdJPLJ-fqAquK08'/>
                    </div>
                    <Component {...pageProps} />
                    <Analytics/>
                </Layout>
            </SSRProvider>
        </Authentication>
    )
}

export default MyApp
