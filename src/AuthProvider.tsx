import { useAuth0 } from "@auth0/auth0-react"
const createToken = async () => {
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE
    const {isAuthenticated,getAccessTokenSilently} = useAuth0();
    if (!isAuthenticated) return null;
    const accessToken = await getAccessTokenSilently({
        authorizationParams: {
            audience: audience,  // The identifier of your API as set in your Auth0 dashboard
        }
    });
    const payloadHeader = {
        headers: {
            'Content-Type': 'application/json, multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
        },
    };
    return accessToken;
}

export {createToken};