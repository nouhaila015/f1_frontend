interface Props {
  year: number;
  onChange: (year: number) => void;
}

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => currentYear - i);

export default function YearSelector({ year, onChange }: Props) {
  return (
    <select
      value={year}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white"
    >
      {YEARS.map((y) => (
        <option key={y} value={y}>{y}</option>
      ))}
    </select>
  );
}
