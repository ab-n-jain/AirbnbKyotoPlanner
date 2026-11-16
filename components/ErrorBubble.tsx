export default function ErrorBubble({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      role="alert"
      className="w-full max-w-md animate-rise rounded-3xl rounded-bl-md border border-hairline bg-white p-4 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-neutral-100 text-lg" aria-hidden="true">
          🍵
        </span>
        <div>
          <p className="font-semibold">That took a wrong turn</p>
          <p className="mt-0.5 text-sm text-muted">
            We couldn&apos;t put your Kyoto weekend together just now. Your request is saved, so one tap
            brings your stay, experience and food spot back.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 w-full rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-black active:scale-[0.98]"
      >
        Try again
      </button>
    </div>
  );
}
