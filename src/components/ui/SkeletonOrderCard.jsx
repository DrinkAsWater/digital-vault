const SkeletonOrderCard = () => (
  <div
    style={{
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "14px",
      padding: "24px",
      marginBottom: "16px",
    }}
  >
    {/* 訂單標題列 */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          height: "16px",
          width: "160px",
          borderRadius: "6px",
          background:
            "linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      />
      <div
        style={{
          height: "24px",
          width: "70px",
          borderRadius: "20px",
          background:
            "linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      />
    </div>

    {/* 商品 chip */}
    <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
      {[1, 2].map((i) => (
        <div
          key={i}
          style={{
            height: "32px",
            width: "120px",
            borderRadius: "8px",
            background:
              "linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      ))}
    </div>

    {/* 底部列 */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "14px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          height: "14px",
          width: "100px",
          borderRadius: "6px",
          background:
            "linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      />
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
    </div>
  </div>
);

export default SkeletonOrderCard;
