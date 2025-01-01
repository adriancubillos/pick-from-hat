import { useState, useEffect, useCallback } from 'react';
import { storage } from '../services/storage';

export const useItems = () => {
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    const savedItems = await storage.getItems();
    setItems(savedItems);
    setLoading(false);
  };

  const addItem = useCallback(async (newItem: string) => {
    if (newItem.trim()) {
      const updatedItems = [...items, newItem.trim()];
      setItems(updatedItems);
      await storage.saveItems(updatedItems);
    }
  }, [items]);

  const removeItem = useCallback(async (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    await storage.saveItems(updatedItems);
  }, [items]);

  const pickRandomItem = useCallback(async () => {
    if (items.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * items.length);
    const selectedItem = items[randomIndex];
    await storage.addToHistory(selectedItem);
    return selectedItem;
  }, [items]);

  return {
    items,
    loading,
    addItem,
    removeItem,
    pickRandomItem,
  };
};
