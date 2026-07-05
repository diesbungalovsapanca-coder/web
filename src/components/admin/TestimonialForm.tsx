import { saveTestimonialAction } from "@/lib/actions/admin";
import type { Testimonial } from "@/types/site";

export function TestimonialForm({ item }: { item?: Testimonial }) {
  return (
    <form action={saveTestimonialAction} className="grid gap-4 rounded-lg border border-border bg-background p-4">
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      <div className="grid gap-4 md:grid-cols-[1fr_12rem_8rem_8rem]">
        <label className="admin-label">
          İsim
          <input name="name" defaultValue={item?.name ?? ""} className="admin-input" required />
        </label>
        <label className="admin-label">
          Kaynak
          <select name="source" defaultValue={item?.source ?? "Manuel"} className="admin-input">
            <option>Google</option>
            <option>Instagram</option>
            <option>WhatsApp</option>
            <option>Manuel</option>
          </select>
        </label>
        <label className="admin-label">
          Puan
          <input name="rating" type="number" min="1" max="5" defaultValue={item?.rating ?? 5} className="admin-input" />
        </label>
        <label className="admin-label">
          Sıra
          <input name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} className="admin-input" />
        </label>
      </div>
      <label className="admin-label">
        Yorum
        <textarea name="comment" defaultValue={item?.comment ?? ""} className="admin-input min-h-28" required />
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
