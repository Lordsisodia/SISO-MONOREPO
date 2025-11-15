export default function TestDashboard() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827', color: 'white', padding: '32px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '16px' }}>
        ✅ Ultra Simple Dashboard Works!
      </h1>
      <p style={{ marginBottom: '16px' }}>
        This is the most basic possible dashboard component.
      </p>
      <button 
        onClick={() => window.location.href = '/'}
        style={{
          backgroundColor: '#3B82F6',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Back to Home
      </button>
    </div>
  );
}