# 📋 Vue 3 + TypeScript + Element Plus 操作紀錄管理系統

這是一個結合了**操作歷程查詢**與**即時統計數據卡片**的後台管理介面。

除了基本的「查詢記錄」與「分頁瀏覽」功能外，還整合了**多條件篩選**（操作者、操作類型、日期區間）、**今日統計摘要**，並透過 **Element Plus** 的現代化 UI 元件呈現操作記錄，讓管理員能一目了然掌握系統動態。

---

## 🚀 核心功能特色

- **⚡ 技術開發**：使用 **Vue 3** + **TypeScript** + **Vite** 提供極速的開發與網頁載入體驗。
- **📊 今日統計卡片**：即時呈現今日操作總數、異常阻擋紀錄與當前活躍管理員人數。
- **🔍 多條件搜尋**：
  - **操作人篩選**：輸入關鍵字即時過濾操作人員。
  - **操作類型篩選**：可依「全部」、「新增」、「修改」、「刪除」分類查詢。
  - **日期區間篩選**：透過日期選擇器指定查詢起訖時間。
- **📋 分頁資料表**：可調整每頁顯示筆數，支援換頁查詢操作記錄。
- **🔄 一鍵重置**：快速還原至預設搜尋條件（今日範圍），方便快速重新查詢。
- **📱 響應式佈局**：搜尋列在手機與桌機裝置均能正常顯示。

---

## 🛠️ 技術棧與工具

- **前端框架**：[Vue 3](https://vuejs.org/) (Composition API + `<script setup>`)
- **程式語言**：[TypeScript](https://www.typescriptlang.org/)
- **建置工具**：[Vite](https://vitejs.dev/)
- **UI 元件庫**：[Element Plus](https://element-plus.org/)
- **狀態管理**：[Pinia](https://pinia.vuejs.org/)
- **路由管理**：[Vue Router](https://router.vuejs.org/)
- **樣式處理**：[Sass / SCSS](https://sass-lang.com/)
- **日期處理**：[Day.js](https://day.js.org/)
- **程式碼檢查**：[ESLint](https://eslint.org/)
- **代碼格式化**：[Oxc (oxfmt)](https://oxc.rs) & [Prettier](https://prettier.io/) 雙效結合

---

## 📂 專案目錄結構

```text
src/
├── api/                 # API 請求函式
│   ├── operationLogList.ts    # 操作記錄列表 API
│   └── todayOperationLog.ts   # 今日統計資料 API
├── components/          # 共用元件
│   ├── card/            # 今日統計數據卡片
│   └── operateHistoryTable/   # 操作記錄分頁表格
├── types/               # TypeScript 型別定義檔
│   ├── operateHistory.ts
│   └── constants.ts
├── router/              # Vue Router 路由設定
├── assets/              # 靜態資源（圖片、字型）
├── views/
│   └── operateHistory.vue   # 操作歷程主頁面（佈局與邏輯）
├── App.vue              # 應用程式入口元件
└── main.ts              # 專案渲染起點
```

---

## ⚙️ 快速啟動指南

### 1. 安裝套件

在專案根目錄下執行以下指令安裝所需套件：

```bash
npm install
```

### 2. 啟動開發伺服器

啟動本地端開發環境：

```bash
npm run dev
```

### 3. 專案打包

將專案編譯並打包以供部署：

```bash
npm run build
```

---

## 🧪 開發常用指令

- `npm run dev`：啟動開發模式
- `npm run build`：檢查 TypeScript 並打包專案
- `npm run preview`：本地預覽打包結果
- `npm run type-check`：執行 TypeScript 型別檢查
- `npm run lint`：執行 ESLint 程式碼檢查與修復
- `npm run format`：使用 **oxfmt** 進行極速排版修正
- `npm run format:prettier`：使用 **Prettier** 完整格式化 `src/` 內的所有程式碼並直接覆寫

---

## 🌐 環境需求

- **Node.js**：`^22.18.0` 或 `>=24.12.0`
- **npm**：v9 以上

---

## 專案簡介

`vue-operate-history` 是一套後台操作歷程管理介面，讓管理員可以清楚掌握：

- **今日操作總數**、**異常阻擋紀錄**、**當前活躍管理員人數** 等即時摘要。
- 依照「操作者」、「操作類型」、「操作時間區間」篩選操作記錄。
- 以分頁表格瀏覽完整歷史記錄。

---

## 功能特色

| 功能            | 說明                                                     |
| --------------- | -------------------------------------------------------- |
| 📊 今日統計卡片 | 顯示今日操作總數、異常紀錄、活躍管理員人數               |
| 🔍 多條件搜尋   | 支援依操作人、操作類型（新增／修改／刪除）、日期區間查詢 |
| 📋 分頁資料表   | 可調整每頁筆數，支援換頁查詢                             |
| 🔄 一鍵重置     | 快速還原至預設搜尋條件（今日範圍）                       |
| ⚡ 響應式佈局   | 搜尋列在手機與桌機均可正常顯示                           |

---

## 技術棧

| 分類         | 技術                                       |
| ------------ | ------------------------------------------ |
| 框架         | Vue 3 (Composition API + `<script setup>`) |
| 建構工具     | Vite                                       |
| UI 元件庫    | Element Plus                               |
| 狀態管理     | Pinia                                      |
| 路由         | Vue Router                                 |
| 型別系統     | TypeScript                                 |
| 樣式         | SCSS (scoped)                              |
| 日期處理     | Day.js                                     |
| 程式碼格式化 | Prettier、Oxc (oxfmt)、ESLint              |

---

## demo 連結

https://vite-vue-operate-log.vercel.app/

---
