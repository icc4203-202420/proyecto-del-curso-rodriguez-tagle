import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axiosInstance from '../api/axios';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    const day = date.toLocaleDateString('en-US', { day: 'numeric' });
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const hours = date.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false });
    const minutes = date.toLocaleTimeString('en-US', { minute: '2-digit' });
    return `${month} ${day}, ${hours}:${minutes}`;
  }
  return 'Loading...';
};

export default function ShowEvent() {
  const route = useRoute();
  const { id } = route.params;
  const [event, setEvent] = useState(null);
  const [friends, setFriends] = useState([]);
  const [attendants, setAttendants] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [friendNames, setFriendNames] = useState([]);
  const [otherAttendees, setOtherAttendees] = useState([]);
  const [flyerUrls, setFlyerUrls] = useState([]);
  const [flyerData, setFlyerData] = useState([]);
  const [date, setDate] = useState('Loading...');
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageTags, setImageTags] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(await AsyncStorage.getItem('Tapp/Session/currentUser'));
      const token = await AsyncStorage.getItem('Tapp/Session/token');

      axiosInstance.get('/users')
        .then(res => setAllUsers(res.data.users))
        .catch(error => console.error('Error loading users data:', error));

      axiosInstance.get(`/events/${id}`)
        .then(res => {
          const eventData = res.data.event;
          setEvent(eventData);
          setDate(formatDate(eventData.date));
          if (eventData.flyer_urls) {
            setFlyerUrls(eventData.flyer_urls);
            axiosInstance.get(`/events/${id}/event_pictures`)
              .then(res2 => setFlyerData(res2.data.event_pictures))
              .catch(error => console.error('Error loading event pictures:', error));
          }
        })
        .catch(error => console.error('Error loading event data:', error));

      axiosInstance.get(`/attendances/${id}`)
        .then(res => setAttendants(res.data.attendance))
        .catch(error => console.error('Error loading attendances:', error));

      axiosInstance.get(`/users/${user.id}/friendships`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setFriends(res.data.friendships.map(friend => friend.friend_id)))
      .catch(error => console.error('Error loading friends data:', error));
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const friendIds = new Set(friends);
    const attendingUserIds = new Set(attendants.map(attendant => attendant.user_id));

    setFriendNames(allUsers.filter(user => friendIds.has(user.id) && attendingUserIds.has(user.id)));
    setOtherAttendees(allUsers.filter(user => !friendIds.has(user.id) && attendingUserIds.has(user.id)));
  }, [allUsers, friends, attendants]);

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      base64: true,
    });

    if (!result.cancelled) {
      const base64Images = result.assets.map((asset) => `data:${asset.type};base64,${asset.base64}`);
      const user = JSON.parse(await AsyncStorage.getItem('Tapp/Session/currentUser'));
      const token = await AsyncStorage.getItem('Tapp/Session/token');

      axiosInstance.put(`/events/${id}`, {
        event: { image_base64: base64Images, user_id: user.id }
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        Alert.alert('Success', 'Images uploaded successfully');
        setFlyerUrls(res.data.event.flyer_urls);
        axiosInstance.get(`/events/${id}/event_pictures`)
          .then(res2 => setFlyerData(res2.data.event_pictures))
          .catch(error => console.error('Error loading event pictures:', error));
      })
      .catch(error => {
        console.error('Error uploading images:', error);
        Alert.alert('Error', 'Error uploading images');
      });
    }
  };

  const handleTagUser = async (index) => {
    const user = JSON.parse(await AsyncStorage.getItem('Tapp/Session/currentUser'));

    axiosInstance.post(`/events/${id}/event_pictures/${index}/tags`, {
      event_picture_id: index,
      user_id: user.id,
      tagged_user_id: 1
    })
    .then(res => {
      const imageTags = res.data.tags;
      setImageTags(JSON.stringify(imageTags.filter(tag => tag.event_picture_id === index), null, 2));
    })
    .catch(error => console.error('Error tagging user:', error));
  };

  if (!event) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{event.name}</Text>
      <Text>{date}</Text>
      <Text>{event.description}</Text>

      <Text style={{ fontSize: 20, marginTop: 20 }}>Friends Attending:</Text>
      <FlatList
        data={friendNames}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.first_name} {item.last_name} - @{item.handle}</Text>
        )}
      />

      <Text style={{ fontSize: 20, marginTop: 20 }}>Other Attendees:</Text>
      <FlatList
        data={otherAttendees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.first_name} {item.last_name} - @{item.handle}</Text>
        )}
      />

      <Text style={{ fontSize: 20, marginTop: 20 }}>Event Flyers:</Text>
      <FlatList
        data={flyerUrls}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ marginVertical: 10 }}>
            <Image source={{ uri: item }} style={{ width: 300, height: 200 }} />
            <Text>{flyerData[index]?.description}</Text>
            <Button title="Tag user" onPress={() => handleTagUser(index + 1)} />
          </View>
        )}
      />

      <Button title="Upload Image" onPress={handleImageUpload} />
    </View>
  );
}

