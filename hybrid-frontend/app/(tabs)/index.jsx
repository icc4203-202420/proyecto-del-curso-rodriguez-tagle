import { Text, View, Button } from "react-native";
import { useAuth } from '../../context/AuthContext';

export default function Home() {
  const { logout } = useAuth();
  return (
    <View>
      <Text>Home</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}