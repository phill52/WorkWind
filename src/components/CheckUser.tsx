import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../AuthContext";

export default function CheckUser(): JSX.Element {
    const { isAuthenticated, getAccessTokenSilently, getAccessTokenWithPopup } =
        useAuth0();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    const { userInfo, authToken } = useContext(AuthContext);
    const handleButtonClick = async () => {
        if (authToken) {
            console.log(`Bearer ${authToken}`);
            try {
                const response = await axios.get(
                    "http://127.0.0.1:5000/auth/users",
                    {
                        headers: { Authorization: `Bearer ${authToken}` },
                    },
                );
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log("Access Token not found");
        }
    };

    return (
        <div>
            {isAuthenticated && (
                <button onClick={handleButtonClick}>Click me</button>
            )}
        </div>
    );
}
