import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Try to import existing components - if they fail, we'll catch the errors
let LandingPage, Home;
try {
  LandingPage = require('@/components/landing/LandingPage').default;
} catch (error) {
  console.warn('Could not import LandingPage:', error.message);
}

try {
  Home = require('@/pages/Home').default;
} catch (error) {
  console.warn('Could not import Home:', error.message);
}

// Fallback Simple Dashboard if real components fail
function SimpleDashboard() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#111827', 
      color: 'white', 
      padding: '32px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
            🎉 SISO Dashboard (Fallback)
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>
            Simplified version while fixing dependencies
          </p>
        </header>
        
        <div style={{
          backgroundColor: '#1F2937',
          padding: '32px',
          borderRadius: '12px',
          border: '1px solid #374151',
          textAlign: 'center'
        }}>
          <p style={{ marginBottom: '24px' }}>
            The main dashboard components have dependency issues that prevent loading.
            This is a simplified version while we resolve the {`process.env`} and routing issues.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#10B981',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Refresh App
          </button>
        </div>
      </div>
    </div>
  );
}

// Fallback Landing Page if real component fails
function FallbackLandingPage({ onEnterDashboard }: { onEnterDashboard: () => void }) {
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
      <div style={{ maxWidth: '600px' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          SISO AGENCY
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          marginBottom: '16px',
          color: '#9CA3AF'
        }}>
          Scalable Intelligence Systems Operator
        </p>
        <p style={{ 
          fontSize: '1rem', 
          marginBottom: '48px',
          color: '#6B7280'
        }}>
          Premium digital solutions for ambitious businesses. Deploy intelligent automation 
          that scales with your growth.
        </p>
        
        <div style={{ marginBottom: '32px' }}>
          <button 
            onClick={onEnterDashboard}
            style={{
              backgroundColor: '#ea384c',
              color: 'white',
              padding: '16px 32px',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 14px 0 rgba(234, 56, 76, 0.3)',
              transition: 'all 0.2s ease',
              marginRight: '16px'
            }}
          >
            🚀 Launch Dashboard
          </button>
          
          <button 
            onClick={() => alert('Authentication coming soon! For now, enjoy the simplified dashboard.')}
            style={{
              backgroundColor: 'transparent',
              color: '#9CA3AF',
              padding: '16px 32px',
              border: '2px solid #374151',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Login Later
          </button>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '32px',
          flexWrap: 'wrap',
          fontSize: '0.9rem',
          color: '#6B7280'
        }}>
          <span>✅ Zero Dependencies</span>
          <span>⚡ Instant Access</span>
          <span>🔒 Secure by Design</span>
        </div>
      </div>
    </div>
  );
}

function SISOApp() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard'>('landing');

  const renderLandingPage = () => {
    // Try to use the real LandingPage component if it loaded successfully
    if (LandingPage) {
      try {
        return <LandingPage />;
      } catch (error) {
        console.warn('Real LandingPage failed to render:', error.message);
        return <FallbackLandingPage onEnterDashboard={() => setCurrentPage('dashboard')} />;
      }
    }
    // Fall back to our simple landing page
    return <FallbackLandingPage onEnterDashboard={() => setCurrentPage('dashboard')} />;
  };

  const renderDashboard = () => {
    // Try to use the real Home component if it loaded successfully
    if (Home) {
      try {
        return <Home />;
      } catch (error) {
        console.warn('Real Home component failed to render:', error.message);
        return <SimpleDashboard />;
      }
    }
    // Fall back to our simple dashboard
    return <SimpleDashboard />;
  };

  return currentPage === 'landing' ? renderLandingPage() : renderDashboard();
}

ReactDOM.createRoot(document.getElementById('root')!).render(<SISOApp />);