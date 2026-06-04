# 🗂️ My Dashboard — Personal Productivity Hub

> Proyek mini dari **5-Day Coding Camp** · Dibuat oleh **Wahyu Adam Anandika** · 1-5 Juni 2026

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![LocalStorage](https://img.shields.io/badge/Storage-LocalStorage-green?style=flat)
![No Framework](https://img.shields.io/badge/Framework-None-lightgrey?style=flat)

---

## ✨ Tentang Proyek

**My Dashboard** adalah aplikasi web produktivitas pribadi yang berjalan sepenuhnya di browser — tanpa server, tanpa database eksternal, tanpa framework. Semua data tersimpan otomatis di **LocalStorage** browser kamu.

Dibangun hanya dengan **HTML, CSS, dan Vanilla JavaScript** murni sebagai bagian dari tantangan 5-Day Coding Camp.

---

## 🚀 Fitur Utama

### 🕐 Greeting & Waktu
- Jam digital real-time (update setiap detik)
- Tanggal lengkap otomatis
- Sapaan berubah sesuai waktu hari:
  - 🌅 Pagi → *Good morning*
  - ☀️ Siang → *Good afternoon*
  - 🌆 Sore → *Good evening*
  - 🌙 Malam → *Good night*
  - 🦉 Dini hari → *Burning midnight oil*

### 👤 Nama Kustom
- Atur nama kamu sendiri — sapaan jadi personal
- Tersimpan otomatis, muncul setiap kali buka halaman

### 🌙 Light / Dark Mode
- Toggle tema terang/gelap satu klik
- Preferensi tersimpan — tidak reset saat refresh

### 🎯 Focus Timer (Pomodoro)
- Timer 25 menit bawaan
- Tombol **Start**, **Stop**, dan **Reset**
- Animasi pulse saat timer berjalan
- Notifikasi browser saat sesi selesai

### ✅ To-Do List
- Tambah, edit, hapus task dengan mudah
- Centang task sebagai selesai
- **4 mode sorting:**
  - Terbaru / Terlama
  - Urutan A–Z
  - Belum selesai duluan
- Semua task tersimpan di LocalStorage

### 🔗 Quick Links
- Simpan link favorit dengan label kustom
- Favicon otomatis dari Google
- Buka di tab baru, hapus kapan saja
- Link tersimpan permanen di LocalStorage

---

## 🛠️ Tech Stack

| Teknologi | Kegunaan |
|---|---|
| HTML5 | Struktur halaman |
| CSS3 (Custom Properties) | Styling, tema, animasi |
| Vanilla JavaScript (ES6+) | Logika & interaktivitas |
| LocalStorage API | Penyimpanan data client-side |
| Notification API | Notifikasi selesai timer |
| Google Favicon S2 | Ikon link otomatis |

---

## 📁 Struktur Proyek

```
📦 CodingCamp-1June2026-WahyuAdam
├── 📄 index.html        # Struktur halaman utama
├── 📁 css/
│   └── 🎨 style.css     # Semua styling (light/dark theme, animasi, layout)
└── 📁 js/
    └── ⚡ app.js         # Semua logika (timer, todo, links, greeting, storage)
```

> **Aturan proyek:** Hanya 1 file CSS dan 1 file JS — kode bersih, terstruktur.


---

## 📸 Tampilan

### Light Mode
```
┌─────────────────────────────────────────────┐
│  🕐 08:45:30 AM   Thursday, Jun 4, 2026   🌙 │
├─────────────────────────────────────────────┤
│  Good morning, Wahyu!                        │
│  Rise and shine! Let's crush the day.   ✏️   │
├──────────────────┬──────────────────────────┤
│  🎯 Focus Timer  │  🔗 Quick Links           │
│                  │                           │
│    25:00         │  🔗 GitHub                │
│  [Start][Reset]  │  🔗 YouTube               │
│  Ready           │  [+ Add]                  │
├──────────────────┴──────────────────────────┤
│  ✅ To-Do List          [Sort: Newest ▾]     │
│  ┌─────────────────────────────────────┐    │
│  │ ○ Belajar JavaScript                │    │
│  │ ✓ Setup project dashboard           │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

---

## 🎓 Konteks Pembelajaran

Proyek ini dibuat selama **5-Day Coding Camp** dengan tujuan:

- ✅ Memahami struktur HTML semantik
- ✅ Menguasai CSS custom properties & theming
- ✅ Praktik DOM manipulation dengan Vanilla JS
- ✅ Menggunakan Web API (LocalStorage, Notification)
- ✅ Membangun UI responsif tanpa framework
- ✅ Menulis kode yang bersih dan terorganisir

---

## 👨‍💻 Author

**Wahyu Adam Anandika**  
5-Day Coding Camp · Juni 2026

---

*Dibangun dengan ☕ dan semangat belajar.*
