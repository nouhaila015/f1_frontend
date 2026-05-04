import type { RaceResult } from '../../types';

interface Props {
  results: RaceResult[];
}

const PODIUM_STYLES: Record<number, string> = {
  1: 'bg-yellow-50 border-l-4 border-yellow-400',
  2: 'bg-gray-50 border-l-4 border-gray-400',
  3: 'bg-orange-50 border-l-4 border-amber-500',
};

function formatGap(gap: number): string {
  if (gap === 0) return 'LEADER';
  return `+${gap.toFixed(3)}s`;
}

export default function RaceResultsTable({ results }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-14">Pos</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Driver</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Team</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Gap</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {results.map((r) => {
            const isOut = r.dnf || r.dns || r.dsq;
            const podiumClass = PODIUM_STYLES[r.position] ?? '';
            const color = `#${r.teamColour}`;

            return (
              <tr
                key={r.driverNumber}
                className={`${podiumClass || 'hover:bg-gray-50'} transition-colors`}
              >
                <td className="px-4 py-3 font-bold">
                  {isOut ? (
                    <span className="text-gray-300">—</span>
                  ) : (
                    <span className={r.position <= 3 ? 'text-gray-900' : 'text-gray-500'}>
                      {r.position}
                    </span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div>
                      <span className="font-semibold text-gray-900 flex items-center gap-1.5">
                        {r.fullName}
                        {r.fastestLap && (
                          <span title="Fastest lap" className="text-purple-600 text-xs font-bold">🏁</span>
                        )}
                      </span>
                      <span className="text-xs text-gray-400">{r.nameAcronym}</span>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {r.dnf && <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-600 font-semibold">DNF</span>}
                      {r.dns && <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-semibold">DNS</span>}
                      {r.dsq && <span className="text-xs px-1.5 py-0.5 rounded bg-orange-100 text-orange-600 font-semibold">DSQ</span>}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-gray-600">{r.teamName}</span>
                  </span>
                </td>

                <td className="px-4 py-3 text-right tabular-nums">
                  {isOut ? (
                    <span className="text-gray-300">—</span>
                  ) : (
                    <span className={r.gapToLeader === 0 ? 'font-semibold text-gray-900' : 'text-gray-500'}>
                      {formatGap(r.gapToLeader)}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
