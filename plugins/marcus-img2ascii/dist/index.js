#!/usr/bin/env node
import { Jimp, intToRGBA } from "jimp";

const DENSITY = "@%#*+=-:. ";

function brightness(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function toAscii(brightness, maxBrightness) {
  const idx = Math.floor((brightness / maxBrightness) * (DENSITY.length - 1));
  return DENSITY[DENSITY.length - 1 - idx];
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("用法: marcus-img2ascii <图片路径> [输出宽度]");
    process.exit(1);
  }

  const imagePath = args[0];
  const outputWidth = parseInt(args[1], 10) || 80;

  let image;
  try {
    image = await Jimp.read(imagePath);
  } catch {
    console.error(`错误: 无法读取图片 — ${imagePath}`);
    process.exit(1);
  }

  const aspectRatio = image.bitmap.height / image.bitmap.width;
  const outputHeight = Math.round(outputWidth * aspectRatio * 0.45);

  image.resize({ w: outputWidth, h: outputHeight });

  let max = 0;
  const pixels = [];
  for (let y = 0; y < outputHeight; y++) {
    const row = [];
    for (let x = 0; x < outputWidth; x++) {
      const rgba = intToRGBA(image.getPixelColor(x, y));
      const v = brightness(rgba.r, rgba.g, rgba.b);
      row.push(v);
      if (v > max) max = v;
    }
    pixels.push(row);
  }

  for (const row of pixels) {
    console.log(row.map((v) => toAscii(v, max)).join(""));
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
