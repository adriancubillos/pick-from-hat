import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, TextInput, List, IconButton, ActivityIndicator } from 'react-native-paper';
import { useItems } from '../hooks/useItems';

const ManageItemsScreen = () => {
  const [newItem, setNewItem] = useState('');
  const { items, loading, addItem, removeItem } = useItems();

  const handleAddItem = async () => {
    if (newItem.trim()) {
      await addItem(newItem);
      setNewItem('');
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newItem}
          onChangeText={setNewItem}
          placeholder="Add new item"
          mode="outlined"
        />
        <Button mode="contained" onPress={handleAddItem}>
          Add
        </Button>
      </View>
      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <List.Item
            title={item}
            right={props => (
              <IconButton
                icon="delete"
                onPress={() => removeItem(index)}
              />
            )}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  input: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ManageItemsScreen;
