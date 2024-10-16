import React, { useEffect, useState } from "react";
import { Text, View, FlatList, ActivityIndicator, TextInput, StyleSheet } from "react-native";

const ShowBeers = ({ data, option }) => {
  const filteredData = option
    ? data.filter(beer => beer.name.toLowerCase().includes(option.toLowerCase()))
    : data;

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text style={styles.beerItem}>{item.name}</Text>
      )}
    />
  );
};

export default function Beers() {
  const [isLoading, setLoading] = useState(true);
  const [beers, setBeers] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const getBeers = async () => {
    try {
      const response = await fetch('http://192.168.0.80:3001/api/v1/beers');
      const data = await response.json();
      setBeers(data.beers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBeers();
  }, []);

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
    marginTop: 10,
    textAlign: 'center',
    flex: 1,
  },
  title: {
    color: '#C58100',
    fontFamily: 'MontserratAlternates', // Esto depende de que hayas cargado la fuente en tu proyecto.
    fontSize: 52,
    fontWeight: '800',
    textAlign: 'center',
    backgroundColor: '#564c3d',
    textShadowColor: 'rgba(197, 129, 9, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  toggleButton: {
    backgroundColor: '#C58100',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    borderRadius: 5,
    marginVertical: 10,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  searchInput: {
    width: '100%',
    maxWidth: 300,
    padding: 10,
    fontSize: 16,
    borderColor: '#C58100',
    borderWidth: 1.5,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  beersListContainer: {
    marginTop: 30,
  },
  beerItem: {
    fontSize: 20,
    color: '#C58100',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  axiosStateMessage: {
    fontSize: 18,
    color: '#C58100',
    marginVertical: 20,
    textAlign: 'center',
  },
});

