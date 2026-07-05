export function AdminNotice({ ok, error }: { ok?: string; error?: string }) {
  if (!ok && !error) return null;
  return (
    <div
      className={`mb-6 rounded-lg border px-4 py-3 text-sm font-semibold ${
        ok ? "border-green/20 bg-green/10 text-green-dark" : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      {ok || error}
    </div>
  );
}
