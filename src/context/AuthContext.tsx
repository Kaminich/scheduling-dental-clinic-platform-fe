import { jwtDecode } from 'jwt-decode';
import { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { formatRoleString } from '../utils/formatRoleString';

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    role: string;
    setRole: Dispatch<SetStateAction<string>>;
}

interface DecodeJWTRole {
    role: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const accessToken = localStorage.getItem('access_token');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!accessToken);

    let initialRole = '';
    if (accessToken) {
        const decoded = jwtDecode<DecodeJWTRole>(accessToken);
        initialRole = formatRoleString(decoded.role[0]);
    }

    const [role, setRole] = useState<string>(initialRole);

    useEffect(() => {
        if (accessToken) {
            const decoded = jwtDecode<DecodeJWTRole>(accessToken);
            setRole(formatRoleString(decoded.role[0]));
        } else {
            setRole('');
        }
    }, [accessToken])


    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, role, setRole }}>
            {children}
        </AuthContext.Provider>
    );
};
