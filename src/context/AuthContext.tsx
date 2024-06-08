import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const accessToken = localStorage.getItem('access_token');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!accessToken);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
