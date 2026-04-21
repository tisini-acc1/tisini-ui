import type { Participant } from "@/lib/types/voting";

import arnoldImg from "@/assets/voting/arnold.jpeg";
import derrickImg from "@/assets/voting/derrick.jpeg";
import janImg from "@/assets/voting/jan.jpeg";
import samuelImg from "@/assets/voting/samuel.jpeg";
import charlesImg from "@/assets/voting/charles.jpeg";
import arturoImg from "@/assets/voting/arturo.jpeg";
import khwesaImg from "@/assets/voting/khwesa.jpeg";
import mbilaImg from "@/assets/voting/mbila.jpeg";
import obatImg from "@/assets/voting/obat.jpeg";
import rogenaImg from "@/assets/voting/rogena.jpeg";
import ronnieImg from "@/assets/voting/ronnie.jpeg";

import impactImg from "@/assets/voting/Impact-potw.jpeg";

export const causesImages: Record<number, string> = {
  5: impactImg,
};

export const participantImages: Record<number, string> = {
  3: derrickImg,
  4: arnoldImg,
  5: janImg,
  6: samuelImg,
  7: charlesImg,
  8: obatImg,
  9: arturoImg,
  10: rogenaImg,
  11: mbilaImg,
  12: khwesaImg,
  13: ronnieImg,
};

/** API sometimes stores dev-only paths like `/src/assets/...` that 404 in the browser. */
function isBrokenDevImageUrl(url: string): boolean {
  const u = url.toLowerCase();
  return (
    u.includes("/src/") ||
    u.includes("src/assets") ||
    u.includes("/src/assets/")
  );
}

/**
 * Prefer a real remote URL; ignore broken `src/...` paths; fall back to bundled map by id.
 */
export function getParticipantImageSrc(
  participant: Participant,
): string | undefined {
  const raw = participant.image_url?.trim();
  const local = participantImages[participant.id];

  if (!raw) return local;
  if (isBrokenDevImageUrl(raw)) return local;

  return raw;
}
