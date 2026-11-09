const C='fm-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.json','icon-180.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const same=new URL(e.request.url).origin===location.origin;
const net=()=>fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r});
e.respondWith(same?net().catch(()=>caches.match(e.request).then(h=>h||caches.match('index.html'))):caches.match(e.request).then(h=>h||net()))});
