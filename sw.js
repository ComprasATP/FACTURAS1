// FacturasPRO Service Worker
const CACHE = 'facturaspro-v1';
const ASSETS = [
  '/FACTURAS1/',
  '/FACTURAS1/index.html',
  '/FACTURAS1/manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
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
  // Always fetch from network for Supabase API calls
  if (e.request.url.includes('supabase.co')) return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
    
async function cargarProveedores() {

  const { data, error } = await supabase
    .from('proveedores')
    .select('*');

  if (error) {
    console.error(error);
    return;
  }

  const contenedor = document.getElementById("listaProveedores");
  contenedor.innerHTML = "";

  data.forEach(p => {
    contenedor.innerHTML += `
      <div style="padding:10px; border-bottom:1px solid #ccc;">
        <strong>${p.nombre}</strong><br>
        CUIT: ${p.cuit || '-'}<br>
        Email: ${p.email || '-'}
      </div>
    `;
  });
}
