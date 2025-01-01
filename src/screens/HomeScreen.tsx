import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Text, Surface } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Surface style={styles.headerContainer} elevation={4}>
        <Text style={styles.title}>Pick From Hat</Text>
        <Text style={styles.subtitle}>Random Selection Made Easy</Text>
      </Surface>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          contentStyle={styles.buttonContent}
          icon="dice-multiple"
          onPress={() => navigation.navigate('Pick')}>
          Pick Random Item
        </Button>

        <Button
          mode="outlined"
          style={styles.button}
          contentStyle={styles.buttonContent}
          icon="playlist-edit"
          onPress={() => navigation.navigate('ManageItems')}>
          Manage Items
        </Button>

        <Button
          mode="outlined"
          style={styles.button}
          contentStyle={styles.buttonContent}
          icon="history"
          onPress={() => navigation.navigate('History')}>
          View History
        </Button>
      </View>

      <Text style={styles.footer}>
        Add items to your hat and pick them randomly!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#6200ee',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
  },
  buttonContainer: {
    padding: 20,
    gap: 12,
  },
  button: {
    marginVertical: 6,
  },
  buttonContent: {
    height: 56,
  },
  footer: {
    textAlign: 'center',
    color: '#666',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
