import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';



export default function Login() {
  // const { signUpHandler, tokenHandler } = route.params;
  
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    // Perform login logic here
    login('your-token-here');
    router.replace('/');
  };
  
  return (
    <View style={styles.container}>
      <Svg
        style={styles.waveBack}
        viewBox="0 -100 390 588"
        preserveAspectRatio="none"
      >
        <Path 
          d='M0 19.2328C0 19.2328 21.1986 11.198 45.5 5.51497C59.4521 2.25218 74.4269 -0.235429 87 0.0177375C127.346 0.830135 147.164 29.3455 187.5 30.7619C226.328 32.1254 246.678 7.34625 285.5 8.98479C307 9.89223 318.555 21.4027 340 19.2328C360.323 17.1765 390 0.0177375 390 0.0177375V588H0V19.2328Z'
          fill='#EDB854'
        />
      </Svg>
      <Svg
        style={styles.waveFront}
        viewBox="0 -140 390 588"
        preserveAspectRatio="none"
      >
        <Path
          d='M0 18.1862C0 18.1862 21.1986 10.5886 45.5 5.21483C59.4521 2.12961 74.4269 -0.222617 87 0.0167722C127.346 0.784957 147.164 27.7484 187.5 29.0878C226.328 30.3771 246.678 6.94646 285.5 8.49582C307 9.35387 318.555 20.2379 340 18.1862C360.323 16.2418 390 0.0167722 390 0.0167722V556H0V18.1862Z'
          fill='#C58100'
        />
      </Svg>
      <Text>LOGIN</Text>
      <Button title="Login" onPress={handleLogin} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -2,
  },
  waveFront: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});
