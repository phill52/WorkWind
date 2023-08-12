import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Header(): JSX.Element {
    const { user, isLoaded, isSignedIn } = useUser();

    if (!isLoaded) {
        return (
            <div className="header">
                <h1>Loading...</h1>
            </div>
        );
    } else if (!isSignedIn) {
        return (
            <div className="header">
                <ul className="header-item-container">
                    <li>WorkWind</li>
                    <li>
                        <Link to="/signin">Sign In</Link>
                    </li>
                </ul>
            </div>
        );
    } else {
        return (
            <div className="header">
                <ul className="header-item-container">
                    <li>
                        <Link to="/">WorkWind</Link>
                    </li>
                    <li>
                        <Link to="/projects">Projects</Link>
                    </li>
                    <li>{user.fullName}</li>
                    <li>
                        <UserButton />
                    </li>
                    {/* <li><Link to='/signout' onClick={signOut}>Sign Out</Link></li> */}
                </ul>
            </div>
        );
    }
}
