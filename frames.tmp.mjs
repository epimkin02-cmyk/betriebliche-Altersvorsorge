import { chromium } from "playwright"; import fs from "fs"; import sharp from "sharp";
const SC = process.argv[2];
const b = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
for (const name of ["seedance", "kling"]) {
  const p = await b.newPage({ viewport: { width: 1280, height: 560 } });
  const data = fs.readFileSync(`${SC}/vid-${name}.mp4`).toString("base64");
  await p.setContent(`<body style="margin:0;background:#000"><video id="v" src="data:video/mp4;base64,${data}" muted playsinline style="width:1280px;height:560px;object-fit:cover"></video></body>`);
  const meta = await p.evaluate(() => new Promise(r => { const v = document.getElementById("v"); v.addEventListener("loadedmetadata", () => r({ d: v.duration, w: v.videoWidth, h: v.videoHeight })); v.load(); }));
  console.log(name, JSON.stringify(meta));
  const tiles = [];
  for (const [i, t] of [0.05, meta.d / 2, meta.d - 0.08].entries()) {
    await p.evaluate(t => new Promise(r => { const v = document.getElementById("v"); v.currentTime = t; v.addEventListener("seeked", () => r(), { once: true }); }), t);
    await p.waitForTimeout(150);
    const buf = await p.screenshot({ type: "png" });
    tiles.push({ input: await sharp(buf).resize({ width: 640 }).png().toBuffer(), left: 0, top: i * 290 });
  }
  await sharp({ create: { width: 640, height: 870, channels: 3, background: "#000" } }).composite(tiles).png().toFile(`${SC}/frames-${name}.png`);
}
await b.close();
