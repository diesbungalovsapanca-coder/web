import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const bucketName = "dies-media";
const manifestPath = path.join(process.cwd(), "public/media/manifest.json");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".mp4") return "video/mp4";
  if (ext === ".mov") return "video/quicktime";
  return "application/octet-stream";
}

function publicPathToLocal(publicPath) {
  return path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
}

function remotePathForLocal(localPath) {
  const normalized = localPath.replaceAll(path.sep, "/");
  if (normalized.startsWith("public/insta/posts/")) {
    return normalized.replace("public/insta/posts/", "instagram/posts/");
  }
  if (normalized.startsWith("public/media/posters/")) {
    return normalized.replace("public/media/posters/", "media/posters/");
  }
  if (normalized.startsWith("public/media/fallback/")) {
    return normalized.replace("public/media/fallback/", "media/fallback/");
  }
  return normalized.replace(/^public\//, "");
}

function publicUrlFor(remotePath) {
  return supabase.storage.from(bucketName).getPublicUrl(remotePath).data.publicUrl;
}

async function ensureBucket() {
  const { data } = await supabase.storage.getBucket(bucketName);
  if (data) return;

  const { error } = await supabase.storage.createBucket(bucketName, {
    public: true,
    fileSizeLimit: "50MB"
  });

  if (error && !error.message.toLowerCase().includes("already exists")) {
    throw error;
  }
}

async function uploadLocalFile(localPath) {
  const remotePath = remotePathForLocal(localPath);
  const absolutePath = path.join(process.cwd(), localPath);
  const buffer = await readFile(absolutePath);

  const { error } = await supabase.storage.from(bucketName).upload(remotePath, buffer, {
    upsert: true,
    cacheControl: "31536000",
    contentType: contentTypeFor(localPath)
  });

  if (error) throw error;
  return {
    remotePath,
    publicUrl: publicUrlFor(remotePath)
  };
}

async function uploadPublicPath(publicPath) {
  if (!publicPath || !publicPath.startsWith("/")) return null;
  return uploadLocalFile(path.relative(process.cwd(), publicPathToLocal(publicPath)));
}

async function upsertMediaItem(item, uploaded) {
  const payload = {
    type: item.type,
    storage_path: uploaded.media.remotePath,
    public_url: uploaded.media.publicUrl,
    thumbnail_url: uploaded.thumbnail?.publicUrl ?? null,
    poster_url: uploaded.poster?.publicUrl ?? null,
    category: item.category,
    title: item.title,
    alt: item.alt,
    description: item.description,
    orientation: item.orientation,
    width: item.width,
    height: item.height,
    is_featured: item.isFeatured,
    is_hero: item.isHero,
    is_active: item.isActive,
    sort_order: item.sortOrder
  };

  const { data: existing, error: existingError } = await supabase
    .from("media_items")
    .select("id")
    .eq("storage_path", payload.storage_path)
    .maybeSingle();

  if (existingError) throw existingError;

  if (existing?.id) {
    const { error } = await supabase.from("media_items").update(payload).eq("id", existing.id);
    if (error) throw error;
    return existing.id;
  }

  const { data, error } = await supabase.from("media_items").insert(payload).select("id").single();
  if (error) throw error;
  return data.id;
}

async function updateBrandLogo(logoUrl) {
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "brand")
    .maybeSingle();

  if (error) throw error;
  const value = {
    ...(data?.value && typeof data.value === "object" ? data.value : {}),
    logoUrl
  };

  const { error: upsertError } = await supabase
    .from("site_settings")
    .upsert({ key: "brand", value }, { onConflict: "key" });

  if (upsertError) throw upsertError;
}

async function main() {
  await ensureBucket();

  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const uploadedFiles = new Map();
  const mediaIds = [];
  let brandLogoUrl = null;

  async function uploadOnce(localPath) {
    if (!localPath) return null;
    if (uploadedFiles.has(localPath)) return uploadedFiles.get(localPath);
    const uploaded = await uploadLocalFile(localPath);
    uploadedFiles.set(localPath, uploaded);
    return uploaded;
  }

  for (const item of manifest) {
    const media = await uploadOnce(item.storagePath);
    const poster = await uploadPublicPath(item.posterUrl);
    const thumbnail =
      item.thumbnailUrl && item.thumbnailUrl !== item.publicUrl
        ? await uploadPublicPath(item.thumbnailUrl)
        : item.type === "image"
          ? media
          : null;

    const id = await upsertMediaItem(item, { media, poster, thumbnail });
    mediaIds.push(id);

    if (item.storagePath.endsWith("18047115356088151.jpg")) {
      brandLogoUrl = media.publicUrl;
    }

    console.log(`Uploaded ${item.sortOrder}/${manifest.length}: ${item.storagePath}`);
  }

  const fallback = await uploadLocalFile("public/media/fallback/dies-hero-fallback.png");
  uploadedFiles.set("public/media/fallback/dies-hero-fallback.png", fallback);

  if (brandLogoUrl) {
    await updateBrandLogo(brandLogoUrl);
  }

  console.log(`Done. Uploaded ${uploadedFiles.size} files and upserted ${mediaIds.length} media rows.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
