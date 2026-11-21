import { Buffer } from "buffer";

export function randomHex() {
  const bytes = window.crypto.getRandomValues(new Uint8Array(32));
  return Buffer.from(bytes).toString("hex");
}
