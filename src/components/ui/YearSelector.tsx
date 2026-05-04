// Add years here as seasons are synced from OpenF1
const AVAILABLE_YEARS = [2024, 2023];

interface Props {
  year: number;
  onChange: (year: number) => void;
}

export default function YearSelector({ year, onChange }: Props) {
  return (
    <select
      value={year}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white"
    >
      {AVAILABLE_YEARS.map((y) => (
        <option key={y} value={y}>{y}</option>
      ))}
    </select>
  );
}
