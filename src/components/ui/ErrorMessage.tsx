import { isAxiosError } from 'axios';

interface Props {
  error?: unknown;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ error, message, onRetry }: Props) {
  const is503 = isAxiosError(error) && error.response?.status === 503;

  const title = is503
    ? 'OpenF1 rate limit reached'
    : (message ?? 'Something went wrong.');

  const detail = is503
    ? 'The data provider is temporarily unavailable. Wait a moment and try again.'
    : undefined;

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5 flex flex-col items-start gap-3">
      <div>
        <p className="font-semibold text-red-700">{title}</p>
        {detail && <p className="text-sm text-red-500 mt-0.5">{detail}</p>}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm font-medium bg-red-600 text-white px-4 py-1.5 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
