# ✳ Personal Notes — Astro Starter

Starter blog Astro tối giản, dành cho **nhật ký cá nhân** và **ghi chép công nghệ**. Nội dung là Markdown và website là HTML tĩnh, thích hợp với GitHub Pages.

## Có gì bên trong?

- Home, Journal, Tech, Tags, Archive, About
- Dark / light mode; nhớ lựa chọn bằng `localStorage`, mặc định theo hệ điều hành
- RSS (`/rss.xml`), SEO metadata, favicon, trang 404
- Markdown Content Collections, schema kiểm tra frontmatter
- 5 bài mẫu, tag và archive tạo tự động từ nội dung
- GitHub Actions deploy tự động lên GitHub Pages
- Responsive, không cần database hay CMS

## 1. Tải và chạy local

Yêu cầu **Node.js >= 22.23.4** (khuyến nghị Node.js 24). Giải nén ZIP, mở Terminal trong thư mục:

```bash
npm install
npm run dev
```

Mở http://localhost:4321/personal-notes/ (vì mặc định `BASE_PATH=/personal-notes`). Nếu muốn chạy tại `/` trên máy cá nhân, khởi động bằng `BASE_PATH=/ npm run dev` (macOS/Linux) hoặc `$env:BASE_PATH="/"; npm run dev` (PowerShell).

## 2. Tạo GitHub repository

Tạo repo public, ví dụ `personal-notes`. Nếu bạn chọn tên khác, dùng đúng tên đó khi thiết lập `BASE_PATH`.

```bash
git init
git add .
git commit -m "Initial personal notes"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/personal-notes.git
git push -u origin main
```

> Nếu repo vừa được tạo có sẵn README hay commit ban đầu trên GitHub, nên tạo repo trống để tránh xung đột lịch sử.

## 3. Cấu hình GitHub Pages

1. Vào GitHub repo → **Settings → Secrets and variables → Actions → Variables → New repository variable**.
2. Tạo **SITE_URL** = `https://YOUR_USERNAME.github.io` (không có dấu `/` ở cuối).
3. Tạo **BASE_PATH** = `/personal-notes` (thay bằng `/TÊN_REPO`).
4. Vào **Settings → Pages → Build and deployment → Source: GitHub Actions**.
5. Vào tab **Actions**, chọn **Deploy Astro to GitHub Pages** → **Run workflow** (hoặc push một commit mới).
6. Website: `https://YOUR_USERNAME.github.io/personal-notes/`.

**Trường hợp đặc biệt**: Nếu repository tên `YOUR_USERNAME.github.io`, đặt `BASE_PATH=/`. Nếu dùng tên miền riêng, đặt `SITE_URL=https://tenmiencuaban.com` và `BASE_PATH=/` (đồng thời cấu hình DNS / custom domain trên GitHub Pages).

`SITE_URL` và `BASE_PATH` được đọc từ biến môi trường trong `astro.config.mjs`; không cần chỉnh mã nguồn khi đổi repo. RSS, asset và internal links đều tuân theo base path.

## 4. Cá nhân hóa

- Sửa `src/site.ts`: tên website, mô tả, tác giả, email, GitHub URL.
- Sửa `src/pages/about.astro` để viết giới thiệu.
- Sửa `src/styles/global.css` để đổi màu sắc và typography.
- Thay `public/favicon.svg` để đổi biểu tượng.
- Xóa 5 file mẫu trong `src/content/posts/` khi muốn bắt đầu từ đầu.

## 5. Viết bài mới

Thêm file `src/content/posts/2026-11-15-bai-viet-dau-tien.md`:

```md
---
title: "Bài viết đầu tiên"
description: "Một vài dòng giới thiệu."
pubDate: 2026-11-15
category: journal
tags: [personal, writing]
draft: false
---

Hôm nay mình bắt đầu ghi chép bằng Markdown.
```

- `category`: chỉ nhận `journal` hoặc `tech`.
- `tags`: danh sách nhãn tự do; tự động tạo trang `/tags/` và `/tags/<slug>/`.
- `draft: true`: bài sẽ không được xuất bản và không xuất hiện trong RSS/Archive.
- `updatedDate`: tùy chọn, ví dụ `2026-11-16`.
- URL bài viết dùng tên file, ví dụ `/posts/2026-11-15-bai-viet-dau-tien/`.
- Ảnh đặt trong `public/images/`. Để ảnh hoạt động trên GitHub Pages có `BASE_PATH`, dùng đường dẫn tuyệt đối có prefix repo (vd `/personal-notes/images/hinh.jpg`), hoặc tham chiếu hình tương đối theo URL phù hợp. Với thiết lập thay đổi thường xuyên, dùng thư mục ảnh trong content và cấu hình image pipeline riêng.

**Quan trọng:** Đừng commit thông tin cá nhân nhạy cảm hay bài nhật ký riêng tư vào public repository. `draft: true` chỉ ẩn bài trên website, **không** ẩn file đã commit trên GitHub.

## 6. Xuất bản cập nhật

```bash
git add .
git commit -m "journal: viết ghi chép mới"
git push
```

GitHub Actions tự build và publish.

## Cấu trúc

```text
src/
  components/       Header, Footer, PostList
  content/posts/    Markdown articles
  layouts/          BaseLayout, PostLayout
  lib/posts.ts      Helpers, tags, urls, date
  pages/            Home, Journal, Tech, About, Archive, Tags, RSS, 404
  site.ts           Cấu hình cá nhân
  styles/           Global CSS
.github/workflows/deploy.yml
astro.config.mjs
```

## Lệnh hữu ích

```bash
npm run dev       # Chạy local
npm run build     # Xuất HTML tĩnh vào dist/
npm run preview   # Xem bản build
npm run check     # Kiểm tra Astro / TypeScript
```

Made for writing, not for managing a website.
