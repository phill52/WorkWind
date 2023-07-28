import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Auth0Provider } from '@auth0/auth0-react';
// import LoginScreen from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import LoginButton from './components/LoginButton';
import LogoutButton from "./components/LogoutButton";
import './App.css'

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
if (!auth0Domain || !auth0ClientId) {
    throw new Error("Missing Auth0 Domain or Client ID")
}

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Auth0Provider 
                    domain='dev-exk13zfqzlld70vx.us.auth0.com'
                    clientId='tyJQ9d8HCTu5BSrvNUBpA6EQv6BhzWJZ'
                    authorizationParams={{
                        redirect_uri: window.location.origin,
                        }}>
                <BrowserRouter>
                            <LoginButton/>
                            <LogoutButton/>
                            {/* <Header/> */}
                            <Routes>
                                <Route path="/" element={<Homepage />} />
                                {/* <Route path="/login" element={<LoginScreen />} />
                                <Route path="/signup" element={<SignupPage />} /> */}
                        </Routes>
                </BrowserRouter>
            </Auth0Provider>
        </QueryClientProvider>
    )
}

export default App
