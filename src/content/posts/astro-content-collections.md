---
title: "Content Collections trong Astro"
description: "Cách quản lý bài viết Markdown có schema rõ ràng."
pubDate: 2026-10-29
category: tech
tags: [astro, markdown, web]
draft: false
---

Astro cho phép tổ chức các bài Markdown thành một **collection**.

Điều tôi thích là có thể kiểm tra `title`, `pubDate`, `tags` ngay khi build.

## Ví dụ frontmatter

```yaml
---
title: "Ghi chú mới"
pubDate: 2026-11-15
category: tech
tags: [astro]
---
```

File được đặt trong `src/content/posts/` và Astro tự nhận dạng nội dung.
