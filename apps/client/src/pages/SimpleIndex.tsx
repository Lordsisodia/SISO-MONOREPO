export default function SimpleIndex() {
  const goToDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#111827', 
      color: 'white', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '800px' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #ea384c, #d42c47)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Welcome to SISO
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          marginBottom: '32px',
          color: '#9CA3AF'
        }}>
          Your simplified client portal experience
        </p>

        <div style={{ marginBottom: '48px' }}>
          <div style={{
            backgroundColor: '#374151',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid #4B5563',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#10B981' }}>
              ✅ Quick Access
            </h3>
            <p style={{ color: '#D1D5DB', marginBottom: '16px' }}>
              Skip the complex onboarding - jump straight to your dashboard!
            </p>
          </div>
        </div>

        <button 
          onClick={goToDashboard}
          style={{
            backgroundColor: '#ea384c',
            color: 'white',
            padding: '16px 32px',
            fontSize: '1.125rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#d42c47';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#ea384c';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Go to Dashboard →
        </button>

        <p style={{ 
          marginTop: '24px', 
          color: '#6B7280',
          fontSize: '0.875rem'
        }}>
          No authentication required for this simplified experience
        </p>
      </div>
    </div>
  );
}