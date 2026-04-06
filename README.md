# Digital Vault 🛍️

> 數位商品電商平台 — 即購即用，無需等待配送

---

## 專案成員

| 成員 | 負責範圍 |
|---|---|
| Wu | 前端（React）、後端（.NET 8 WebAPI） |
| Amy | 後端（.NET 8 WebAPI）、資料庫設計 |

---

## 技術架構

### 前端
- **框架**：React 19 + Vite
- **路由**：React Router v7（懶加載 + 巢狀路由）
- **狀態管理**：Context API（UIContext / AuthContext / CartContext）
- **HTTP**：Axios
- **樣式**：純 CSS（CSS Variables，支援 768px / 1920px / 2560px 響應式）

### 後端
- **框架**：.NET 8 WebAPI
- **資料庫**：SQL Server（DigitalVaultStore）
- **ORM**：Entity Framework Core
- **認證**：JWT Bearer + Google OAuth + Token 黑名單（ConcurrentDictionary）
- **安全**：RBAC 角色權限控制（Policy）

---

## 環境需求

- Node.js 18+
- .NET 8 SDK
- SQL Server
- Tailscale VPN（跨網路連線資料庫用）

---

## 本地開發設定

### 前端

```bash
cd fonted/digital-vault
npm install
npm run dev
```

前端運行於 `http://localhost:5173`

### 後端

```bash
cd DigitalProject
dotnet restore
dotnet run
```

後端運行於 `https://localhost:7124`

### 環境變數

在前端根目錄建立 `.env`：

```env
VITE_API_URL=https://localhost:7124/api
```

在後端 `appsettings.json` 設定：

```json
{
  "ConnectionStrings": {
    "DbContext": "你的 SQL Server 連線字串"
  },
  "JwtTokenSettings": {
    "Issuer": "DigitalProject",
    "Audience": "DigitalProjectUsers",
    "IssuerSigningKey": "你的密鑰（至少 32 字元）",
    "ExpirationMinutes": "60"
  },
  "Authentication": {
    "Google": {
      "ClientId": "你的 Google Client ID",
      "ClientSecret": "你的 Google Client Secret"
    }
  }
}
```

---

## 資料庫

### 測試資料

```sql
-- 查詢測試帳號
SELECT Id, Email FROM [DigitalVaultStore].[dbo].[Users];

-- 查詢測試商品
SELECT Id, Name, Price FROM [DigitalVaultStore].[dbo].[Products];
```

### 手動建立測試訂單

```sql
DECLARE @UserId UNIQUEIDENTIFIER = '你的UserId';
DECLARE @ProductId UNIQUEIDENTIFIER = '你的ProductId';
DECLARE @OrderId UNIQUEIDENTIFIER = NEWID();

INSERT INTO [DigitalVaultStore].[dbo].[Orders]
  (Id, UserId, OrderNo, TotalAmount, Status, CreatedAt)
VALUES
  (@OrderId, @UserId, 'DV-TEST01', 12.00, 1, GETUTCDATE());

INSERT INTO [DigitalVaultStore].[dbo].[OrderItems]
  (Id, OrderId, ProductId, ProductName, UnitPrice, Quantity, SubTotal)
VALUES
  (NEWID(), @OrderId, @ProductId, '測試商品', 12.00, 1, 12.00);

SELECT @OrderId AS OrderId;
```

### 設定管理員帳號

```sql
UPDATE UserRoles
SET RoleId = (SELECT Id FROM Roles WHERE Code = 'admin')
WHERE UserId = (SELECT Id FROM Users WHERE Email = '你的Email');
```

---

## API 文件

後端啟動後可至 Swagger 查看完整 API：

```
https://localhost:7124/swagger
```

### 主要端點

| 方法 | 路由 | 說明 | 需要登入 |
|---|---|---|---|
| POST | `/api/auth/register` | 註冊 | ❌ |
| POST | `/api/auth/login` | 登入 | ❌ |
| POST | `/api/auth/logout` | 登出 | ✅ |
| POST | `/api/auth/refresh` | 刷新 Token | ❌ |
| GET | `/api/auth/google` | Google 登入 | ❌ |
| GET | `/api/category` | 取得分類列表 | ❌ |
| GET | `/api/product` | 取得商品列表 | ❌ |
| GET | `/api/product/:id` | 取得商品詳情 | ❌ |
| POST | `/api/order` | 建立訂單 | ✅ |
| GET | `/api/order` | 取得我的訂單 | ✅ |
| PUT | `/api/order/:id/cancel` | 取消訂單 | ✅ |
| GET | `/api/order/:id/download` | 取得下載連結 | ✅ |
| POST | `/api/payment` | 建立付款 | ✅ |
| GET | `/api/payment/order/:orderId` | 取得訂單付款紀錄 | ✅ |
| PUT | `/api/payment/:id/cvs-confirm` | 超商繳費確認 | ✅ |
| GET | `/api/review/product/:productId` | 取得商品評論 | ❌ |
| GET | `/api/review/product/:productId/stats` | 取得評論統計 | ❌ |
| POST | `/api/review` | 新增評論 | ✅ |
| PUT | `/api/review/:id` | 修改評論 | ✅ |
| DELETE | `/api/review/:id` | 刪除評論 | ✅ |
| DELETE | `/api/review/:id/admin` | 管理員刪除評論 | ✅ admin/support |
| GET | `/api/user/purchases` | 取得已購商品 | ✅ |
| PUT | `/api/user/displayName` | 修改顯示名稱 | ✅ |
| PUT | `/api/user/password` | 修改密碼 | ✅ |
| GET | `/api/admin/product` | 後台取得所有商品 | ✅ manager |
| POST | `/api/admin/product` | 後台新增商品 | ✅ manager |
| PUT | `/api/admin/product/:id` | 後台編輯商品 | ✅ manager |
| DELETE | `/api/admin/product/:id` | 後台下架商品 | ✅ manager |

---

## RBAC 角色權限

| 角色 | 說明 | 可存取後台 |
|---|---|---|
| `user` | 一般使用者 | ❌ |
| `manager` | 商品管理員 | 商品管理 |
| `support` | 客服人員 | 訂單、評論管理 |
| `admin` | 系統管理員 | 全部 |

> 角色為小寫，多角色用逗號分隔，例如 `admin,manager`

---

## 測試流程

### 1. 註冊 / 登入
- 前往首頁點「登入 / 註冊」
- 填寫 Email、顯示名稱、密碼完成註冊
- 或使用 Google 帳號登入

### 2. 瀏覽商店
- 點導覽列「商店」
- 可依分類篩選商品
- 點商品進入詳情頁

### 3. 加入購物車
- 在商品詳情頁點「加入購物車」
- 訪客也可加入，結帳時才需要登入
- 點導覽列「🛒 購物車」查看購物車

### 4. 前往付款

| 付款方式 | 說明 |
|---|---|
| ECPay / LinePay | 直接付款，成功後跳轉訂單頁 |
| 信用卡 | 填寫卡號、持卡人、有效期限、CVV |
| 超商繳費 | 取得繳費代碼，系統自動 polling 確認 |

### 5. 訂單管理

| 操作 | 條件 |
|---|---|
| 取消訂單 | 狀態為「未付款」 |
| 下載商品 | 狀態為「已付款」或「已完成」，下載後自動變為「已完成」 |
| 評論商品 | 狀態為「已付款」或「已完成」 |

### 6. 評論商品
- 從訂單頁點「💬 評論商品」
- 或從商品詳情頁下方評論區撰寫
- 有購買記錄且未評論過才會出現評論表單
- 自己的評論可以編輯和刪除

### 7. 會員中心
- 點右上角頭像進入會員中心
- 可修改顯示名稱
- 可修改密碼
- 可查看已購商品清單

### 8. 後台管理（需要管理員帳號）
- 前往 `/admin` 進入後台
- 左側 Sidebar 依角色顯示可用功能
- 商品管理：新增、編輯、下架商品
- 訂單管理：查看所有訂單（等後端完成）
- 用戶管理：管理帳號與權限（等後端完成）
- 評論管理：審核、刪除不當評論（等後端完成）

---

## 測試流程圖

```mermaid
flowchart TD
    A[註冊 / 登入] --> B[瀏覽商店]
    B --> C[查看商品詳情]
    C --> D[加入購物車]
    D --> E[前往付款]
    E --> F{已登入?}
    F -- 否 --> G[強制登入]
    G --> H[選擇付款方式]
    F -- 是 --> H
    H --> I[ECPay / LinePay]
    H --> J[信用卡]
    H --> K[超商繳費]
    J --> J1[填寫卡片資訊]
    J1 --> L[付款成功]
    K --> K1[顯示繳費代碼]
    K1 --> K2[Polling 確認]
    K2 --> L
    I --> L
    L --> M[訂單頁]
    M --> N[取消訂單]
    M --> O[下載商品]
    M --> P[評論商品]
```

---

## 前端目錄結構

```
src/
├── components/
│   ├── layout/         Header.jsx, Footer.jsx, AdminLayout.jsx
│   ├── ui/             Stars.jsx, Toast.jsx, EmptyState.jsx, PageStatus.jsx
│   ├── product/        ProductCard.jsx, ProductGrid.jsx
│   ├── modal/          LoginModal.jsx, CheckoutModal.jsx, OrderReviewModal.jsx, DownloadModal.jsx
│   ├── payment/        PaymentMethodList.jsx, CreditCardForm.jsx, CVSResult.jsx
│   ├── profile/        ProfileCard.jsx, ProfileStats.jsx, EditDisplayName.jsx, EditPassword.jsx, PurchaseList.jsx
│   ├── review/         ReviewCard.jsx, ReviewForm.jsx, ReviewSection.jsx
│   ├── admin/
│   │   └── product/    ProductTable.jsx, ProductFormModal.jsx
│   └── pages/
│       ├── HomePage.jsx, StorePage.jsx, DetailPage.jsx
│       ├── CartPage.jsx, OrdersPage.jsx, ProfilePage.jsx, AuthCallback.jsx
│       ├── AdminPage.jsx, AdminProductPage.jsx
│       ├── AdminOrderPage.jsx, AdminUserPage.jsx, AdminReviewPage.jsx
│       └── ProtectedRoute.jsx
├── context/
│   ├── UIContext.jsx    toasts, loginOpen, checkoutOpen
│   ├── AuthContext.jsx  user, loginAs, logout, isGuest
│   └── CartContext.jsx  sessionCart, addToCart, removeFromCart, checkout
├── hook/
│   ├── useAuthForm.js      handleLogin, handleRegister
│   ├── useProduct.js       useProducts, useCategories, useProductDetail
│   ├── useOrders.js        useMyOrders, useCancelOrder, useDownload
│   ├── useProfile.js       usePurchases, useUpdateDisplayName, useUpdatePassword
│   ├── useReview.js        useProductReviews, useReviewActions
│   ├── useCheckout.js      付款流程（建立訂單 + 付款）
│   ├── useAdminProducts.js 後台商品管理
│   └── useFetch.js
├── utils/
│   ├── ApiFuction.js   所有 API 呼叫
│   ├── tokenHelper.js  TOKEN_KEY, USER_KEY, REFRESH_KEY
│   └── roleHelper.js   hasRole, isAdmin, isManager, isSupport
├── App.jsx             懶加載路由 + Provider 層
├── main.jsx
└── index.css
```

---

## 待完成功能

- [ ] Token 自動刷新（等 HttpOnly Cookie）
- [ ] HttpOnly Cookie 認證（等組員完成後端）
- [ ] 後台訂單管理（等後端 Admin Controller）
- [ ] 後台用戶管理（等後端 Admin Controller）
- [ ] 後台評論管理（等後端 Admin Controller）
- [ ] 後台儀表板統計數據（等後端 Admin Stats API）
- [ ] 頭像上傳功能（等後端 API）

---

## 注意事項

- `.env` 和 `appsettings.json` 不應提交到 Git
- Google OAuth Callback URL 需在 Google Cloud Console 設定為 `https://localhost:7124/signin-google`
- 跨網路連線資料庫需要開啟 Tailscale VPN
- 後台需要 `manager` 以上角色才能進入，可透過 SQL 設定角色
