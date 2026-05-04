import { Link } from 'react-router-dom';
import type { Session } from '../../types';

interface Props {
  sessions: Session[];
  year: number;
}

// OpenF1 uses its own 2–3 letter codes; map to ISO 3166-1 alpha-2 for flag emojis
const COUNTRY_TO_ISO2: Record<string, string> = {
  AUS: 'AU', AUT: 'AT', AZE: 'AZ', BRN: 'BH', BEL: 'BE', BRA: 'BR',
  CAN: 'CA', CHN: 'CN', HUN: 'HU', ITA: 'IT', JPN: 'JP', MEX: 'MX',
  MON: 'MC', NED: 'NL', QAT: 'QA', KSA: 'SA', SGP: 'SG', ESP: 'ES',
  UAE: 'AE', GBR: 'GB', USA: 'US',
};

function flagEmoji(countryCode: string) {
  const iso2 = COUNTRY_TO_ISO2[countryCode.toUpperCase()] ?? countryCode.slice(0, 2).toUpperCase();
  const points = [...iso2].map(c => 0x1F1E6 - 65 + c.charCodeAt(0));
  return String.fromCodePoint(...points);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const SESSION_LABEL: Record<string, string> = {
  Race: 'Race',
  Qualifying: 'Quali',
  Practice: 'Practice',
  Sprint: 'Sprint',
  'Sprint Qualifying': 'Sprint Quali',
};

function groupByCircuit(sessions: Session[]) {
  const map = new Map<string, Session[]>();
  for (const s of sessions) {
    const key = s.circuit_short_name;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(s);
  }
  return map;
}

export default function RaceList({ sessions, year }: Props) {
  const groups = groupByCircuit(sessions);

  return (
    <div className="space-y-3">
      {[...groups.entries()].map(([circuit, group]) => {
        const first = group[0];
        const raceSession = group.find(s => s.session_name === 'Race');
        const dateRange = `${formatDate(first.date_start)}–${formatDate(group[group.length - 1].date_end)}`;

        return (
          <div key={circuit} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-2xl" role="img" aria-label={first.country_name}>
                  {flagEmoji(first.country_code)}
                </span>
                <div>
                  <p className="font-semibold text-gray-900">{first.country_name}</p>
                  <p className="text-sm text-gray-500">{circuit} · {dateRange}</p>
                </div>
              </div>
              {raceSession && (
                <Link
                  to={`/races/${year}/${raceSession.session_key}`}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Results →
                </Link>
              )}
            </div>

            <div className="flex flex-wrap gap-2 px-5 py-3">
              {group.map((s) => (
                <span
                  key={s.session_key}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    s.session_name === 'Race'
                      ? 'bg-red-100 text-red-700'
                      : s.session_name === 'Sprint'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {SESSION_LABEL[s.session_name] ?? s.session_name}
                  <span className="ml-1 text-gray-400">{formatDate(s.date_start)}</span>
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
