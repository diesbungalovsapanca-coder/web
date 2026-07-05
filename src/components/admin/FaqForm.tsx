import { saveFaqAction } from "@/lib/actions/admin";
import type { Faq } from "@/types/site";

export function FaqForm({ item }: { item?: Faq }) {
  return (
    <form action={saveFaqAction} className="grid gap-4 rounded-lg border border-border bg-background p-4">
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      <div className="grid gap-4 md:grid-cols-[1fr_12rem_8rem]">
        <label className="admin-label">
          Soru
          <input name="question" defaultValue={item?.question ?? ""} className="admin-input" required />
        </label>
        <label className="admin-label">
          Kategori
          <input name="category" defaultValue={item?.category ?? "Genel"} className="admin-input" required />
        </label>
        <label className="admin-label">
          Sıra
          <input name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} className="admin-input" />
        </label>
      </div>
      <label className="admin-label">
        Cevap
        <textarea name="answer" defaultValue={item?.answer ?? ""} className="admin-input min-h-28" required />
      </label>
      <div className="flex items-center justify-between gap-4">
        <label className="inline-flex items-center gap-2 text-sm font-bold">
          <input name="isActive" type="checkbox" defaultChecked={item?.isActive ?? true} />
          Aktif
        </label>
        <button type="submit" className="rounded-lg bg-green-dark px-4 py-2 text-sm font-bold text-white">
          Kaydet
        </button>
      </div>
    </form>
  );
}
