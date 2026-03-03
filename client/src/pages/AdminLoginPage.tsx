import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AdminLoginPageProps {}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      const response = await new Promise((resolve) => setTimeout(() => {
        if (email === 'admin@example.com' && password === 'password') {
          resolve({ success: true, token: 'fake-jwt-token' });
        } else {
          resolve({ success: false, message: 'Invalid credentials' });
        }
      }, 1500));

      if ((response as any).success) {
        localStorage.setItem('adminToken', (response as any).token);
        toast.success('Logged in as admin');
        navigate('/admin'); 
      } else {
        toast.error('Login Failed', { description: (response as any).message });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Error', { description: 'An unexpected error occurred.' });
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          style={styles.button}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '16px',
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '32px',
    color: '#eee',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#2a2a2a',
    padding: '32px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
  },
  input: {
    width: '100%',
    height: '50px',
    padding: '0 16px',
    marginBottom: '16px',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: '#3a3a3a',
    color: '#eee',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    height: '50px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '16px',
  },
};
