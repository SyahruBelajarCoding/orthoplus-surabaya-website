// Builds index.html from page.html by inlining the "teeth into order" diagrams.
// Run: node build.mjs
import { readFileSync, writeFileSync } from "node:fs";

let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

const S = 14; // size of one plus
const plus = (x, y, fill, rot = 0, cls = "") =>
  `<use href="#p" x="${(x - S / 2).toFixed(1)}" y="${(y - S / 2).toFixed(1)}" width="${S}" height="${S}" fill="${fill}"` +
  (rot ? ` transform="rotate(${rot.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"` : "") +
  (cls ? ` class="${cls}"` : "") + "/>";

const defs = `<defs><symbol id="p" viewBox="0 0 3 3"><path d="M1 0h1v1h1v1H2v1H1V2H0V1h1z"/></symbol></defs>`;
const PALE = ["#c4cbc3", "#a2aca3"];

// Horizontal: scatter (0-400) -> ribbon 3 high (400-800) -> ordered rows (800-1200)
function horizontal() {
  const W = 1200, H = 270, out = [];
  for (let i = 0; i < 48; i++)
    out.push(plus(20 + rnd() * 360, 20 + rnd() * (H - 40), PALE[i % 2], rnd() * 70 - 35, "d1"));
  for (let c = 0; c < 16; c++)
    for (let r = 0; r < 3; r++) {
      const t = c / 15, spread = 16 + 6 * Math.abs(t - 0.5) * 2;
      out.push(plus(420 + c * 23.5, H / 2 + (r - 1) * spread, "#0b0c0e", 0, "d2"));
    }
  for (let c = 0; c < 8; c++)
    for (let r = 0; r < 6; r++)
      out.push(plus(830 + c * 46, 30 + r * 42, "#2b6a4a", 0, "d3"));
  return `<svg class="diagram diagram-h" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gigi yang berantakan dirapikan oleh kawat lalu tersusun teratur">${defs}${out.join("")}</svg>`;
}

// Vertical (phone): scatter top -> ribbon middle -> rows bottom
function vertical() {
  seed = 11;
  const W = 300, H = 400, out = [];
  for (let i = 0; i < 30; i++)
    out.push(plus(16 + rnd() * (W - 32), 14 + rnd() * 110, PALE[i % 2], rnd() * 70 - 35, "d1"));
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 12; c++)
      out.push(plus(20 + c * 23.6, 168 + r * 17, "#0b0c0e", 0, "d2"));
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 7; c++)
      out.push(plus(24 + c * 42, 262 + r * 36, "#2b6a4a", 0, "d3"));
  return `<svg class="diagram diagram-v" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gigi yang berantakan dirapikan oleh kawat lalu tersusun teratur">${defs}${out.join("")}</svg>`;
}

const src = readFileSync(new URL("./page.html", import.meta.url), "utf8");
writeFileSync(
  new URL("./index.html", import.meta.url),
  src.replace("<!--DIAGRAM-->", horizontal() + vertical())
);
console.log("index.html written");
