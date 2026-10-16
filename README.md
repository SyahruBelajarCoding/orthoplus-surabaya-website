# Ortho Plus Surabaya – Website

Website satu halaman untuk Ortho Plus Surabaya, klinik ortodonti dan estetika gigi di Ruko Central Park Mulyosari AB-11, Surabaya.

## Struktur

- `page.html` – sumber halaman (HTML, CSS, JS dalam satu file)
- `build.mjs` – membuat `index.html` dari `page.html`
- `index.html` – hasil akhir yang dibuka/di-hosting
- `assets/clinic/` – foto klinik dan dokter
- `assets/` – foto perawatan berlisensi terbuka (kredit di `assets/credits.json` dan footer)

## Mengubah isi

```bash
node build.mjs
```

Jalankan setelah mengedit `page.html`, lalu buka `index.html` di browser.
