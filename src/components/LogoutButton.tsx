import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    console.log("logout", isAuthenticated);
    return (
        isAuthenticated && (
            <button
                onClick={() =>
                    logout({
                        logoutParams: { returnTo: window.location.origin },
                    })
                }
            >
                Sign Out
            </button>
        )
    );
};

export default LogoutButton;
