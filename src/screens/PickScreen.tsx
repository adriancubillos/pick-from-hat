import React, { useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Button, Text, Card, ActivityIndicator } from 'react-native-paper';
import { useItems } from '../hooks/useItems';

const PickScreen = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { items, loading, pickRandomItem } = useItems();

  const handlePick = async () => {
    setIsAnimating(true);
    const picked = await pickRandomItem();
    
    // Simulate animation delay
    setTimeout(() => {
      setSelectedItem(picked);
      setIsAnimating(false);
    }, 1000);
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
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          {selectedItem ? (
            <Text style={styles.selectedItem}>{selectedItem}</Text>
          ) : (
            <Text style={styles.placeholder}>
              {items.length > 0 ? 'Pick an item!' : 'Add some items first!'}
            </Text>
          )}
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        style={styles.button}
        onPress={handlePick}
        disabled={isAnimating || items.length === 0}>
        {isAnimating ? 'Picking...' : 'Pick Random'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    marginBottom: 20,
  },
  cardContent: {
    alignItems: 'center',
    padding: 20,
  },
  selectedItem: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholder: {
    fontSize: 18,
    color: '#666',
  },
  button: {
    width: '80%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PickScreen;
