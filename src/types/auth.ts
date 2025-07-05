export interface User {
  id: string;
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  status: UserStatus;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export type UserRole = 'admin' | 'editor' | 'viewer';

export type UserStatus = 'active' | 'inactive' | 'pending';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Permissions based on roles
export const PERMISSIONS = {
  admin: ['read', 'write', 'delete', 'manage_users'] as const,
  editor: ['read', 'write'] as const,
  viewer: ['read'] as const
} as const;

export type Permission = 'read' | 'write' | 'delete' | 'manage_users';