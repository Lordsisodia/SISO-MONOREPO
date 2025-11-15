"use client";

export function TestGeneralSettingsScreen() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .test-text-visible {
            color: #000000 !important;
            font-weight: bold !important;
          }
          .test-title {
            color: #000000 !important;
            font-size: 28px !important;
            font-weight: bold !important;
            margin-bottom: 20px !important;
          }
          .test-card-title {
            color: #000000 !important;
            font-size: 18px !important;
            font-weight: bold !important;
            margin-bottom: 8px !important;
          }
          .test-card-text {
            color: #333333 !important;
            font-size: 16px !important;
            line-height: 1.4 !important;
          }
        `
      }} />
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
        <h1 className="test-title">
          General Settings (TEST - CSS Override)
        </h1>

      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #ddd'
      }}>
        <p className="test-text-visible" style={{ fontSize: '18px' }}>
          If you can see this text with CSS override, the component is working!
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px'
      }}>
        <div style={{
          backgroundColor: '#fef3c7',
          border: '2px solid #f59e0b',
          padding: '20px',
          borderRadius: '12px'
        }}>
          <h3 className="test-card-title">
            Appearance & Accessibility
          </h3>
          <p className="test-card-text">
            Theme, contrast, font size, reduced motion
          </p>
        </div>

        <div style={{
          backgroundColor: '#dbeafe',
          border: '2px solid #3b82f6',
          padding: '20px',
          borderRadius: '12px'
        }}>
          <h3 className="test-card-title">
            Language & Region
          </h3>
          <p className="test-card-text">
            Language, timezone, number/currency formats
          </p>
        </div>

        <div style={{
          backgroundColor: '#e9d5ff',
          border: '2px solid #8b5cf6',
          padding: '20px',
          borderRadius: '12px'
        }}>
          <h3 className="test-card-title">
            Notifications
          </h3>
          <p className="test-card-text">
            Email, push, and in-app notification preferences
          </p>
        </div>

        <div style={{
          backgroundColor: '#d1fae5',
          border: '2px solid #10b981',
          padding: '20px',
          borderRadius: '12px'
        }}>
          <h3 className="test-card-title">
            App Integrations
          </h3>
          <p className="test-card-text">
            Connect Notion, Google Drive, Calendar, and other tools
          </p>
        </div>
      </div>
    </div>
    </>
  );
}