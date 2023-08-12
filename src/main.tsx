import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Auth0Provider } from '@auth0/auth0-react';

const auth0Domain:string = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId:string = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0Audience:string = import.meta.env.VITE_AUTH0_AUDIENCE

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <Auth0Provider 
        domain={auth0Domain}
        clientId={auth0ClientId}
        authorizationParams={{
            redirect_uri: window.location.origin,
            audience: 'https://dev-exk13zfqzlld70vx.us.auth0.com/api/v2/'
        }}>
          <App />
      </Auth0Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
