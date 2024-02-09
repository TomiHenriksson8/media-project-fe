// UserContext.tsx
import React, { createContext, useState } from 'react';
import { UserWithNoPassword } from '../types/DBTypes';
import { useAuthentication, useUser } from '../hooks/apiHooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContextType, Credentials } from '../types/LocalTypes';
/* import { LoginResponse } from '../types/MessageTypes'; */

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserWithNoPassword | null>(null);
    const { postLogin } = useAuthentication();
    const { getUserByToken } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    // login, logout and autologin functions are here instead of components
    const handleLogin = async (credentials: Credentials) => {
        try {
            const loginResponse = await postLogin(credentials);
            if (loginResponse) {
              localStorage.setItem('token', loginResponse.token)
              setUser(loginResponse.user)
              navigate('/');
            } else {
              setUser(null);
            }
            // loginResponse ? (localStorage.setItem('token', loginResponse.token), setUser(loginResponse.user)) : setUser(null);
          } catch (e) {
            console.log((e as Error).message);

        }
    };

    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            setUser(null);
            navigate('/');
        } catch (e) {
            console.log((e as Error).message);
        }
    };

    // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
    const handleAutoLogin = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const user = await getUserByToken(token);
                setUser(user.user);
                // when page is refreshed, the user is redirected to origin (see ProtectedRoute.tsx)
                const origin = location.state.from.pathname || '/';
                navigate(origin);
            }
        } catch (e) {
            console.log((e as Error).message);
        }
    };

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout, handleAutoLogin }}>
            {children}
        </UserContext.Provider>
    );
};


export { UserProvider, UserContext };
