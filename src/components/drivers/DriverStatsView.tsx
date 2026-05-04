import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { DriverStats, DriverRacePoint } from '../../types';

interface Props {
  stats: DriverStats;
  history?: DriverRacePoint[];
  teamColour?: string;
}

const STAT_CARDS = (s: DriverStats) => [
  { label: 'Points', value: s.totalPoints, highlight: true },
  { label: 'Wins', value: s.wins },
  { label: 'Podiums', value: s.podiums },
  { label: 'Races', value: s.racesEntered },
  { label: 'DNFs', value: s.dnfs },
  { label: 'Best Finish', value: s.bestFinish != null ? `P${s.bestFinish}` : '—' },
];

export default function DriverStatsView({ stats, history, teamColour }: Props) {
  const color = teamColour ? `#${teamColour}` : '#dc2626';

  return (
    <div className="space-y-6">
      {/* Stat grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {STAT_CARDS(stats).map(({ label, value, highlight }) => (
          <div
            key={label}
            className={`rounded-xl p-4 text-center ${
              highlight ? 'bg-red-600 text-white' : 'bg-white border border-gray-200'
            }`}
          >
            <p className={`text-2xl font-bold tabular-nums ${highlight ? 'text-white' : 'text-gray-900'}`}>
              {value}
            </p>
            <p className={`text-xs mt-0.5 ${highlight ? 'text-red-100' : 'text-gray-500'}`}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Points accumulation chart */}
      {history && history.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Points Accumulation</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={history} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="pointsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="round"
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                formatter={(val) => [Number(val), 'Cumulative pts']}
                labelFormatter={(round) => {
                  const entry = history.find(h => h.round === round);
                  return entry ? entry.raceName : `Round ${round}`;
                }}
              />
              <Area
                type="monotone"
                dataKey="cumulative"
                stroke={color}
                strokeWidth={2}
                fill="url(#pointsGrad)"
                dot={{ r: 3, fill: color, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: color }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
