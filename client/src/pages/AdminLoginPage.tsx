import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database } from "lucide-react";

interface AdminLoginPageProps {}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/admin/login-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Login Failed", {
          description: data.message || "Invalid credentials",
        });
        return;
      }

      localStorage.setItem("adminToken", data.token);

      toast.success("Logged in as admin");
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error", {
        description: "Server not reachable",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4"
      style={{ background: "var(--gradient-blush)", backgroundAttachment: "fixed" }}
    >
      <div className="w-full max-w-md">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-2xl shadow-card p-8 lg:p-10">
          <div className="flex flex-col items-center mb-8">
            <span className="p-3 rounded-xl bg-accent/20 text-accent mb-4">
              <Database className="w-10 h-10" />
            </span>
            <h1 className="font-display text-2xl lg:text-3xl font-semibold text-foreground">
              Admin Login
            </h1>
            <p className="text-muted-foreground text-sm mt-2">Sign in to manage your products</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background border-border h-12"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background border-border h-12"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-card hover:shadow-glow transition-all duration-300"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
