const CACHE = 'coinbook-v2';
const STATIC = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js'
];

// 항상 네트워크에서 직접 가져올 도메인 (시세 API)
const LIVE_HOSTS = [
  'api.upbit.com',
  'api.bithumb.com',
  'api.gopax.co.kr',
  'api.coingecko.com'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => {
      return Promise.allSettled(STATIC.map(url => c.add(url).catch(() => {})));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // 시세 API — 항상 네트워크 직접 요청, 캐시 절대 사용 안 함
  if (LIVE_HOSTS.some(h => url.hostname.includes(h))) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }).catch(() =>
        new Response(JSON.stringify({}), { headers: { 'Content-Type': 'application/json' } })
      )
    );
    return;
  }

  // 정적 리소스 — 캐시 우선
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
