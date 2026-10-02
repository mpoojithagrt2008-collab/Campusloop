import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { Item, BorrowRequest, User, Conversation, ChatMessage } from './types';
import { demoItems, demoUser, demoRequests, demoConversations } from './data';

interface AppContextType {
  user: User | null;
  login: (name: string, email: string, studentId: string) => void;
  logout: () => void;
  items: Item[];
  addListing: (item: Omit<Item, 'id' | 'ownerId' | 'ownerName' | 'verified'>) => void;
  requests: BorrowRequest[];
  addRequest: (req: Omit<BorrowRequest, 'id' | 'status'>) => void;
  updateRequestStatus: (id: string, status: BorrowRequest['status']) => void;
  conversations: Conversation[];
  sendMessage: (conversationId: string, text: string) => void;
  selectedItemId: string | null;
  setSelectedItemId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>(demoItems);
  const [requests, setRequests] = useState<BorrowRequest[]>(demoRequests);
  const [conversations, setConversations] = useState<Conversation[]>(demoConversations);
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

  const updateRequestStatus = useCallback(
    (id: string, status: BorrowRequest['status']) => {
      setRequests((prev) => {
        const updated = prev.map((r) => (r.id === id ? { ...r, status } : r));
        if (status === 'Accepted') {
          const req = updated.find((r) => r.id === id);
          if (req && !conversations.some((c) => c.requestId === id)) {
            const newConv: Conversation = {
              id: `conv-${Date.now()}`,
              requestId: req.id,
              itemId: req.itemId,
              itemName: req.itemName,
              itemImage: req.itemImage,
              ownerId: req.ownerId,
              ownerName: req.ownerName,
              borrowerId: req.borrowerId,
              borrowerName: req.borrowerName,
              messages: [
                {
                  id: `msg-${Date.now()}`,
                  senderId: req.ownerId,
                  senderName: req.ownerName,
                  text: `Hi ${req.borrowerName.split(' ')[0]}! Your request for ${req.itemName} has been accepted. When would you like to pick it up?`,
                  timestamp: new Date().toISOString(),
                },
              ],
            };
            setConversations((prevC) => [newConv, ...prevC]);
          }
        }
        return updated;
      });
    },
    [conversations],
  );

  const sendMessage = useCallback(
    (conversationId: string, text: string) => {
      if (!user || !text.trim()) return;
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        senderId: user.studentId,
        senderName: user.name,
        text: text.trim(),
        timestamp: new Date().toISOString(),
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? { ...c, messages: [...c.messages, newMessage] }
            : c,
        ),
      );
    },
    [user],
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
        updateRequestStatus,
        conversations,
        sendMessage,
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
