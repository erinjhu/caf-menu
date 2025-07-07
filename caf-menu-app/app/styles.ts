import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 4,
    fontWeight: '600',
  },
  itemLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
      backgroundColor: '#007AFF',
      padding: 15,
      borderRadius: 5,
      marginBottom: 20,
  },
  buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
  },
  searchInput: {
      color: '#CBCBCB',
      borderWidth: 1,
      borderColor: '#007AFF',
      padding: 10,
      marginBottom: 15,
      borderRadius: 5,
      backgroundColor: '#f8f9fa',
  },
})