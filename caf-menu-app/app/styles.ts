import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  
  // ===== MAIN LAYOUT =====
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
  
  // ===== MENU ITEMS =====
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
  
  // ===== FORM INPUTS =====
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
  
  // ===== SEARCH BAR =====
  searchInput: {
      borderWidth: 1,
      flex: 1,
      borderColor: '#007AFF',
      padding: 10,
      marginBottom: 0,
      borderRadius: 5,
      backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  clearButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: '#ff4444',
    borderRadius: 15,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  
  // ===== CHECKBOXES =====
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 5,
  },
  checkbox: {
    fontSize: 20,
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
})