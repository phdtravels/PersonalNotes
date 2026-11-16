import { defineConfig } from 'astro/config';

// Trong GitHub Actions, cấu hình SITE_URL và BASE_PATH bằng Repository Variables.
// Ví dụ: SITE_URL=https://yourname.github.io, BASE_PATH=/personal-notes
// Đối với repo yourname.github.io hoặc custom domain, đặt BASE_PATH=/.
export default defineConfig({
  site: process.env.SITE_URL || 'https://peterphd.github.io',
  base: process.env.BASE_PATH || '/PersonalNotes',
  trailingSlash: 'always',
});
