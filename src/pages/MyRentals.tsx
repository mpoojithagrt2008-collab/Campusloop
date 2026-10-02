import { CalendarCheck, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { useApp } from '../store';
import type { Page } from '../components/Navigation';

interface Props {
  navigate: (p: Page) => void;
}

const STATUS_STYLES: Record<string, string> = {
  Pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  Approved: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Declined: 'bg-red-50 text-red-600 ring-red-200',
};

const STATUS_ICONS: Record<string, typeof Clock> = {
  Pending: Clock,
  Approved: CheckCircle2,
  Declined: XCircle,
};

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function MyRentals({ navigate }: Props) {
  const { requests } = useApp();

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-8">
      <h1 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">My Rentals</h1>
      <p className="mb-6 text-sm text-gray-500">Track your borrow requests and active rentals</p>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <CalendarCheck className="h-8 w-8 text-emerald-500" />
          </div>
          <h3 className="text-base font-semibold text-gray-900">No rentals yet</h3>
          <p className="mt-1 max-w-xs text-sm text-gray-500">
            Browse items on campus and send a borrow request to get started.
          </p>
          <button
            onClick={() => navigate('explore')}
            className="mt-5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition-all hover:bg-emerald-700"
          >
            Explore Items
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((req) => {
            const StatusIcon = STATUS_ICONS[req.status];
            return (
              <div
                key={req.id}
                className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-sm"
              >
                <img
                  src={req.itemImage}
                  alt={req.itemName}
                  className="h-16 w-16 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-gray-900">{req.itemName}</h3>
                  <p className="text-xs text-gray-500">From {req.ownerName}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                    <span>{formatDate(req.startDate)} → {formatDate(req.endDate)}</span>
                  </div>
                </div>
                <div
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${STATUS_STYLES[req.status]}`}
                >
                  <StatusIcon className="h-3.5 w-3.5" />
                  {req.status}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
