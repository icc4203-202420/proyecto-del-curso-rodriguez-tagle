import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import useAxios from 'axios-hooks';

const ShowEvents = ({ bar }) => {
  if (!bar) return null;

  const eventsUrl = `http://localhost:3001/api/v1/bars/${bar.id}/events`;
  const [{ data, loading, error }] = useAxios(eventsUrl);

  if (loading) return <ActivityIndicator size="large" color="#C58100" />;
  if (error) return <Text style={styles.errorText}>Please enter a bar name</Text>;

  return (
    <FlatList
      data={data.events}
      keyExtractor={(event) => event.id.toString()}
      renderItem={({ item }) => <Text style={styles.eventItem}>{item.name}</Text>}
    />
  );
};

const Events = () => {
  const barsUrl = 'http://localhost:3001/api/v1/bars';
  const [{ data, loading, error }] = useAxios(barsUrl);
  const [bar, setBar] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredBars, setFilteredBars] = useState([]);

  if (loading) return <ActivityIndicator size="large" color="#C58100" />;
  if (error) return <Text style={styles.errorText}>Error loading data.</Text>;

  const handleSearch = (text) => {
    setSearch(text);
    setFilteredBars(data.bars.filter((bar) => bar.name.toLowerCase().includes(text.toLowerCase())));
  };

  const handleSelectBar = (selectedBar) => {
    setBar(selectedBar);
    setSearch(selectedBar.name);
    setFilteredBars([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a bar"
        value={search}
        onChangeText={handleSearch}
      />
      {filteredBars.length > 0 && (
        <FlatList
          data={filteredBars}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectBar(item)}>
              <Text style={styles.barItem}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <ShowEvents bar={bar} />
    </View>
  );
};

export default Events;

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C58100',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  barItem: {
    padding: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  eventItem: {
    fontSize: 18,
    paddingVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
};

