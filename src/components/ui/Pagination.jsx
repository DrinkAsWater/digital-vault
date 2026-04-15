const Pagination = ({ page, totalPages, onPageChange }) => {
    if(totalPages <= 1)return null;

    const pages = Array.from({ length: totalPages}, (_, i) => i+1);

    // 只顯示附近的頁碼
    const visiblePages = pages.filter(p => 
        p===1 || p === totalPages || Math.abs(p-page) <= 2
    );

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginTop: '20px',
        }}>
            <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            style={{
            padding: '7px 14px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: page === 1 ? 'var(--muted)' : 'var(--text)',
            cursor: page === 1 ? 'not-allowed' : 'pointer',
            fontSize: '0.82rem',
            transition: '.2s',
            }}
        >
            ← 上一頁
        </button>

        {visiblePages.map((p, i) => {
            const prev = visiblePages[i - 1];
            const showEllipsis = prev && p - prev > 1;
            return (
            <span key={p} style={{ display: 'flex', gap: '6px' }}>
                {showEllipsis && (
                <span style={{ color: 'var(--muted)', padding: '7px 4px' }}>...</span>
                )}
                <button
                onClick={() => onPageChange(p)}
                style={{
                    width: '36px',
                    height: '36px',
                    border: `1px solid ${p === page ? 'var(--cyan)' : 'var(--border)'}`,
                    borderRadius: '8px',
                    background: p === page ? 'rgba(0,247,255,0.1)' : 'var(--surface)',
                    color: p === page ? 'var(--cyan)' : 'var(--text)',
                    fontFamily: p === page ? "'Syne', sans-serif" : 'inherit',
                    fontWeight: p === page ? 700 : 400,
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    transition: '.2s',
                }}
                >
            {p}
                </button>
            </span>
            );
        })}

        <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            style={{
            padding: '7px 14px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: page === totalPages ? 'var(--muted)' : 'var(--text)',
            cursor: page === totalPages ? 'not-allowed' : 'pointer',
            fontSize: '0.82rem',
            transition: '.2s',
            }}
        >
            下一頁 →
        </button>
    </div>
    );
};

export default Pagination;