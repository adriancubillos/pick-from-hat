import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, Text, ActivityIndicator } from 'react-native-paper';
import { storage, HistoryItem } from '../services/storage';

const HistoryScreen = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    const savedHistory = await storage.getHistory();
    setHistory(savedHistory);
    setLoading(false);
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
      {history.length > 0 ? (
        <FlatList
          data={history}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <List.Item
              title={item.item}
              description={item.date}
              left={props => <List.Icon {...props} icon="history" />}
            />
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No history yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistoryScreen;
