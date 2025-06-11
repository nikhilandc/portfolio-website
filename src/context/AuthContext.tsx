import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: async () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const role = session.user.user_metadata.role || 'user';
        
        // Only allow admin users to authenticate
        if (role !== 'admin') {
          supabase.auth.signOut();
          return;
        }
        
        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: role
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;

      if (data.user) {
        const role = data.user.user_metadata.role || 'user';
        
        // Only allow admin users to login
        if (role !== 'admin') {
          await supabase.auth.signOut();
          throw new Error('Access denied. Admin privileges required.');
        }
        
        setUser({
          id: data.user.id,
          email: data.user.email!,
          role: role
        });
        setIsAuthenticated(true);
        toast.success('Successfully logged in!');
      }
    } catch (error: any) {
      console.error('Error logging in:', error);
      toast.error(error.message || 'Invalid email or password');
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Successfully logged out!');
    } catch (error: any) {
      console.error('Error logging out:', error);
      toast.error(error.message || 'Error logging out');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);