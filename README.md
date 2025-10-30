# Blog Cá Nhân: Lập trình Java, JavaScript & Mạng

## 1. Mục tiêu học phần

- Xây dựng blog cá nhân chia sẻ về lập trình mạng, Java, JavaScript.
- Đáp ứng kỹ thuật: responsive, tối giản, chuẩn UI/UX, chạy GitHub Pages.
- Menu: Home, Blog (đề xuất thêm About/Profile, Contact).
- Nội dung: Profile cá nhân + >= 9 bài viết (tiếng Việt, tự viết, code/ảnh tự làm).
- Phát triển thêm 1–3 tính năng mở rộng khác biệt (ví dụ: RSS, snippets code, bookmark, chế độ đọc tập trung...).

## 2. Sitemap/Trang cần có

1. **Home** (`index.html`)
    - Hero + lời chào + CTA "Xem Blog".
    - Giới thiệu nhanh: ảnh avatar + vài dòng.
    - 3 bài nổi bật (`featured: true`).
2. **Blog Index**
    - Danh sách bài, lọc theo Tag (Java/JavaScript/Network), search (client), phân trang.
    - Routing: `#/blog?page=1`, `#/blog?tag=Java`
3. **Blog Detail**
    - Render nội dung markdown bài (title, ngày, reading time, mục lục tự sinh, code highlight, copy, ảnh động responsive...)
4. **About/Profile**
    - Thông tin cá nhân, kỹ năng, link GitHub/LinkedIn.
5. **Contact** *(tùy chọn)*
6. **404 (Not Found)** *(tùy chọn)*

## 3. Kế hoạch nội dung (>=9 bài, tiếng Việt, tự viết)

- Java: 5 bài (JVM/JRE/JDK, OOP, Collections, Exception, Socket/network basic)
- JavaScript: 4 bài (Scope/Closure, Promise, DOM/Event, Fetch API/JSON)
- Network nâng cao (WebSocket, CORS/Security) *(tùy chọn)*

## 4. Yêu cầu UI/UX
- Dark/Light mode (localStorage)
- Đọc dễ: max-width 70–80ch, line-height 1.6, font code mono
- Tự sinh TOC từ h2/h3, tính thời lượng đọc (words/min)
- Highlight code block (CSS/JS thuần)
- Ảnh responsive, lazy-load
- Button “Copy code”

## 5. Chức năng kỹ thuật (client-side, không framework)
- Đọc metadata các bài từ thư mục `/posts` chứa file markdown (front-matter)
- Lọc/search/pagination client (index nhỏ <10KB)
- Router hash trên index.html (`#/blog`, `#/post/slug`, `#/about`)

## 6. Quy ước thư mục, front-matter

```
index.html  # file chính
assets/
  css/index.css
  js/index.js
  images/
posts/      # chứa file .md
```

**Front-matter mẫu cho bài viết:**
```yaml
---
title: "Tiêu đề"
date: "YYYY-MM-DD"
tags: ["Java", "Network"]
summary: "Mô tả ngắn 1–2 câu."
featured: true
---
(Nội dung Markdown…)
```

- Ảnh bài viết để trong `assets/images/`, dùng đường dẫn tương đối.
- CSS: biến màu, typography, layout, theme toggle ở `assets/css/index.css`.
- JS: router, nạp/render markdown, search/filter/toggle ở `assets/js/index.js`.

## 7. Tính năng tự phát triển (1–3 mục)
- Tạo RSS (feed.xml JS script)
- snippets code block (nút copy nhanh)
- sitemap.xml, metadata SEO, Open Graph/Twitter
- Chế độ đọc tập trung/bookmark

## 8. Cách chạy project
- Chạy local: mở `index.html` trên trình duyệt (serve tĩnh, không cần backend)
- Deploy: push lên GitHub, vào Settings > Pages > chọn branch main, folder root.

## 9. Checklist đánh giá
- Đủ 9 bài, code/ảnh tự viết
- Có ít nhất 1 case-study mini tự phát triển
- Dark mode, code highlight, copy, pagination, filter/search, TOC
- UI gọn, responsive, cá nhân hoá (avatar, brand màu, slogan)
- Có file hướng dẫn sử dụng, cấu trúc rõ ràng
