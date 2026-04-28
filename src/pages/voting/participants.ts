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
import shellaImg from "@/assets/voting/sf/sf-sheila-9.8.jpeg"
import bobImg from "@/assets/voting/sf/sf-bob-7.1.jpeg"
import daleonImg from "@/assets/voting/sf/sf-deleaon-9.3.jpeg"
import dianaImg from "@/assets/voting/sf/sf-diana-6.8.jpeg"
import eugeneImg from "@/assets/voting/sf/sf-eugene-7.8.jpeg"
import festusImg from "@/assets/voting/sf/sf-festus-6.9.jpeg"
import georgeImg from "@/assets/voting/sf/sf-george-6.7.jpeg"
import jeansonImg from "@/assets/voting/sf/sf-jeanson-8.3.jpeg"
import maureenImg from "@/assets/voting/sf/sf-maureen-8.1.jpeg"
import naomiImg from "@/assets/voting/sf/sf-naomi-8.5.jpeg"
import nickImg from "@/assets/voting/sf/sf-nick-7.1.jpeg"
import ooroImg from "@/assets/voting/sf/sf-ooro-7.4.jpeg"
import yvetteImg from "@/assets/voting/sf/sf-yvette-8.0.jpeg"

import impactImg from "@/assets/voting/Impact-potw.jpeg";
import sfMenImg from "@/assets/voting/sf/sf-men.jpeg"
import sfWomenImg from "@/assets/voting/sf/sf-women.jpeg"

export const causesImages: Record<number, string> = {
  5: impactImg,
  6: sfWomenImg,
  7: sfMenImg,
};

export const participantImages: Record<number, string> = {
  26: georgeImg,
  25: festusImg,
  24: nickImg,
  23: bobImg,
  22: ooroImg,
  21: eugeneImg,
  20: jeansonImg,
  19: dianaImg,
  18: yvetteImg,
  17: maureenImg,
  16: naomiImg,
  15: daleonImg,
  14: shellaImg,
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
