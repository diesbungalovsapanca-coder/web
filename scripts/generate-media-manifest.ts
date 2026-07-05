import { execFileSync } from "node:child_process";
import { accessSync, existsSync } from "node:fs";
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { mediaCuration } from "../src/data/media-curation";

const projectRoot = process.cwd();
const sourceDir = process.env.MEDIA_SOURCE_DIR || "public/insta/posts";
const outputFile = process.env.MEDIA_OUTPUT_FILE || "src/data/local-media.ts";
const publicManifest = process.env.MEDIA_PUBLIC_MANIFEST || "public/media/manifest.json";
const posterDir = "public/media/posters";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const videoExtensions = new Set([".mp4", ".mov", ".m4v"]);

function publicPath(filePath: string) {
  return `/${filePath.replace(/^public\//, "").replaceAll(path.sep, "/")}`;
}

function mediaType(extension: string) {
  if (imageExtensions.has(extension)) return "image";
  if (videoExtensions.has(extension)) return "video";
  return null;
}

function orientationFromName(type: "image" | "video") {
  return type === "video" ? "portrait" : "portrait";
}

function titleFor(index: number, type: "image" | "video") {
  return type === "video"
    ? `DİES BUNGALOV video atmosferi ${index + 1}`
    : `DİES BUNGALOV fotoğrafı ${index + 1}`;
}

function resolveFfmpeg() {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
    return "ffmpeg";
  } catch {
    accessSync("/opt/homebrew/bin/ffmpeg");
    return "/opt/homebrew/bin/ffmpeg";
  }
}

function createPoster(videoFile: string, ffmpegPath: string) {
  const basename = path.basename(videoFile, path.extname(videoFile));
  const outputRelative = path.join(posterDir, `${basename}.jpg`);
  const outputAbsolute = path.join(projectRoot, outputRelative);
  if (!existsSync(outputAbsolute)) {
    execFileSync(
      ffmpegPath,
      [
        "-y",
        "-i",
        path.join(projectRoot, videoFile),
        "-ss",
        "00:00:01",
        "-frames:v",
        "1",
        "-q:v",
        "3",
        outputAbsolute
      ],
      { stdio: "ignore" }
    );
  }
  return publicPath(outputRelative);
}

async function collectFiles(dir: string) {
  const absoluteDir = path.join(projectRoot, dir);
  const entries = await readdir(absoluteDir, { recursive: true });
  const files: string[] = [];

  for (const entry of entries) {
    const relative = path.join(dir, entry.toString());
    const absolute = path.join(projectRoot, relative);
    const info = await stat(absolute);
    if (!info.isFile()) continue;
    const extension = path.extname(relative).toLowerCase();
    if (!mediaType(extension)) continue;
    files.push(relative);
  }

  return files.sort();
}

async function main() {
  await mkdir(path.join(projectRoot, posterDir), { recursive: true });
  const ffmpegPath = resolveFfmpeg();
  const files = await collectFiles(sourceDir);
  const videos = files.filter((file) => videoExtensions.has(path.extname(file).toLowerCase()));
  const images = files.filter((file) => imageExtensions.has(path.extname(file).toLowerCase()));
  const ordered = [...videos, ...images];

  const items = ordered.map((file, index) => {
    const extension = path.extname(file).toLowerCase();
    const type = mediaType(extension)!;
    const basename = path.basename(file, extension);
    const curation = mediaCuration[basename];
    const isHero = index === 0;
    const isFeatured = curation ? curation.isFeatured === true : index < 12;
    const category = curation?.category ?? (isHero ? "hero" : "details");
    const title = curation?.title ?? titleFor(index, type);
    return {
      id: `insta-${basename}`,
      type,
      storagePath: file,
      publicUrl: publicPath(file),
      thumbnailUrl: type === "image" ? publicPath(file) : null,
      posterUrl: type === "video" ? createPoster(file, ffmpegPath) : null,
      category,
      title,
      alt: curation?.alt ?? `${title} — DİES Bungalov Sapanca`,
      description: null,
      orientation: orientationFromName(type),
      width: null,
      height: null,
      isFeatured,
      isHero,
      isActive: curation?.isActive ?? true,
      sortOrder: index + 1
    };
  });

  const ts = `import type { MediaItem } from "@/types/media";

export const localInstagramMedia: MediaItem[] = ${JSON.stringify(items, null, 2)} as MediaItem[];
`;

  await writeFile(path.join(projectRoot, outputFile), ts);
  await writeFile(path.join(projectRoot, publicManifest), `${JSON.stringify(items, null, 2)}\n`);
  console.log(`Generated ${items.length} media items from ${sourceDir}`);
  console.log(`Wrote ${outputFile}`);
  console.log(`Wrote ${publicManifest}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
