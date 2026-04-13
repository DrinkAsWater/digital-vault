import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            padding: "40px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "20px" }}>⚠️</div>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "var(--text)",
              marginBottom: "10px",
            }}
          >
            頁面發生錯誤
          </div>
          <div
            style={{
              fontSize: "0.85rem",
              color: "var(--muted)",
              marginBottom: "28px",
              maxWidth: "400px",
              lineHeight: 1.6,
            }}
          >
            很抱歉，此頁面發生了預期外的錯誤，請嘗試重新整理或返回首頁。
          </div>
          {import.meta.env.DEV && this.state.error && (
            <div
              style={{
                background: "rgba(255,77,109,0.08)",
                border: "1px solid rgba(255,77,109,0.2)",
                borderRadius: "10px",
                padding: "14px 18px",
                fontSize: "0.78rem",
                color: "var(--danger)",
                marginBottom: "24px",
                maxWidth: "600px",
                textAlign: "left",
                fontFamily: "monospace",
                wordBreak: "break-all",
              }}
            >
              {this.state.error.message}
            </div>
          )}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              className="btn-primary"
              onClick={() => window.location.reload()}
            >
              重新整理
            </button>
            <button
              className="btn-outline"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = "/";
              }}
            >
              返回首頁
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
