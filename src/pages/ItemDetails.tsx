import { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  User,
  Tag,
  Calendar,
  MessageSquare,
  Send,
  CheckCircle2,
} from 'lucide-react';
import type { Item } from '../types';
import { useApp } from '../store';
import { VerifiedBadge, ConditionBadge, formatPrice, StarRating } from '../components/ui';
import { Star } from 'lucide-react';

interface Props {
  item: Item;
  onBack: () => void;
}

export function ItemDetails({ item, onBack }: Props) {
  const { user, addRequest, getItemReviews, getOwnerRating } = useApp();
  const itemReviews = getItemReviews(item.id);
  const ownerLiveRating = getOwnerRating(item.ownerId);
  const displayRating = ownerLiveRating > 0 ? ownerLiveRating : 0;
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRequest({
      itemId: item.id,
      itemName: item.name,
      itemImage: item.image,
      ownerId: item.ownerId,
      ownerName: item.ownerName,
      borrowerId: user?.studentId ?? 'me',
      borrowerName: user?.name ?? 'Student',
      startDate,
      endDate,
      message,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 md:py-12">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </button>
        <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm md:p-12">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Request Pending</h2>
          <p className="mt-2 max-w-sm text-sm text-gray-500">
            Your request to borrow <span className="font-semibold text-gray-700">{item.name}</span> from{' '}
            <span className="font-semibold text-gray-700">{item.ownerName}</span> has been sent.
            You'll be notified once they respond.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={onBack}
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-8">
      <button
        onClick={onBack}
        className="mb-5 flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
          <img src={item.image} alt={item.name} className="aspect-[4/3] w-full object-cover" />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <ConditionBadge condition={item.condition} />
              <span className="text-xs text-gray-400">{item.category}</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
              {item.name}
            </h1>
          </div>

          <div className="rounded-xl bg-emerald-50 px-4 py-3">
            <span className="text-2xl font-bold text-emerald-600">
              {formatPrice(item.pricePerDay)}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>

          {/* Info rows */}
          <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4.5 w-4.5 text-gray-400" />
              <span className="text-gray-500">Location</span>
              <span className="ml-auto font-medium text-gray-900">{item.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Tag className="h-4.5 w-4.5 text-gray-400" />
              <span className="text-gray-500">Condition</span>
              <span className="ml-auto font-medium text-gray-900">{item.condition}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <User className="h-4.5 w-4.5 text-gray-400" />
              <span className="text-gray-500">Owner</span>
              <span className="ml-auto flex items-center gap-1.5 font-medium text-gray-900">
                {item.ownerName}
                <VerifiedBadge verified={item.verified} />
                {displayRating > 0 && (
                  <span className="ml-1 flex items-center gap-0.5 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    {displayRating.toFixed(1)}
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Request form */}
          {itemReviews.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                Reviews ({itemReviews.length})
              </h3>
              <div className="space-y-3">
                {itemReviews.map((rev) => (
                  <div key={rev.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`h-3.5 w-3.5 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-gray-700">{rev.borrowerName}</span>
                    </div>
                    {rev.reviewText && (
                      <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{rev.reviewText}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {showRequestForm ? (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-xl border border-gray-200 bg-white p-4"
            >
              <h3 className="text-sm font-semibold text-gray-900">Request to Borrow</h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-2 text-sm text-gray-900 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-2 text-sm text-gray-900 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Message to owner
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder="Hi! I'd like to borrow this for..."
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-900 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition-all hover:bg-emerald-700 active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                Submit Request
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowRequestForm(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition-all hover:bg-emerald-700 active:scale-[0.98]"
            >
              Request to Borrow
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
