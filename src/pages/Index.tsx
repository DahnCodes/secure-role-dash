import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowRight, Lock, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="mx-auto bg-gradient-primary p-4 rounded-full w-20 h-20 flex items-center justify-center mb-8">
            <Shield className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Secure Role-Based
            <span className="bg-gradient-primary bg-clip-text text-transparent block">
              Dashboard Platform
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Demonstrating React Security with TypeScript. Experience enterprise-grade 
            authentication, role-based access control, and type-safe user management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-primary shadow-medium hover:shadow-large transition-all">
              <Link to="/auth">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="shadow-soft">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-medium bg-gradient-card border-0">
            <CardHeader>
              <div className="bg-gradient-primary p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Type-Safe Security</CardTitle>
              <CardDescription>
                Built with TypeScript for compile-time security and runtime type checking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Strict type definitions</li>
                <li>• Form validation with Zod</li>
                <li>• API response typing</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium bg-gradient-card border-0">
            <CardHeader>
              <div className="bg-gradient-primary p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Role-Based Access</CardTitle>
              <CardDescription>
                Multi-level authorization with admin, editor, and viewer roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Protected routes</li>
                <li>• Permission-based UI</li>
                <li>• Secure API calls</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium bg-gradient-card border-0">
            <CardHeader>
              <div className="bg-gradient-primary p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Complete CRUD operations with security best practices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• User registration</li>
                <li>• Profile management</li>
                <li>• Audit logging</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Demo Credentials */}
        <Card className="max-w-2xl mx-auto shadow-large bg-gradient-card border-0">
          <CardHeader className="text-center">
            <CardTitle>Demo Credentials</CardTitle>
            <CardDescription>
              Try different user roles to see the security features in action
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-destructive mb-2">Admin Access</h4>
                <p className="text-sm">Email: admin@example.com</p>
                <p className="text-sm">Password: password123</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Editor Access</h4>
                <p className="text-sm">Email: editor@example.com</p>
                <p className="text-sm">Password: password123</p>
              </div>
            </div>
            <div className="text-center pt-4">
              <Button asChild className="bg-gradient-primary">
                <Link to="/auth">
                  Start Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
