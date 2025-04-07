import { StyleSheet } from "react-native";

const LoadingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#31909C',
    position: 'absolute', // Make it appear in front of everything
    width: '100%',
    height: '100%',
    zIndex: 10, // Ensure it stays on top of everything else
  },
  image: {
    width: 256,
    height: 99,
  },
  text: {
    color: '#F6F4EB',
    fontSize: 32,
    fontFamily: 'BoldFont',
    marginTop: 20,
  },
});

export default LoadingScreenStyles