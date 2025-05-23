import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';


function HomeScreen({navigation}) {
return(
  <View style={styles.container}>
  <Button title='Listar filmes'
  onPress={() => {
    navigation.navigate("Movies")
  }}></Button>
</View>
)
}


function MoviesScreen() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  const getMovies = async () => {
    try {
    const response = await fetch("https://reactnative.dev/movies.json");
    const json = await response.json();
    setData(json.movies);
    } catch (error) {
    console.error(error);
    } finally {
    setLoading(false);
    }
    };

    useEffect(() => {
      getMovies();
    }, []);

    return(
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {isLoading ? (
        <ActivityIndicator />
        ) : (
        <View>
        {data.map((item) => (
        <Text key={item.id}>{item.title} - {item.releaseYear}</Text>
        ))}
        </View>
        )}
        </View>
);
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Movies" component={MoviesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
