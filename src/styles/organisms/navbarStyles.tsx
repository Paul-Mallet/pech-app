import { StyleSheet } from "react-native";

const NavBarStyles = StyleSheet.create({
  tabLabel: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  tabLabelFocused: {
    fontWeight: 'bold',
  },
  tapBar : {
    backgroundColor: '#31909C52',
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 0, // Android shadow removal
    shadowColor: 'transparent', // iOS shadow removal
    borderTopWidth: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export default NavBarStyles