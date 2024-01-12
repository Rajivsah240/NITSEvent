import { View, StyleSheet } from 'react-native';
import HomeScreen from './screen/HomeScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <HomeScreen/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Define any styles for your container if needed
    // For example:
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default App;
