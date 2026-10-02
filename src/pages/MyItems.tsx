import { useState, useMemo } from 'react';
import { Plus, Package, Check, X, Clock, MessageSquare, Calendar, Inbox } from 'lucide-react';
import { useApp } from '../store';
import { CATEGORIES, CONDITIONS } from '../data';
import { ItemCard } from '../components/ItemCard';
import type { Category, Condition } from '../types';

const PLACEHOLDER_IMAGES: Record<Category, string> = {
  Books: 'https://images.pexels.com/photos/240163/pexels-photo-240163.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  Calculators: 'https://images.pexels.com/photos/5776/calculator-scientific.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
  Electronics: 'https://images.pexels.com/photos/4792712/pexels-photo-4792712.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  Cycles: 'https://images.pexels.com/photos/7483081/pexels-photo-7483081.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  Sports: 'https://images.pexels.com/photos/13509805/pexels-photo-13509805.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Lab Equipment': 'https://images.pexels.com/photos/5477780/pexels-photo-5477780.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  Other: 'https://images.pexels.com/photos/4792712/pexels-photo-4792712.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export function MyItems() {
  const { user, items, addListing, requests, updateRequestStatus } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Books');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState<Condition>('Good');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');

  const myListings = useMemo(
    () => items.filter((i) => i.ownerId === 'me' || i.ownerName === user?.name),
    [items, user],
  );

  const incomingRequests = useMemo(
    () => requests.filter((r) => r.ownerId === 'me' || r.ownerName === user?.name),
    [requests, user],
  );

  const resetForm = () => {
    setName('');
    setCategory('Books');
    setDescription('');
    setCondition('Good');
    setPrice('');
    setLocation('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addListing({
      name,
      category,
      description,
      condition,
      pricePerDay: price ? Number(price) : 0,
      location: location || 'Campus',
      image: PLACEHOLDER_IMAGES[category],
    });
    resetForm();
    setShowForm(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Items</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your listed items</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition-all hover:bg-emerald-700 active:scale-[0.98]"
        >
          <Plus className="h-4.5 w-4.5" />
          <span className="hidden sm:inline">List an Item</span>
          <span className="sm:hidden">List</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6"
        >
          <h3 className="mb-4 text-base font-semibold text-gray-900">List a new item</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Item Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mechanical Pencil Set"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe your item..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as Condition)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              >
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Price per day (₹) <span className="text-gray-400">— 0 for free</span>
              </label>
              <input
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Hostel H-4, IIT Bombay"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition-all hover:bg-emerald-700 active:scale-[0.98]"
            >
              Publish Item
            </button>
            <button
              type="button"
              onClick={() => { resetForm(); setShowForm(false); }}
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Incoming requests */}
      {incomingRequests.length > 0 && (
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Inbox className="h-5 w-5 text-emerald-600" />
            <h2 className="text-base font-semibold text-gray-900">Incoming Requests</h2>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              {incomingRequests.length}
            </span>
          </div>
          <div className="space-y-3">
            {incomingRequests.map((req) => (
              <div
                key={req.id}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={req.itemImage}
                    alt={req.itemName}
                    className="h-14 w-14 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-gray-900">{req.itemName}</h3>
                    <p className="text-xs text-gray-500">
                      Requested by <span className="font-medium text-gray-700">{req.borrowerName}</span>
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {req.startDate} → {req.endDate}
                      </span>
                    </div>
                    {req.message && (
                      <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">
                        <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
                        <span>{req.message}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                  <span
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                      req.status === 'Pending'
                        ? 'bg-amber-50 text-amber-700 ring-amber-200'
                        : req.status === 'Accepted'
                          ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                          : req.status === 'Completed'
                            ? 'bg-teal-50 text-teal-700 ring-teal-200'
                            : 'bg-red-50 text-red-600 ring-red-200'
                    }`}
                  >
                    {req.status === 'Pending' && <Clock className="h-3.5 w-3.5" />}
                    {req.status === 'Accepted' && <Check className="h-3.5 w-3.5" />}
                    {req.status === 'Rejected' && <X className="h-3.5 w-3.5" />}
                    {req.status === 'Completed' && <Check className="h-3.5 w-3.5" />}
                    {req.status}
                  </span>

                  {req.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateRequestStatus(req.id, 'Accepted')}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Accept
                      </button>
                      <button
                        onClick={() => updateRequestStatus(req.id, 'Rejected')}
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <X className="h-3.5 w-3.5" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Listings */}
      {myListings.length > 0 ? (
        <>
          <h2 className="mb-3 text-sm font-semibold text-gray-700">
            Your listings ({myListings.length})
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {myListings.map((item) => (
              <ItemCard key={item.id} item={item} onClick={() => {}} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <Package className="h-8 w-8 text-emerald-500" />
          </div>
          <h3 className="text-base font-semibold text-gray-900">No items listed yet</h3>
          <p className="mt-1 max-w-xs text-sm text-gray-500">
            List your first item to start lending to fellow students.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition-all hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" />
            List an Item
          </button>
        </div>
      )}
    </div>
  );
}
