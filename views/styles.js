import { 
  StyleSheet, 
} from 'react-native';

 const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#eee',
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  medList: {
    padding: 5,
  },
  medItem: {
    alignContent: 'flex-start',
    backgroundColor: '#fff',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection:'row', 
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
    width: 200,
    justifyContent: 'space-around',
  },
  medNameField: {
    flexDirection: 'row',
    borderColor: 'gray', 
    borderRadius: 5,
    borderWidth: 1, 
    textAlign: 'center',
    width: 100, 
    padding: 10,
  },
  title: { 
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingBottom: 20,
  },
});

export default styles;