import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  requiredPermission 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth in App.tsx
  }

  // Check role requirement
  if (requiredRole) {
    const roleHierarchy: Record<UserRole, number> = {
      viewer: 1,
      editor: 2,
      admin: 3
    };

    if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground">
              You don't have sufficient permissions to access this page.
            </p>
          </div>
        </div>
      );
    }
  }

  // Check permission requirement
  if (requiredPermission) {
    // Implementation would check user permissions here
    // For now, we'll use role-based logic
  }

  return <>{children}</>;
}