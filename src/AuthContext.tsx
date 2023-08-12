import { createContext } from "react";
interface AuthContextType {
    userInfo: any; // adjust this type as necessary based on the shape of userInfo
    authToken: string | null;
}

const AuthContext = createContext<AuthContextType>({
    userInfo: null,
    authToken: null,
});
export default AuthContext;
