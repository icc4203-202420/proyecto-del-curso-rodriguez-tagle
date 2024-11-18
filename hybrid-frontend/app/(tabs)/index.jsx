import React, { useState, useEffect } from "react";
import { Text, View, Button, FlatList, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { createConsumer } from "@rails/actioncable";
import { WS_URL } from "@env";
import { EventRegister } from "react-native-event-listeners";

global.addEventListener = EventRegister.addEventListener;
global.removeEventListener = EventRegister.removeEventListener;

export default function Home() {
  const { logout } = useAuth();
  const [reviews, setReviews] = useState([]);


  useEffect(() => {
    const cable = createConsumer(WS_URL);
    const channel = cable.subscriptions.create("FeedChannel", {
      received(data) {
        setReviews((prevReviews) => [data, ...prevReviews]);
      }
    });
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed</Text>

      <FlatList
        data={reviews}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewContainer}>
            <Text style={styles.beerName}>{item?.beer?.name}</Text>
            <Text style={styles.userName}>{item?.user?.name}:</Text>
            <Text style={styles.reviewText}>{item?.text}</Text>
            <Text style={styles.rating}>Rating: {item?.rating}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No reviews yet. Stay tuned!</Text>
        }
      />

      <Button title="Logout" onPress={logout} color="#C58100" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F1DCA7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#C58100",
    marginBottom: 20,
    textAlign: "center",
  },
  reviewContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#FFF",
  },
  beerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#C58100",
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#564c3d",
  },
  reviewText: {
    fontSize: 14,
    fontStyle: "italic",
    marginVertical: 5,
  },
  rating: {
    fontSize: 14,
    color: "#888",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});