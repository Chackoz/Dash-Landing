"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { User, AuthContextType, AuthResponse } from '../types/auth';

const COOKIE_NAME = 'auth_session';
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Get the ID token
        const token = await firebaseUser.getIdToken();
        
        // Set cookie with token
        Cookies.set(COOKIE_NAME, token, {
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        // Remove cookie when user is not authenticated
        Cookies.remove(COOKIE_NAME);
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
      // Set cookie with token
      Cookies.set(COOKIE_NAME, token, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      };
    }
  };

  const logout = async (): Promise<AuthResponse> => {
    try {
      await signOut(auth);
      Cookies.remove(COOKIE_NAME);
      router.push('/'); // Redirect to home page after logout
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};