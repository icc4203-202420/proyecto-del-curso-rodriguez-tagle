import { StyleSheet, ActivityIndicator, Text } from "react-native";
import api from '../api_url';
import { useEffect, useState } from "react";

const ShowUsers = ({ data, option }) => {
  const filteredData = option
    ? data.filter(user => user.handle.includes(option))
    : data;

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          {item.handle}
        </View>
      )}
    />
  );
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');

  const getUsers = async () => {
    try {
      const response = await fetch(`${api}/users`);
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a user"
        value={selectedOption}
        onChangeText={text => setSelectedOption(text)}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ShowUsers data={users} option={selectedOption} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F1DCA7',
    flex: 1,
  },
  title: {
    color: '#C58100',
    fontFamily: 'MontserratAlternates',
    fontSize: 42,
    fontWeight: '800',
    textAlign: 'center',
    textShadowColor: 'rgba(197, 129, 9, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
    marginBottom: 15,
  },
  searchInput: {
    width: '100%',
    maxWidth: 350,
    padding: 15,
    fontSize: 16,
    borderColor: '#C58100',
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,  // Para la sombra en Android
  },
  userItem: {
    fontSize: 18,
    backgroundColor: '#C58100',
    color: '#F1DCA7',
    paddingVertical: 15,
    marginVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});
