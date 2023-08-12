import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import LoginButton from './components/LoginButton';
import LogoutButton from "./components/LogoutButton";
import { useAuthToken } from "./useAuthToken";
import CheckUser from "./components/CheckUser";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AuthContext from "./AuthContext";

import './App.css'

const auth0Domain:string = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId:string = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0Audience:string = import.meta.env.VITE_AUTH0_AUDIENCE
if (!auth0Domain || !auth0ClientId) {
    throw new Error("Missing Auth0 Domain or Client ID")
}



function App() {
    const authToken = useAuthToken();
    const fetchUserInfo = async () => {
        if (authToken) {
            try {
                const response = await axios.get('http://127.0.0.1:5000/auth/users', {
                    headers: { 'Authorization': `Bearer ${authToken}` }
                });
                return response.data;
            } catch (error) {
                console.log(error)
                return error;
            }
        }
    }

    const { data: userInfo, isLoading: isLoadingUserInfo, error: userError } = useQuery(['userInfo'], fetchUserInfo, { enabled: !!authToken })
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth0();
    console.log("isAuthenticated",isAuthenticated)
    const ProtectedRoute = ({ component: Component }: { component: React.ElementType }) => {
        if (isAuthLoading||isLoadingUserInfo) {
            return <p>Loading...</p>; // Show a loading state while checking authentication
        }
        if (isAuthenticated && userInfo.data!==false) {
            return <Component />;
        }
        else if (isAuthenticated && userInfo.data===false) {
            //modal to create profile component here
            return <p>make an accoutn dude</p>
        }
        else {
            console.log("not here fatass")
            return <Navigate to="/" />;
        }
    };

    const UnauthenticatedRoute = ({ component: Component }: { component: React.ElementType }) => {
        if (isAuthLoading||isLoadingUserInfo) {
            return <p>Loading...</p>; // Show a loading state while checking authentication
        }
        if (!isAuthenticated) {
            return <Component />;
        } else {
            return <Navigate to="/protected" />;
        }
    };

    


    return (
        <AuthContext.Provider value={{userInfo, authToken}}>
            <BrowserRouter>
                <LoginButton/>
                <LogoutButton/>
                {/* <Header/> */}
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/checkthisout" element={<p>yo</p>} />
                    <Route path='/thishere' element={ <ProtectedRoute component={() => <p>check this out</p>} />} />
                    {/* <Route path="/login" element={<LoginScreen />} />
                    <Route path="/signup" element={<SignupPage />} /> */}
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App
