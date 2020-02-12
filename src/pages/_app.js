import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import 'normalize.css';
import 'default-passive-events';

import '../styles/global.scss';

import Layout from '../components/Layout/Layout';
import RotateScreen from '../components/RotateScreen/RotateScreen';

import detect, { isBrowser } from '../utils/detect';

// This default export is required in a new `pages/_app.js` file.
function App({ Component, pageProps }) {
  if (isBrowser) {
    const unsupportedUtil = require('../utils/unsupported-utils');

    if (unsupportedUtil.isSupported()) {
      if (process.env.NODE_ENV !== 'production' && window.location.href.indexOf('?nostat') === -1) {
        require('@jam3/stats')();
      }

      const { device, browser } = detect;

      const classes = [device.isMobile ? 'mobile' : '', device.getType(), browser.getName()].filter(className =>
        Boolean(className)
      );

      document.body.className = [...document.body.className.split(' '), ...classes].filter(Boolean).join(' ');
    } else {
      const Unsupported = dynamic(() =>
        import(/* webpackChunkName: "Unsupported" */ '../components/Unsupported/Unsupported')
      );
      return <Unsupported />;
    }
  }

  return (
    <Layout>
      <Head>
        <meta name="title" content="Mondello Battle" />
        <meta
          name="description"
          content="Famous Battle of Mondello: This was a battle between some italian dudes and some barbarian from the north, they came down from the mountains"
        />
        <meta name="keywords" content="mondello,battle,mondello battle" />
        {/* Generate favicons in https://realfavicongenerator.net */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        {/* Share meta tags */}
        <meta property="og:locale" content="en_US" />>
        <meta property="og:title" content="The battle of Mondello Beach" />
        <meta
          property="og:description"
          content="Famous Battle of Mondello: This was a battle between some italian dudes and some barbarian from the north, they came down from the mountains"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.WEBSITE_SITE_URL} />
        <meta property="og:site_name" content="Mondello Beach Battle" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image" content="/_next/static/images/share-image.jpg" />
        <meta name="twitter:card" content="Default content" />
        <meta property="fb:app_id" content="FB_APP_ID" />
        <meta name="google-site-verification" content="oPXsjFSUzpvABhaiSXD9sv5s9PcYSNzuCTgJeCifwuY" />
        <meta name="msvalidate.01" content="[Bing Web Master Tools]" />
        {/* Other recommends */}
        <link rel="canonical" href={process.env.WEBSITE_SITE_URL} />
        <link rel="dns-prefetch" href="//[NEXT-DNS-request.com]" />
        <script
          // eslint-disable-next-line jam3/no-sanitizer-with-danger
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('enable-animations');"
          }}
        />
      </Head>

      <Component {...pageProps} />

      <RotateScreen />
    </Layout>
  );
}

export default App;
