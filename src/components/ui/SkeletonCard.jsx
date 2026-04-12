const SkeletonCard = () => (
  <div
    style={{
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "14px",
      overflow: "hidden",
    }}
  >
    {/* 圖片骨架 */}
    <div
      style={{
        height: "170px",
        background:
          "linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
      }}
    />
    <div style={{ padding: "18px" }}>
      {/* 分類骨架 */}
      <div
        style={{
          height: "12px",
          width: "60px",
          borderRadius: "6px",
          background:
            "linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
          marginBottom: "10px",
        }}
      />
      {/* 標題骨架 */}
      <div
        style={{
          height: "16px",
          width: "80%",
          borderRadius: "6px",
          background:
            "linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
          marginBottom: "8px",
        }}
      />
      <div
        style={{
          height: "16px",
          width: "60%",
          borderRadius: "6px",
          background:
            "linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
          marginBottom: "14px",
        }}
      />
      {/* 價格和按鈕骨架 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "20px",
            width: "60px",
            borderRadius: "6px",
            background:
              "linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
        <div
          style={{
            height: "32px",
            width: "80px",
            borderRadius: "8px",
            background:
              "linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      </div>
    </div>
  </div>
);

export default SkeletonCard;
