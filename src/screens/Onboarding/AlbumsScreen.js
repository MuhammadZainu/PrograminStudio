// screens/AlbumsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, StatusBar, Platform, SafeAreaView } from 'react-native';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';

const AlbumsScreen = ({ navigation }) => {
  const [allAlbums, setAllAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [selectedStarIds, setSelectedStarIds] = useState([]);
  const [selectedHeartIds, setSelectedHeartIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingFilter, setLoadingFilter] = useState(false); // State for filter loading

  // Fetch all albums
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(response => {
        setAllAlbums(response.data);
        setFilteredAlbums(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Filter albums when selectedAlbumId changes
  useEffect(() => {
    const filterAlbums = () => {
      setLoadingFilter(true); // Set loading state before filtering
      const filtered = selectedAlbumId === null
        ? allAlbums
        : allAlbums.filter(album => album.albumId === selectedAlbumId);

      setTimeout(() => {
        setFilteredAlbums(filtered);
        setLoadingFilter(false); // Reset loading state after filtering
      }, 500); // Simulate delay
    };

    filterAlbums();
  }, [selectedAlbumId, allAlbums]);

  // Generate album buttons dynamically
  const albumButtons = Array.from({ length: 100 }, (_, index) => (
    <TouchableOpacity
      key={index + 1}
      style={[styles.button, selectedAlbumId === index + 1 && styles.selectedButton]}
      onPress={() => setSelectedAlbumId(index + 1)}
    >
      <Text style={styles.buttonText}>Album {index + 1}</Text>
    </TouchableOpacity>
  ));

  const toggleStarSelection = (id) => {
    setSelectedStarIds(prevSelectedStarIds =>
      prevSelectedStarIds.includes(id)
        ? prevSelectedStarIds.filter(itemId => itemId !== id) // Remove ID if already selected
        : [...prevSelectedStarIds, id] // Add ID if not already selected
    );
  };

  const toggleHeartSelection = (id) => {
    setSelectedHeartIds(prevSelectedHeartIds =>
      prevSelectedHeartIds.includes(id)
        ? prevSelectedHeartIds.filter(itemId => itemId !== id) // Remove ID if already selected
        : [...prevSelectedHeartIds, id] // Add ID if not already selected
    );
  };

  const renderItem = ({ item }) => {
    const starColor = selectedStarIds.includes(item.id) ? 'black' : '#A6A6A6'; // Black for selected, gray otherwise
    const heartColor = selectedHeartIds.includes(item.id) ? 'red' : '#F99DA3'; // Red for selected, gray otherwise

    return (
      <View style={styles.albumContainer}>
        <View style={styles.albumContent}>
          <Image source={{ uri: item.thumbnailUrl }} style={styles.image} />
          <View style={styles.albumDetails}>
            <Text style={styles.albumId}>Album ID: {item.albumId}</Text>
            <Text style={styles.albumTitle}>{item.title}</Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.idContainer}
                onPress={() => toggleStarSelection(item.id)} // Toggle star selection
              >
                <AntDesign name="star" size={18} color={starColor} />
                <Text style={styles.idText}>id</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleHeartSelection(item.id)} // Toggle heart selection
              >
                <AntDesign name="heart" size={20} color={heartColor} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 17,alignItems:'center'}}>
        <TouchableOpacity onPress={() => { navigation.goBack() }} style={{backgroundColor:'#F2F2F2',}}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>
          Albums List
        </Text>
      </View>

      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <Text style={{marginHorizontal:20,marginVertical:15,top:10,fontSize:19,color:'#737373'}}>API RESULTS</Text>
      <ScrollView horizontal style={styles.buttonContainer} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.button, selectedAlbumId === null && styles.selectedButton]}
          onPress={() => setSelectedAlbumId(null)}
        >
          <Text style={styles.buttonText}>All Albums</Text>
        </TouchableOpacity>
        {albumButtons}
      </ScrollView>
    {/* <View> */}
          {loadingFilter ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredAlbums}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Add padding for Android StatusBar
  },
  buttonContainer: {
    flexDirection: 'row',
    // paddingVertical: 50,
    marginHorizontal:10,
    borderBottomColor: 'gray',
  },
  button: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom:20,
    padding: 10,
    flex:1,
    height:40,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  selectedButton: {
    backgroundColor: '#D3F36B',
  },
  buttonText: {
    fontSize: 16,
  },
  albumContainer: {
    padding: 16,
    justifyContent: 'center',
    borderBottomColor: 'gray',
  },
  albumContent: {
    flexDirection: 'row',
    // padding: 2,
    paddingHorizontal:10,
    // marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
  },
  albumDetails: {
    flex: 1,
  },
  albumId: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  albumTitle: {
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  idContainer: {
    backgroundColor: '#F2F2F2',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    gap: 5,
  },
  idText: {
    fontSize: 15,
    fontWeight: '600',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AlbumsScreen;
