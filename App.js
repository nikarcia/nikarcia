import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Main from './Main.js';
import Main2 from './Main2.js';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="black" />
      {/* <Main2/> */}
      <Main/>
      <Toast />
    </View>
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
