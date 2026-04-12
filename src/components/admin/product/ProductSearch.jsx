import { useState, useEffect } from "react";

const SORT_OPTIONS = [
  { value: "", label: "預設排序" },
  { value: "price_asc", label: "價格低到高" },
  { value: "price_desc", label: "價格高到低" },
  { value: "createdAt_desc", label: "最新上架" },
  { value: "createdAt_asc", label: "最舊上架" },
];

const ProductSearch = ({ onSearch, onSortChange, sortBy }) => {
  const [inputValue, setInputValue] = useState("");

  // debounce 在元件內部處理
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue, onSearch]);

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        padding: "0 60px 20px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
        <input
          type="text"
          placeholder="搜尋商品名稱或描述..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            width: "100%",
            padding: "9px 14px 9px 36px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "9px",
            color: "var(--text)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.88rem",
            outline: "none",
            transition: ".2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--cyan)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
        <span
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--muted)",
            fontSize: "0.85rem",
            pointerEvents: "none",
          }}
        >
          🔍
        </span>
      </div>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        style={{
          padding: "9px 14px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "9px",
          color: "var(--text)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.88rem",
          outline: "none",
          cursor: "pointer",
          minWidth: "140px",
        }}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSearch;
