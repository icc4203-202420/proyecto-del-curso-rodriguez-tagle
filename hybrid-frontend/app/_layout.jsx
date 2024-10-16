// import { Stack } from 'expo-router';
// import { AuthProvider } from '../context/AuthContext';
// import { useProtectedRoute } from './_auth';

// export default function RootLayout() {
//   useProtectedRoute();

//   return (
//     <AuthProvider>
//       <Stack />
//     </AuthProvider>
//   );
// }
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { useProtectedRoute } from './_auth';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedRouteWrapper>
        <Stack />
      </ProtectedRouteWrapper>
    </AuthProvider>
  );
}

function ProtectedRouteWrapper({ children }) {
  useProtectedRoute();
  return <>{children}</>;
}