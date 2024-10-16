import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Load auth state from AsyncStorage
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('Tapp/Session/token');
      if (storedToken) {
        setToken(storedToken);
        setIsAuth(true);
      }
    } catch (e) {
      console.error('Failed to load auth state:', e);
    }
  };

  const login = async (newToken) => {
    try {
      await AsyncStorage.setItem('Tapp/Session/token', newToken);
      setToken(newToken);
      setIsAuth(true);
    } catch (e) {
      console.error('Failed to save auth state:', e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('Tapp/Session/token');
      setToken(null);
      setIsAuth(false);
    } catch (e) {
      console.error('Failed to remove auth state:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}