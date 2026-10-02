import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { Item, BorrowRequest, User } from './types';
import { demoItems, demoUser } from './data';

interface AppContextType {
  user: User | null;
  login: (name: string, email: string, studentId: string) => void;
  logout: () => void;
  items: Item[];
  addListing: (item: Omit<Item, 'id' | 'ownerId' | 'ownerName' | 'verified'>) => void;
  requests: BorrowRequest[];
  addRequest: (req: Omit<BorrowRequest, 'id' | 'status'>) => void;
  selectedItemId: string | null;
  setSelectedItemId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>(demoItems);
  const [requests, setRequests] = useState<BorrowRequest[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const login = useCallback((name: string, email: string, studentId: string) => {
    setUser({
      ...demoUser,
      name,
      email,
      studentId,
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setSelectedItemId(null);
  }, []);

  const addListing = useCallback(
    (item: Omit<Item, 'id' | 'ownerId' | 'ownerName' | 'verified'>) => {
      if (!user) return;
      const newItem: Item = {
        ...item,
        id: `item-${Date.now()}`,
        ownerId: 'me',
        ownerName: user.name,
        verified: user.verified,
      };
      setItems((prev) => [newItem, ...prev]);
      setUser((prev) =>
        prev ? { ...prev, itemsListed: prev.itemsListed + 1 } : prev,
      );
    },
    [user],
  );

  const addRequest = useCallback(
    (req: Omit<BorrowRequest, 'id' | 'status'>) => {
      const newRequest: BorrowRequest = {
        ...req,
        id: `req-${Date.now()}`,
        status: 'Pending',
      };
      setRequests((prev) => [newRequest, ...prev]);
    },
    [],
  );

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        items,
        addListing,
        requests,
        addRequest,
        selectedItemId,
        setSelectedItemId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
