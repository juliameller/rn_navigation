import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';


// function HomeScreen() {
// const navigation = useNavigation();

//   <View style={styles.container}>
//   <Text style={{fontSize: 36}}>Home Screen</Text>
//   <Button title='IR PARA SECOND'
//   onPress={() => {
//     navigation.navigate("Second")
//   }}></Button>
// </View>
// }

function MoviesScreen() {
  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  <View>
  <Button title="Listar filmes"
  onPress={() => navigation.navigate("Movies")}
  ></Button>
</View>


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
  }

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
}


export default function App() {

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
