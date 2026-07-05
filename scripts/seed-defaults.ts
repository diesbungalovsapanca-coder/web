import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  defaultExperienceCards,
  defaultFaqs,
  defaultFeatures,
  defaultMedia,
  defaultReservationInfo,
  defaultSettings,
  defaultTestimonials
} from "../src/data/defaults";

async function main() {
  const dir = path.join(process.cwd(), ".local-data");
  await mkdir(dir, { recursive: true });
  await writeFile(
    path.join(dir, "dies-content.json"),
    JSON.stringify(
      {
        siteSettings: defaultSettings,
        mediaItems: defaultMedia,
        features: defaultFeatures,
        faqs: defaultFaqs,
        testimonials: defaultTestimonials,
        experienceCards: defaultExperienceCards,
        reservationInfo: defaultReservationInfo
      },
      null,
      2
    )
  );
  console.log("Local seed data written to .local-data/dies-content.json");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
