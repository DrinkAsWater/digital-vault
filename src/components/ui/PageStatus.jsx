const PageStatus = ({ loading, error }) => {
  if (loading)
    return (
      <div
        style={{ padding: "60px", color: "var(--muted)", textAlign: "center" }}
      >
        載入中...
      </div>
    );
  if (error)
    return (
      <div
        style={{ padding: "60px", color: "var(--danger)", textAlign: "center" }}
      >
        錯誤：{error}
      </div>
    );
  return null;
};

export default PageStatus;
