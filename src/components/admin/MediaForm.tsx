import { mediaCategories } from "@/data/categories";
import { createMediaAction, updateMediaAction } from "@/lib/actions/admin";
import type { MediaItem } from "@/types/media";

export function MediaForm({ item }: { item?: MediaItem }) {
  const action = item ? updateMediaAction : createMediaAction;

  return (
    <form action={action} className="grid gap-5" encType="multipart/form-data">
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="admin-label">
          Tip
          <select name="type" defaultValue={item?.type ?? "image"} className="admin-input">
            <option value="image">Fotoğraf</option>
            <option value="video">Video</option>
          </select>
        </label>
        <label className="admin-label">
          Kategori
          <select name="category" defaultValue={item?.category ?? "details"} className="admin-input">
            {mediaCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!item ? (
        <label className="admin-label">
          Dosya yükle
          <input name="file" type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime" className="admin-input" />
          <span className="admin-help">Görsel 10MB, video 100MB sınırındadır. Supabase yoksa dosya public/media/raw altına kaydedilir.</span>
        </label>
      ) : null}

      <label className="admin-label">
        Medya URL
        <input name="publicUrl" defaultValue={item?.publicUrl ?? ""} className="admin-input" placeholder="/insta/posts/..." />
        <span className="admin-help">Dosya yüklemeden harici veya public klasöründeki medya URL’si de kullanılabilir.</span>
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="admin-label">
          Başlık
          <input name="title" defaultValue={item?.title ?? ""} className="admin-input" required />
        </label>
        <label className="admin-label">
          Sıra
          <input name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} className="admin-input" />
        </label>
      </div>

      <label className="admin-label">
        Alt metin
        <input name="alt" defaultValue={item?.alt ?? ""} className="admin-input" />
      </label>

      <label className="admin-label">
        Açıklama
        <textarea name="description" defaultValue={item?.description ?? ""} className="admin-input min-h-28" />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="admin-label">
          Thumbnail URL
          <input name="thumbnailUrl" defaultValue={item?.thumbnailUrl ?? ""} className="admin-input" />
        </label>
        <label className="admin-label">
          Poster URL
          <input name="posterUrl" defaultValue={item?.posterUrl ?? ""} className="admin-input" />
        </label>
      </div>

      <div className="flex flex-wrap gap-5">
        <label className="inline-flex items-center gap-2 text-sm font-bold text-text">
          <input name="isActive" type="checkbox" defaultChecked={item?.isActive ?? true} />
          Aktif
        </label>
        <label className="inline-flex items-center gap-2 text-sm font-bold text-text">
          <input name="isFeatured" type="checkbox" defaultChecked={item?.isFeatured ?? false} />
          Öne çıkar
        </label>
        <label className="inline-flex items-center gap-2 text-sm font-bold text-text">
          <input name="isHero" type="checkbox" defaultChecked={item?.isHero ?? false} />
          Hero
        </label>
      </div>

      <button type="submit" className="w-fit rounded-lg bg-green-dark px-5 py-3 text-sm font-bold text-white">
        Kaydet
      </button>
    </form>
  );
}
