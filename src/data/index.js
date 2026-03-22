// ─── DATA ───────────────────────────────────────────────────────────────────
export const categories = [
  { CategoryId: 1, Name: "全部", Slug: "all" },
  { CategoryId: 2, Name: "AI 提示詞", Slug: "ai-prompts" },
  { CategoryId: 3, Name: "UI 套件", Slug: "ui-kits" },
  { CategoryId: 4, Name: "模板", Slug: "templates" },
  { CategoryId: 5, Name: "電子書", Slug: "ebooks" },
  { CategoryId: 6, Name: "程式資源", Slug: "code" },
];

export const products = [
  { ProductId: 1, CategoryId: 2, Name: "AI Prompt Pack Pro", Description: "200 組精選 ChatGPT / Midjourney 提示詞，涵蓋行銷、設計、程式等場景。", Price: 12, ThumbnailUrl: "https://picsum.photos/400/220?1", IsPublished: true, avgRating: 4.9, reviewCount: 128 },
  { ProductId: 2, CategoryId: 3, Name: "Dark UI Kit", Description: "50+ 深色主題元件，含 Figma 原始檔、標註說明與 React 程式碼範本。", Price: 24, ThumbnailUrl: "https://picsum.photos/400/220?2", IsPublished: true, avgRating: 4.8, reviewCount: 87 },
  { ProductId: 3, CategoryId: 4, Name: "Notion 工作系統", Description: "完整個人生產力模板，包含週計劃、專案追蹤、讀書清單一體化設計。", Price: 19, ThumbnailUrl: "https://picsum.photos/400/220?3", IsPublished: true, avgRating: 4.7, reviewCount: 65 },
  { ProductId: 4, CategoryId: 2, Name: "Midjourney Style Pack", Description: "100 組風格化 Midjourney V6 提示詞，包含賽博龐克、極簡、油畫等風格。", Price: 15, ThumbnailUrl: "https://picsum.photos/400/220?4", IsPublished: true, avgRating: 5.0, reviewCount: 43 },
  { ProductId: 5, CategoryId: 6, Name: "React Component Lib", Description: ".NET + React 前後端範本，含 JWT Auth、API 結構與部署設定。", Price: 39, ThumbnailUrl: "https://picsum.photos/400/220?5", IsPublished: true, avgRating: 4.6, reviewCount: 32 },
  { ProductId: 6, CategoryId: 5, Name: "UI/UX 設計完整指南", Description: "200 頁電子書，從使用者研究到 Figma 原型，適合初學者到中階設計師。", Price: 18, ThumbnailUrl: "https://picsum.photos/400/220?6", IsPublished: true, avgRating: 4.8, reviewCount: 156 },
  { ProductId: 7, CategoryId: 4, Name: "Landing Page 模板包", Description: "8 套高轉換率登陸頁模板，HTML/CSS 單檔可用，含深色淺色主題。", Price: 22, ThumbnailUrl: "https://picsum.photos/400/220?7", IsPublished: true, avgRating: 4.7, reviewCount: 74 },
  { ProductId: 8, CategoryId: 6, Name: ".NET 8 API 啟動模板", Description: "包含 JWT、Repository Pattern、Swagger、Docker 的完整 WebAPI 專案範本。", Price: 29, ThumbnailUrl: "https://picsum.photos/400/220?8", IsPublished: true, avgRating: 5.0, reviewCount: 21 },
];
 
export const reviews = [
  { ReviewId: 1, ProductId: 1, Rating: 5, Comment: "非常實用，提示詞品質超出預期，直接用到了工作中！", CreatedAt: "2026-03-10", DisplayName: "James L." },
  { ReviewId: 2, ProductId: 1, Rating: 5, Comment: "整理得很有系統，買到賺到。", CreatedAt: "2026-03-08", DisplayName: "Amy C." },
  { ReviewId: 3, ProductId: 1, Rating: 4, Comment: "內容很豐富，如果能再多一些中文範例就更好了。", CreatedAt: "2026-03-05", DisplayName: "Kevin W." },
];
