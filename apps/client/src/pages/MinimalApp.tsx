export default function MinimalApp() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#111827', 
      color: 'white', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '32px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>
        ✅ Minimal App Works!
      </h1>
      <p style={{ marginBottom: '24px' }}>
        This proves React is working without complex dependencies.
      </p>
      <button 
        onClick={() => window.location.href = '/dashboard'}
        style={{
          backgroundColor: '#ea384c',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Test Dashboard
      </button>
    </div>
  );
}