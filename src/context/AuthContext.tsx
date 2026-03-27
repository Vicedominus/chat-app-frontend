import { createContext, useState, useContext, type ReactNode } from 'react';

type UserContextType = {
  username: string;
} | null;

interface AuthContextType {
  user: UserContextType;
  authTokens: {
    accessToken: string;
    refreshToken: string;
  } | null;
  loginUser: (tokens: { access: string; refresh: string }, username: string) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  });

  const [user, setUser] = useState<UserContextType>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loginUser = (tokens: { access: string; refresh: string }, username: string) => {
    const newTokens = { accessToken: tokens.access, refreshToken: tokens.refresh };
    setAuthTokens(newTokens);
    setUser({ username });
    localStorage.setItem('authTokens', JSON.stringify(newTokens));
    localStorage.setItem('user', JSON.stringify({ username }));
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
