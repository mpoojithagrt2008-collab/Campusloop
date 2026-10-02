import { GraduationCap, Mail, IdCard, BadgeCheck, Package, Repeat } from 'lucide-react';
import { useApp } from '../store';
import { StarRating } from '../components/ui';

export function Profile() {
  const { user } = useApp();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-8">
      {/* Profile header */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="h-24 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 md:h-32" />
        <div className="px-6 pb-6">
          <div className="-mt-12 mb-4 flex items-end justify-between">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-emerald-100 text-4xl font-bold text-emerald-700 shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">{user.name}</h1>
            {user.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                <BadgeCheck className="h-4 w-4" />
                Verified Student
              </span>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <StarRating rating={user.rating} />
          </div>

          {/* Info cards */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                <GraduationCap className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400">College</p>
                <p className="text-sm font-semibold text-gray-900">{user.college}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                <Mail className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm font-semibold text-gray-900">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                <IdCard className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Student ID</p>
                <p className="text-sm font-semibold text-gray-900">{user.studentId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                <BadgeCheck className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Status</p>
                <p className="text-sm font-semibold text-gray-900">Verified Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
            <Package className="h-6 w-6 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{user.itemsListed}</p>
          <p className="mt-1 text-xs text-gray-500">Items Listed</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
            <Repeat className="h-6 w-6 text-teal-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{user.successfulExchanges}</p>
          <p className="mt-1 text-xs text-gray-500">Successful Exchanges</p>
        </div>
      </div>
    </div>
  );
}
