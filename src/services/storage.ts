import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  ITEMS: '@pickfromhat:items',
  HISTORY: '@pickfromhat:history',
} as const;

export interface HistoryItem {
  item: string;
  date: string;
}

export const storage = {
  async saveItems(items: string[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving items:', error);
    }
  },

  async getItems(): Promise<string[]> {
    try {
      const items = await AsyncStorage.getItem(STORAGE_KEYS.ITEMS);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error('Error getting items:', error);
      return [];
    }
  },

  async saveHistory(history: HistoryItem[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  },

  async getHistory(): Promise<HistoryItem[]> {
    try {
      const history = await AsyncStorage.getItem(STORAGE_KEYS.HISTORY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error getting history:', error);
      return [];
    }
  },

  async addToHistory(item: string) {
    try {
      const history = await this.getHistory();
      const newHistory = [
        { item, date: new Date().toLocaleString() },
        ...history,
      ].slice(0, 50); // Keep only last 50 items
      await this.saveHistory(newHistory);
    } catch (error) {
      console.error('Error adding to history:', error);
    }
  },
};
