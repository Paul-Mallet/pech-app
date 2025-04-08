import { StyleSheet } from "react-native";
import Colors from "../base/colors.tsx";

const LoadingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.textHighlightDark,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  image: {
    width: 256,
    height: 99,
  },
  text: {
    color: Colors.body,
    fontSize: 32,
    fontFamily: 'BoldFont',
    marginTop: 20,
  },
});

export default LoadingScreenStyles