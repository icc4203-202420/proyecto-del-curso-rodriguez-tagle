import { StyleSheet } from 'react-native';

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
      fontFamily: 'MontserratAlternates',
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

export default styles;