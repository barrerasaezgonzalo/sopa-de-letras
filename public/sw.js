if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + ".js", n).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          ((e.src = a), (e.onload = s), document.head.appendChild(e));
        } else ((e = a), importScripts(a), s());
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, t) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[i]) return;
    let c = {};
    const r = (e) => a(e, i),
      o = { module: { uri: i }, exports: c, require: r };
    s[i] = Promise.all(n.map((e) => o[e] || r(e))).then((e) => (t(...e), c));
  };
}
define(["./workbox-4754cb34"], function (e) {
  "use strict";
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "7c28235f9f1472edc2941bdd2b80f715",
        },
        {
          url: "/_next/static/chunks/139.7a5a8e93a21948c1.js",
          revision: "7a5a8e93a21948c1",
        },
        {
          url: "/_next/static/chunks/239-e5a90e2a60ae59a5.js",
          revision: "e5a90e2a60ae59a5",
        },
        {
          url: "/_next/static/chunks/255-cf2e1d3491ac955b.js",
          revision: "cf2e1d3491ac955b",
        },
        {
          url: "/_next/static/chunks/4bd1b696-c023c6e3521b1417.js",
          revision: "c023c6e3521b1417",
        },
        {
          url: "/_next/static/chunks/646.f342b7cffc01feb0.js",
          revision: "f342b7cffc01feb0",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-3de55f0e3f56b4a3.js",
          revision: "3de55f0e3f56b4a3",
        },
        {
          url: "/_next/static/chunks/app/api/generate-words/route-8a2731216dbdc9fa.js",
          revision: "8a2731216dbdc9fa",
        },
        {
          url: "/_next/static/chunks/app/layout-1f2db5ac97afd9c1.js",
          revision: "1f2db5ac97afd9c1",
        },
        {
          url: "/_next/static/chunks/app/page-53cad73e1268aa8a.js",
          revision: "53cad73e1268aa8a",
        },
        {
          url: "/_next/static/chunks/framework-acd67e14855de5a2.js",
          revision: "acd67e14855de5a2",
        },
        {
          url: "/_next/static/chunks/main-90bfdc1f469b991b.js",
          revision: "90bfdc1f469b991b",
        },
        {
          url: "/_next/static/chunks/main-app-f5f75f81b96f06f0.js",
          revision: "f5f75f81b96f06f0",
        },
        {
          url: "/_next/static/chunks/pages/_app-82835f42865034fa.js",
          revision: "82835f42865034fa",
        },
        {
          url: "/_next/static/chunks/pages/_error-013f4188946cdd04.js",
          revision: "013f4188946cdd04",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-9d795f9e26b86992.js",
          revision: "9d795f9e26b86992",
        },
        {
          url: "/_next/static/css/4f833e1b0e63f514.css",
          revision: "4f833e1b0e63f514",
        },
        {
          url: "/_next/static/jUDkevoh6aChK_-yoaL1E/_buildManifest.js",
          revision: "7fe0bc4e445d3b907ad6c3554194e938",
        },
        {
          url: "/_next/static/jUDkevoh6aChK_-yoaL1E/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        { url: "/banner.svg", revision: "909a0b16cb0a166089c218bdc5f1d20a" },
        { url: "/icon-192.png", revision: "a17eec4ebbeb9dab5d345b52ae805c9d" },
        { url: "/icon-512.png", revision: "affb420b86ea3b8d84048711ab49a4ff" },
        { url: "/manifest.json", revision: "934ef89ae3b01655499561df7205d4c8" },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: n,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET",
    ));
});
