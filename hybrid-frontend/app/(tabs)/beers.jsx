import React, { useEffect, useState } from "react";
import { Text, View, FlatList, ActivityIndicator, TextInput } from "react-native";
import styles from "./beersStyles";

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