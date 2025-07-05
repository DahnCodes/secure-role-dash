import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { UserManagement } from '@/components/dashboard/UserManagement';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PERMISSIONS } from '@/types/auth';
import { Shield, ShieldCheck, User, Activity, Users, Lock } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  const userPermissions = PERMISSIONS[user.role];
  const canManageUsers = (userPermissions as readonly string[]).includes('manage_users');

  const stats = [
    {
      title: 'Security Level',
      value: user.role === 'admin' ? 'High' : user.role === 'editor' ? 'Medium' : 'Standard',
      icon: Shield,
      color: user.role === 'admin' ? 'text-destructive' : user.role === 'editor' ? 'text-warning' : 'text-info'
    },
    {
      title: 'Active Sessions',
      value: '1',
      icon: Activity,
      color: 'text-success'
    },
    {
      title: 'Permissions',
      value: userPermissions.length.toString(),
      icon: Lock,
      color: 'text-primary'
    },
    {
      title: 'Last Updated',
      value: new Date(user.updated_at).toLocaleDateString(),
      icon: User,
      color: 'text-muted-foreground'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user.first_name}!
          </h1>
          <p className="text-muted-foreground">
            You're logged in as {user.role} with {userPermissions.length} permissions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Permissions Card */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Your Permissions
            </CardTitle>
            <CardDescription>
              These are the actions you can perform in this system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userPermissions.map((permission) => (
                <Badge key={permission} variant="outline" className="capitalize">
                  {permission.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Management - Admin Only */}
        {canManageUsers && (
          <UserManagement />
        )}

        {/* Role-specific content */}
        {!canManageUsers && (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Dashboard Access
              </CardTitle>
              <CardDescription>
                Your current role limits access to certain features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="mx-auto bg-muted rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Limited Access</h3>
                <p className="text-muted-foreground">
                  Contact an administrator to request additional permissions.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}