const ProfileStats = ({ purchases }) => {
  const stats = [
    { value: purchases.length, label: '已購商品' },
    { value: 0, label: '待處理訂單' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
      {stats.map(({ value, label }) => (
        <div
          key={label}
          style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}
        >
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.8rem', fontWeight: 800, color: 'var(--cyan)' }}>
            {value}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '4px' }}>{label}</div>
        </div>
      ))}
    </div>
  )
}

export default ProfileStats