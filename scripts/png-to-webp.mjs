import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const SRC = process.argv[2];
const DEST = process.argv[3];
const QUALITY = Number(process.argv[4] || "0.9");
if (!SRC || !DEST) {
  console.error("usage: node png-to-webp.mjs <src.png> <dest.webp> [quality]");
  process.exit(1);
}

const dataUrl =
  "data:image/png;base64," + fs.readFileSync(path.resolve(SRC)).toString("base64");

const browser = await chromium.launch();
const page = await browser.newPage();
const webpB64 = await page.evaluate(
  async ({ dataUrl, quality }) => {
    const img = new Image();
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = rej;
      img.src = dataUrl;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d").drawImage(img, 0, 0);
    return canvas.toDataURL("image/webp", quality).split(",")[1];
  },
  { dataUrl, quality: QUALITY }
);
await browser.close();

fs.writeFileSync(path.resolve(DEST), Buffer.from(webpB64, "base64"));
const kb = (fs.statSync(path.resolve(DEST)).size / 1024).toFixed(1);
console.log(`wrote ${DEST} (${kb} KB)`);
