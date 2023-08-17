import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useAuthToken = (): string | null => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const auth0Domain: string = import.meta.env.VITE_AUTH0_DOMAIN;
  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            scopes: ['openid', 'profile', 'email']
          },
        });
        console.log(accessToken);
        setAuthToken(accessToken);
      }
    };
    fetchToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return authToken;
};
