import { useState, useMemo } from 'react';
import { Search, Plus, TrendingUp, Sparkles } from 'lucide-react';
import { useApp } from '../store';
import { CATEGORIES } from '../data';
import { ItemCard } from '../components/ItemCard';
import type { Category } from '../types';
import type { Page } from '../components/Navigation';

interface Props {
  navigate: (p: Page) => void;
}

const CATEGORY_ICONS: Record<string, string> = {
  Books: '📚',
  Calculators: '🧮',
  Electronics: '💻',
  Cycles: '🚲',
  Sports: '🏏',
  'Lab Equipment': '🔬',
  Other: '📦',
};

export function Home({ navigate }: Props) {
  const { user, items, setSelectedItemId } = useApp();
  const [search, setSearch] = useState('');

  const featured = useMemo(() => items.slice(0, 8), [items]);

  const filtered = useMemo(() => {
    if (!search.trim()) return featured;
    return featured.filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [featured, search]);

  const handleItemClick = (id: string) => {
    setSelectedItemId(id);
    navigate('explore');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
      {/* Hero greeting */}
      <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-6 text-white shadow-lg shadow-emerald-200/50 md:p-8">
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-50/90">
          <Sparkles className="h-4 w-4" />
          Welcome back
        </div>
        <h1 className="mt-1.5 text-2xl font-bold tracking-tight md:text-3xl">
          Hi {user?.name?.split(' ')[0]}!
        </h1>
        <p className="mt-1.5 text-sm text-emerald-50/80 md:text-base">
          Find what you need on campus — borrow, rent, or reuse from fellow students.
        </p>

        {/* Search bar */}
        <div className="relative mt-5">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for books, calculators, cycles..."
            className="w-full rounded-xl border-0 bg-white py-3 pl-12 pr-4 text-sm text-gray-900 shadow-lg outline-none ring-2 ring-transparent transition-all placeholder:text-gray-400 focus:ring-white/50"
          />
        </div>
      </div>

      {/* List an item + stats */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{items.length} items available</p>
            <p className="text-xs text-gray-500">Across {CATEGORIES.length} categories</p>
          </div>
        </div>
        <button
          onClick={() => navigate('items')}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition-all hover:bg-emerald-700 active:scale-[0.98]"
        >
          <Plus className="h-4.5 w-4.5" />
          List an Item
        </button>
      </div>

      {/* Categories */}
      <h2 className="mb-3 text-base font-semibold text-gray-900">Browse by category</h2>
      <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
        {CATEGORIES.map((cat: Category) => (
          <button
            key={cat}
            onClick={() => navigate('explore')}
            className="flex shrink-0 flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-sm"
          >
            <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
            <span className="text-xs font-medium text-gray-700">{cat}</span>
          </button>
        ))}
      </div>

      {/* Featured items */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">Available items</h2>
        <button
          onClick={() => navigate('explore')}
          className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          View all →
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item) => (
          <ItemCard key={item.id} item={item} onClick={() => handleItemClick(item.id)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-gray-400">No items match "{search}"</p>
        </div>
      )}
    </div>
  );
}
