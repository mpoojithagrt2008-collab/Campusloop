import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, MessageCircle, Package } from 'lucide-react';
import { useApp } from '../store';
import type { Conversation } from '../types';
import type { Page } from '../components/Navigation';

interface Props {
  navigate: (p: Page) => void;
}

function formatTime(ts: string): string {
  const d = new Date(ts);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function ConversationListItem({
  conv,
  userStudentId,
  onClick,
}: {
  conv: Conversation;
  userStudentId: string;
  onClick: () => void;
}) {
  const lastMsg = conv.messages[conv.messages.length - 1];
  const otherName =
    conv.ownerId === 'me' || conv.ownerName === 'Aarav Sharma'
      ? conv.borrowerName
      : conv.ownerName;

  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 border-b border-gray-100 p-4 text-left transition-colors hover:bg-gray-50"
    >
      <img
        src={conv.itemImage}
        alt={conv.itemName}
        className="h-12 w-12 shrink-0 rounded-xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-semibold text-gray-900">{otherName}</h3>
          {lastMsg && (
            <span className="shrink-0 text-[10px] text-gray-400">
              {formatTime(lastMsg.timestamp)}
            </span>
          )}
        </div>
        <p className="truncate text-xs text-gray-500">{conv.itemName}</p>
        {lastMsg && (
          <p className="mt-0.5 truncate text-xs text-gray-400">
            <span className="font-medium">{lastMsg.senderName.split(' ')[0]}:</span>{' '}
            {lastMsg.text}
          </p>
        )}
      </div>
    </button>
  );
}

function ChatView({
  conv,
  onBack,
}: {
  conv: Conversation;
  onBack: () => void;
}) {
  const { user, sendMessage } = useApp();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const otherName =
    conv.ownerId === 'me' || conv.ownerName === 'Aarav Sharma'
      ? conv.borrowerName
      : conv.ownerName;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conv.messages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(conv.id, input);
    setInput('');
  };

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 140px)' }}>
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <img
          src={conv.itemImage}
          alt={conv.itemName}
          className="h-10 w-10 rounded-lg object-cover"
        />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold text-gray-900">{otherName}</h2>
          <p className="truncate text-xs text-gray-500">{conv.itemName}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4">
        <div className="mx-auto max-w-2xl space-y-3">
          {conv.messages.map((msg) => {
            const isMe =
              msg.senderId === user?.studentId ||
              msg.senderName === user?.name;
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${
                    isMe
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  {!isMe && (
                    <p className="mb-0.5 text-xs font-semibold text-emerald-600">
                      {msg.senderName.split(' ')[0]}
                    </p>
                  )}
                  <p className="leading-relaxed">{msg.text}</p>
                  <p
                    className={`mt-1 text-[10px] ${
                      isMe ? 'text-emerald-100' : 'text-gray-400'
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 border-t border-gray-200 bg-white px-4 py-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-200 transition-all hover:bg-emerald-700 active:scale-95 disabled:opacity-40 disabled:shadow-none"
        >
          <Send className="h-4.5 w-4.5" />
        </button>
      </form>
    </div>
  );
}

export function Messages({ navigate }: Props) {
  const { conversations, user } = useApp();
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);

  const myConversations = conversations.filter(
    (c) =>
      c.ownerId === 'me' ||
      c.ownerName === user?.name ||
      c.borrowerId === user?.studentId ||
      c.borrowerName === user?.name,
  );

  const selectedConv = myConversations.find((c) => c.id === selectedConvId);

  if (selectedConv) {
    return <ChatView conv={selectedConv} onBack={() => setSelectedConvId(null)} />;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">Messages</h1>
      <p className="mb-6 text-sm text-gray-500">
        Chat with students about accepted borrow requests
      </p>

      {myConversations.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {myConversations.map((conv) => (
            <ConversationListItem
              key={conv.id}
              conv={conv}
              userStudentId={user?.studentId ?? ''}
              onClick={() => setSelectedConvId(conv.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <MessageCircle className="h-8 w-8 text-emerald-500" />
          </div>
          <h3 className="text-base font-semibold text-gray-900">No conversations yet</h3>
          <p className="mt-1 max-w-xs text-sm text-gray-500">
            Conversations start automatically when a borrow request is accepted.
          </p>
          <button
            onClick={() => navigate('explore')}
            className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition-all hover:bg-emerald-700"
          >
            <Package className="h-4 w-4" />
            Explore Items
          </button>
        </div>
      )}
    </div>
  );
}
