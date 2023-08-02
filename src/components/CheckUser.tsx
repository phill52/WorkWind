import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function CheckUser(): JSX.Element {
    const { isAuthenticated, getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE

    useEffect(() => {
        const getAccessToken = async () => {
            const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
            try {
                const accessToken_ = await getAccessTokenWithPopup({
                    authorizationParams:{
                        audience: audience,  // The identifier of your API as set in your Auth0 dashboard
                }
                }) as string;
                console.log(accessToken_)
                setAccessToken(accessToken_);
            } catch (e) {
                console.error(e);
            }
        };
        if (isAuthenticated) {
            getAccessToken();
        }
    }, [getAccessTokenSilently, isAuthenticated]);

    const handleButtonClick = async () => {
        if (accessToken) {
            try {
                const response = await axios.get('http://127.0.0.1:5000/auth/users', {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log("Access Token not found");
        }
    }

    return (
        <div>
            {isAuthenticated &&
                <button onClick={handleButtonClick}>Click me</button>
            }
        </div>
    );
}
