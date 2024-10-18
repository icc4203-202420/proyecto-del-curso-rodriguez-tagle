import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, ActivityIndicator, TextInput, StyleSheet } from "react-native";
import api from '../api_url';
import { useAuth } from "../../context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShowBeers = ({ data, option }) => {
  const filteredData = option
    ? data.filter(beer => beer.name.toLowerCase().includes(option.toLowerCase()))
    : data;
  
  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Link style={styles.beerItem} href={`(views)/${item.id}`}>{item.name}</Link>
        </View>
      )}
    />
  );
};

export default function Beers() {
  const [isLoading, setLoading] = useState(true);
  const [beers, setBeers] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const fetchAsyncStorage = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('Tapp/Session/currentUser');
      setCurrentUser(currentUser);
    } catch (error) {
      console.error(error);
    }
  };
  
  const getBeers = async () => {
    try {
      const response = await fetch(`${api}/beers`);
      const data = await response.json();
      setBeers(data.beers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsyncStorage();
  }, []);
  
  useEffect(() => {
    getBeers();
  }, []);

  console.log(currentUser);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beers</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a beer"
        value={selectedOption}
        onChangeText={text => setSelectedOption(text)}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ShowBeers data={beers} option={selectedOption} />
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
  beerItem: {
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
