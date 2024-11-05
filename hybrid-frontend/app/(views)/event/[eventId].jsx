import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../../api_url';
import * as SecureStore from 'expo-secure-store';

const ShowEvent = () => {
    const router = useRouter();
    const { eventId } = useLocalSearchParams();
    const [event, setEvent] = useState(null);
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getEvent = async () => {
        try {
            const response = await fetch(`${api}/events/${eventId}`);
            const data = await response.json();
            setEvent(data.event);

            const attendeesResponse = await fetch(`${api}/events/${eventId}/attendances`);
            const attendeesData = await attendeesResponse.json();
            setAttendees(attendeesData.attendees);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getEvent();
    }, [eventId]);

    const goBack = () => {
        router.replace('(tabs)/events');
    };

    if (isLoading) {
        return <ActivityIndicator style={styles.loading} size="large" color="#C58100" />;
    }

    if (!event) {
        return <Text style={styles.errorText}>Event not found.</Text>;
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.eventContainer}>
                    <Text style={styles.eventName}>{event.name}</Text>
                    <Text style={styles.eventDetail}>Date: {new Date(event.date).toLocaleDateString()}</Text>
                    <Text style={styles.eventDetail}>Description: {event.description}</Text>
                </View>

                <View>
                    <Text style={styles.attendeesTitle}>Attendees:</Text>
                    <FlatList
                        data={attendees}
                        renderItem={({ item }) => <Text style={styles.attendeeItem}>{item.name}</Text>}
                        keyExtractor={(item) => item.id.toString()}
                        style={styles.attendeesList}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
                <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ShowEvent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#F1DCA7',
    },
    eventContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    eventName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#C58100',
        marginBottom: 10,
    },
    eventDetail: {
        fontSize: 16,
        color: '#564c3d',
        marginBottom: 5,
        textAlign: 'center',
    },
    attendeesTitle: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: '600',
        color: '#C58100',
    },
    attendeesList: {
        marginTop: 10,
        maxHeight: 100,
    },
    attendeeItem: {
        fontSize: 16,
        color: '#C58100',
        marginVertical: 3,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    backButton: {
        backgroundColor: '#C58100',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});