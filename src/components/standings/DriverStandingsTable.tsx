import { Link } from 'react-router-dom';
import type { DriverStanding } from '../../types';

interface Props {
  standings: DriverStanding[];
  year: number;
}

const MEDALS = ['🥇', '🥈', '🥉'];

export default function DriverStandingsTable({ standings, year }: Props) {
  const maxPoints = standings[0]?.points ?? 1;

  return (
    <div className="divide-y divide-gray-100">
      {standings.map((s) => (
        <Link
          key={s.position}
          to={`/drivers/${s.nameAcronym}/${year}`}
          className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors group"
        >
          {/* Position */}
          <span className="w-8 text-center text-sm font-bold text-gray-400 shrink-0">
            {s.position <= 3 ? MEDALS[s.position - 1] : s.position}
          </span>

          {/* Headshot */}
          <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0">
            {s.headshotsUrl ? (
              <img
                src={s.headshotsUrl}
                alt={s.nameAcronym}
                className="w-full h-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-400">
                {s.nameAcronym}
              </div>
            )}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors truncate">
              {s.firstName} {s.lastName}
            </p>
            <p className="text-xs text-gray-400">{s.nameAcronym}</p>
          </div>

          {/* Points bar */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:block w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full transition-all"
                style={{ width: `${(s.points / maxPoints) * 100}%` }}
              />
            </div>
            <span className="text-sm font-bold text-gray-900 w-10 text-right">{s.points}</span>
            <span className="text-xs text-gray-400">pts</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
