import Head from "next/head";

export default function PWA() {
  return (
    <Head>
      <script async src="/assets/js/pwacompat.js" crossOrigin="anonymous" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/pwa/icons/mstile-150x150.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/pwa/icons/favicon-16x16.png"
      />

      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="PWA Splash" />
      <link
        rel="apple-touch-startup-image"
        href="/assets/pwa/splash/apple_splash_2048.png"
        sizes="2048x2732"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/pwa/splash/apple_splash_1668.png"
        sizes="1668x2224"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/pwa/splash/apple_splash_1536.png"
        sizes="1536x2048"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/pwa/splash/apple_splash_1125.png"
        sizes="1125x2436"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/pwa/splash/apple_splash_1242.png"
        sizes="1242x2688"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/pwa/splash/apple_splash_1284.png"
        sizes="1284x2778"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/pwa/splash/apple_splash_750.png"
        sizes="750x1334"
      />
      <link
        rel="apple-touch-startup-image"
        href="/assets/pwa/splash/apple_splash_640.png"
        sizes="640x1136"
      />
      <meta name="msapplication-TileColor" content="#e46400" />
      <meta name="theme-color" content="#f4f4ef"></meta>
    </Head>
  );
}
