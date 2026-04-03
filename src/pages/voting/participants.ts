import type { Participant } from "@/lib/types/voting";

import arnoldImg from "@/assets/voting/arnold.jpeg";
import derrickImg from "@/assets/voting/derrick.jpeg";
import janImg from "@/assets/voting/jan.jpeg";
import samuelImg from "@/assets/voting/samuel.jpeg";

export const participantImages: Record<number, string> = {
  3: derrickImg,
  4: arnoldImg,
  5: janImg,
  6: samuelImg,
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
