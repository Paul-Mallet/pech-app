import { StyleSheet } from "react-native";


const ButtonStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#3498db',
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  searchButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 0.5,
  }
});

export default ButtonStyles