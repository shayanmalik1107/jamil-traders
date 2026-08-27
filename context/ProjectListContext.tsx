'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/data';

export interface ProjectListItem {
  product: Product;
  quantity: number;
  notes?: string;
}

interface ProjectListContextType {
  items: ProjectListItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearList: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  totalItemsCount: number;
}

const ProjectListContext = createContext<ProjectListContextType | undefined>(undefined);

export function ProjectListProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ProjectListItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('jameel_traders_project_list');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load project list', e);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('jameel_traders_project_list', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save project list', e);
    }
  }, [items]);

  const addItem = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearList = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ProjectListContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearList,
        isDrawerOpen,
        setIsDrawerOpen,
        totalItemsCount,
      }}
    >
      {children}
    </ProjectListContext.Provider>
  );
}

export function useProjectList() {
  const context = useContext(ProjectListContext);
  if (!context) {
    throw new Error('useProjectList must be used within a ProjectListProvider');
  }
  return context;
}
