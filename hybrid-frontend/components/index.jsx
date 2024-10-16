// import { Stack, Tabs } from 'expo-router';
// import { useState, useEffect } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useAsyncStorage } from '@react-native-async-storage/async-storage';

// import Login from './login';
// import Signup from './signup';
// import Home from './(tabs)/home';
// import Beers from './(tabs)/beers';
// import Bars from './(tabs)/bars';
// import Users from './(tabs)/users';

// export default function App() {
//   const [token, setToken] = useState('');
//     const { getItem: getStorageToken, setItem: setStorageToken } = useAsyncStorage('Tapp/Session/token');
//     const [isAuth, setIsAuth] = useState(false);
//     const { getItem: getStorageIsAuth, setItem: setStorageIsAuth } = useAsyncStorage('Tapp/Session/isAuth');
//     const [signUp, setSignUp] = useState(false);
//     const { getItem: getStorageSignUp, setItem: setStorageSignUp } = useAsyncStorage('Tapp/signUp');
//     const [currentUser, setCurrentUser] = useState({});
//     const { getItem: getStorageCurrentUser, setItem: setStorageCurrentUser } = useAsyncStorage('Tapp/Session/currentUser');

  
//   const readTokenFromStorage = async () => {
//     const item = await getStorageToken();
//     setToken(item);
//   };
  
//   const writeTokenToStorage = async (newValue) => {
//     await setStorageToken(newValue);
//     setToken(newValue);
//   };

//   const readIsAuthFromStorage = async () => {
//     const item = await getStorageIsAuth();
//     setIsAuth(JSON.parse(item));  // Ensure you're parsing the string value stored in async storage
//   };

//   const writeIsAuthToStorage = async (newValue) => {
//     await setStorageIsAuth(JSON.stringify(newValue)); // Store boolean as string
//     setIsAuth(newValue);
//   };

//   const readSignUpFromStorage = async () => {
//     const item = await getStorageSignUp();
//     setSignUp(JSON.parse(item));
//   };

//   const writeSignUpToStorage = async (newValue) => {
//     await setStorageSignUp(JSON.stringify(newValue));
//     setSignUp(newValue);
//   };

//   const readCurrentUserFromStorage = async () => {
//     const item = await getStorageCurrentUser();
//     setCurrentUser(JSON.parse(item));  // Parse the object stored as a string
//   };

//   const writeCurrentUserToStorage = async (newValue) => {
//     await setStorageCurrentUser(JSON.stringify(newValue));
//     setCurrentUser(newValue);
//   };

//   useEffect(() => {
//     if (token) {
//       fetch('/login', {
//         method: 'GET',
//         headers: { 
//           Authorization: token
//         }
//       })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to authenticate');
//         }
//         return response.json();
//       })
//       .then(() => writeIsAuthToStorage(true))
//       .catch(() => {
//         // setToken('');
//         // storeData('Tapp/Session/token', '')
//         writeTokenToStorage('');
//         writeIsAuthToStorage(false);
//         // storeData('Tapp/Session/isAuth', false)
//         // setIsAuth(false);
//       });
//     } else {
//       // setIsAuth(false);
//       writeIsAuthToStorage(false);
//     }
//   }, [token]);

//   const handleJWT = (token) => {
//     // setToken(token);
//     // storeData('Tapp/Session/token', token)
//     writeTokenToStorage(token);
//   };
  
//   const handleCurrentUser = (user) => {
//     // setCurrentUser(user);
//     // storeData('Tapp/Session/currentUser', user)
//     writeCurrentUserToStorage(user);
//   };
  
//   const handleLogout = () => {
//     // setToken('');
//     // storeData('Tapp/Session/token', '')
//     // setIsAuth(false);
//     // setCurrentUser({});
//     writeTokenToStorage('');
//     writeIsAuthToStorage(false);
//     writeCurrentUserToStorage({});
//     // navigate to login
//   };
  
//   const handleSignUp = () => {
//     // setSignUp(!signUp);
//     // storeData('Tapp/signUp', !signUp)
//     writeSignUpToStorage(!signUp);
//   };

//   return (
//       <SafeAreaView>
//         {!isAuth ? (
//           <Stack>
//             {!signUp ? (
//               <Stack.Screen 
//                 name="login" 
//                 component={Login} 
//                 initialParams={{ 
//                   signUpHandler: handleSignUp, 
//                   tokenHandler: handleJWT 
//                 }} 
//               />
//             ) : (
//               <Stack.Screen 
//                 name='signup' 
//                 component={Signup} 
//                 initialParams={{ 
//                   signUpHandler: handleSignUp 
//                 }} 
//               />
//             )}
//           </Stack>
//         ) : (
//           <Tabs>
//           {/* si???????? */}
//             <Tabs.Screen name="Home" component={Home} />
//             <Tabs.Screen name="Beers" component={Beers} />
//             <Tabs.Screen name="Bars" component={Bars} />
//             <Tabs.Screen name="Users" component={Users} />
//           </Tabs>
//         )}
//       </SafeAreaView>
//     );
//   }
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}