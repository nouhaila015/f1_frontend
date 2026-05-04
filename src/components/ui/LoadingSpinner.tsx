interface Props {
  message?: string;
  detail?: string;
}

export default function LoadingSpinner({ message, detail }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center px-4">
      <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      {message && (
        <div>
          <p className="font-medium text-gray-700">{message}</p>
          {detail && <p className="text-sm text-gray-400 mt-1">{detail}</p>}
        </div>
      )}
    </div>
  );
}
