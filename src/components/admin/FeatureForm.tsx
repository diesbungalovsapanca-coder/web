import { iconOptions } from "@/components/common/Icon";
import { saveFeatureAction } from "@/lib/actions/admin";
import type { Feature } from "@/types/site";

export function FeatureForm({ item }: { item?: Feature }) {
  return (
    <form action={saveFeatureAction} className="grid gap-4 rounded-lg border border-border bg-background p-4">
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      <div className="grid gap-4 md:grid-cols-[1fr_1fr_8rem]">
        <label className="admin-label">
          Başlık
          <input name="title" defaultValue={item?.title ?? ""} className="admin-input" required />
        </label>
        <label className="admin-label">
          İkon
          <select name="icon" defaultValue={item?.icon ?? "Sparkles"} className="admin-input">
            {iconOptions.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </label>
        <label className="admin-label">
          Sıra
          <input name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} className="admin-input" />
        </label>
      </div>
      <label className="admin-label">
        Açıklama
        <textarea name="description" defaultValue={item?.description ?? ""} className="admin-input min-h-24" required />
      </label>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-5">
          <label className="inline-flex items-center gap-2 text-sm font-bold">
            <input name="isActive" type="checkbox" defaultChecked={item?.isActive ?? true} />
            Aktif
          </label>
          <label className="inline-flex items-center gap-2 text-sm font-bold">
            <input name="isFeatured" type="checkbox" defaultChecked={item?.isFeatured ?? false} />
            Öne çıkan
          </label>
        </div>
        <button type="submit" className="rounded-lg bg-green-dark px-4 py-2 text-sm font-bold text-white">
          Kaydet
        </button>
      </div>
    </form>
  );
}
