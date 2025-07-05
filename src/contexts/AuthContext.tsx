import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, AuthContextType, LoginCredentials, RegisterCredentials, User } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return { ...state, isLoading: true, error: null };
    
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    
    case 'LOGIN_ERROR':
    case 'REGISTER_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    default:
      return state;
  }
}

// Mock authentication functions (replace with real API calls)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    status: 'active',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'editor@example.com',
    firstName: 'Editor',
    lastName: 'User',
    role: 'editor',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

const mockLogin = async (credentials: LoginCredentials): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  const user = mockUsers.find(u => u.email === credentials.email);
  if (!user || credentials.password !== 'password123') {
    throw new Error('Invalid email or password');
  }
  
  const updatedUser = { ...user, lastLogin: new Date().toISOString() };
  localStorage.setItem('auth_user', JSON.stringify(updatedUser));
  return updatedUser;
};

const mockRegister = async (credentials: RegisterCredentials): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (mockUsers.some(u => u.email === credentials.email)) {
    throw new Error('User with this email already exists');
  }
  
  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    email: credentials.email,
    firstName: credentials.firstName,
    lastName: credentials.lastName,
    role: 'viewer',
    status: 'active',
    createdAt: new Date().toISOString(),
  };
  
  mockUsers.push(newUser);
  localStorage.setItem('auth_user', JSON.stringify(newUser));
  return newUser;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch {
        localStorage.removeItem('auth_user');
      }
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const user = await mockLogin(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error instanceof Error ? error.message : 'Login failed' });
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    dispatch({ type: 'REGISTER_START' });
    try {
      const user = await mockRegister(credentials);
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'REGISTER_ERROR', payload: error instanceof Error ? error.message : 'Registration failed' });
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}