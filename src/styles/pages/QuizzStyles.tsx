import { StyleSheet } from 'react-native';

const QuizzStyles = () =>
{
  const styles = StyleSheet.create(
	{
		grid: {
			padding: 10,
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'space-between',
		},
		element: {
			width: '48%',
			marginBottom: 10,
		},
  	});
  return styles;
};

export default QuizzStyles;