import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const URL = process.env.HERO_URL || "http://localhost:8081/";
const OUT = path.resolve("scripts/hero-snaps");
fs.mkdirSync(OUT, { recursive: true });

// Capture at a wide, retina-ish resolution so the gradient is crisp when used
// as a full-bleed background. Width 2560 covers most desktops; the shader is
// resolution-independent so we can scale it down in CSS.
const VIEWPORT = { width: 2560, height: 1440 };

const browser = await chromium.launch({
  args: [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--ignore-gpu-blocklist",
  ],
});
const page = await browser.newPage({
  viewport: VIEWPORT,
  deviceScaleFactor: 1,
});

await page.goto(URL, { waitUntil: "networkidle" });

// Wait for the shader canvas to exist and have painted at least once.
await page.waitForSelector("canvas", { timeout: 15000 });
await page.waitForTimeout(1500);

// Hide everything that sits ON TOP of the gradient so we capture the raw
// background only: the nav/header, the hero text+CTA layer (z-10), and the
// bottom white fade. We keep the white veil overlay since that's part of the
// look we want baked into the image.
const heroBox = await page.evaluate(() => {
  // The real hero is the *innermost* <section> that carries the WebGL canvas
  // and has the bg-background utility class (an outer wrapper <section> also
  // contains the canvas but spans the whole page).
  const section = [...document.querySelectorAll("section")].find(
    (s) =>
      s.querySelector("canvas") &&
      s.className.includes("bg-background") &&
      s.getBoundingClientRect().height > 100
  );
  if (!section) return null;
  // header / nav
  document.querySelectorAll("header, nav").forEach((el) => {
    el.style.visibility = "hidden";
  });
  // The text/CTA layer is the z-10 content div inside the hero. Hide every
  // direct child that is NOT the absolute-positioned background wrapper.
  [...section.children].forEach((child) => {
    if (!child.className.includes("absolute")) {
      child.style.visibility = "hidden";
    }
  });
  // the bottom white fade (z-[5]) inside the background wrapper
  section.querySelectorAll("div[class*='to-white']").forEach((el) => {
    el.style.display = "none";
  });
  const r = section.getBoundingClientRect();
  return { x: r.x, y: r.y, width: r.width, height: r.height };
});

if (!heroBox) {
  console.error("hero <section> not found");
  await browser.close();
  process.exit(1);
}

// Clip to the hero section's box so the saved image is exactly the gradient
// area at full viewport width — ready to drop in as a background.
const clip = {
  x: Math.max(0, heroBox.x),
  y: Math.max(0, heroBox.y),
  width: Math.min(VIEWPORT.width, heroBox.width),
  height: Math.min(VIEWPORT.height, heroBox.height),
};

// Capture several frames spread across the animation loop so we can pick the
// nicest composition (the mesh drifts, so framing differs frame to frame).
const FRAMES = 8;
const GAP_MS = 850;
for (let i = 0; i < FRAMES; i++) {
  await page.screenshot({
    path: path.join(OUT, `hero-frame-${i + 1}.png`),
    clip,
  });
  console.log(`captured frame ${i + 1}/${FRAMES}`);
  if (i < FRAMES - 1) await page.waitForTimeout(GAP_MS);
}

await browser.close();
console.log("done ->", OUT);
