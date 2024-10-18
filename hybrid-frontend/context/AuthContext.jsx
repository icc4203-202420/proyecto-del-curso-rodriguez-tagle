import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load auth state from AsyncStorage
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('Tapp/Session/token');
      const storedUser = await AsyncStorage.getItem('Tapp/Session/currentUser');
      const storedAuth = await AsyncStorage.getItem('Tapp/isAuth');
      console.log('Stored user:', storedUser);
      if (storedToken) {
        setToken(storedToken);
        setCurrentUser(storedUser);
        setIsAuth(storedAuth);
      }
    } catch (e) {
      console.error('Failed to load auth state:', e);
    }
  };

  const login = async (newToken, user) => {
    try {
      setToken(newToken);
      setIsAuth(true);
      setCurrentUser(user);
      await AsyncStorage.setItem('Tapp/Session/token', JSON.stringify(newToken));
      console.log('User:', user);
      await AsyncStorage.setItem('Tapp/Session/currentUser', JSON.stringify(user));
      await AsyncStorage.setItem('Tapp/isAuth', JSON.stringify(isAuth));
    } catch (e) {
      console.error('Failed to save auth state:', e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('Tapp/Session/token');
      await AsyncStorage.removeItem('Tapp/Session/currentUser');
      await AsyncStorage.removeItem('Tapp/isAuth');
      setToken(null);
      setCurrentUser(null);
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