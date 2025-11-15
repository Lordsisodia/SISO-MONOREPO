import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

// New architecture providers
import { ClerkSupabaseProvider } from '@app/providers/ClerkSupabaseProvider'
import { QueryProvider } from '@app/providers/QueryProvider'
import { RealtimeProvider } from '@app/providers/RealtimeProvider'
import { initSentry } from '@app/providers/ErrorMonitoring'

// Initialize Sentry error monitoring
initSentry()

// Filter out harmless development errors in console
if (import.meta.env.DEV) {
  const originalError = console.error;
  console.error = (...args) => {
    const message = args.join(' ');
    // Suppress common development tool connection errors
    if (message.includes('net::ERR_CONNECTION_REFUSED') ||
        message.includes('18883') ||
        message.includes('Failed to load resource')) {
      return; // Suppress these specific errors
    }
    originalError.apply(console, args);
  };
}

// Get base path from environment (for subdirectory deployment)
const basename = import.meta.env.PROD ? '/partners' : '/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkSupabaseProvider>
      <HelmetProvider>
        <BrowserRouter basename={basename}>
          <QueryProvider>
            <RealtimeProvider>
              <App />
            </RealtimeProvider>
          </QueryProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ClerkSupabaseProvider>
  </React.StrictMode>
)
