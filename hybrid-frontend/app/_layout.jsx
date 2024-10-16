import { Tabs } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { useProtectedRoute } from './_auth';

export default function RootLayout() {
  
  return (
    <AuthProvider>
      <ProtectedRouteWrapper>
        <Tabs
          screenOptions={{
            tabBarStyle: {
              display: 'none'
            }
          }}
        />
      </ProtectedRouteWrapper>
    </AuthProvider>
  );
}

function ProtectedRouteWrapper({ children }) {
  useProtectedRoute();
  return <>{children}</>;
}