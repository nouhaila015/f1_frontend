import type { TeamStanding } from '../../types';

interface Props {
  standings: TeamStanding[];
}

const MEDALS = ['🥇', '🥈', '🥉'];

export default function TeamStandingsTable({ standings }: Props) {
  const maxPoints = standings[0]?.points ?? 1;

  return (
    <div className="divide-y divide-gray-100">
      {standings.map((s) => {
        const color = `#${s.teamColour}`;
        return (
          <div key={s.position} className="flex items-center gap-4 px-4 py-3">
            {/* Position */}
            <span className="w-8 text-center text-sm font-bold text-gray-400 shrink-0">
              {s.position <= 3 ? MEDALS[s.position - 1] : s.position}
            </span>

            {/* Color swatch */}
            <div
              className="w-1 self-stretch rounded-full shrink-0"
              style={{ backgroundColor: color }}
            />

            {/* Team name + drivers */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{s.teamName}</p>
              <div className="flex gap-1 mt-0.5 flex-wrap">
                {s.drivers.map((d) => (
                  <span
                    key={d.number}
                    className="text-xs px-1.5 py-0.5 rounded font-medium"
                    style={{ backgroundColor: `${color}22`, color }}
                  >
                    {d.acronym}
                  </span>
                ))}
              </div>
            </div>

            {/* Points bar */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden sm:block w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(s.points / maxPoints) * 100}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
              <span className="text-sm font-bold text-gray-900 w-10 text-right">{s.points}</span>
              <span className="text-xs text-gray-400">pts</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
