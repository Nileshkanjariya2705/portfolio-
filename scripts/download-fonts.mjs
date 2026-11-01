import { mkdir, writeFile } from "node:fs/promises";
await mkdir("public/fonts", { recursive: true });
for (const [family, name] of [
  ["Plus+Jakarta+Sans", "plus-jakarta-sans"],
  ["Inter", "inter"],
]) {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=${family}:wght@400;500;600;700;800&display=swap`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36",
        },
      },
    )
  ).text();
  const blocks = css.split("/* latin */");
  const match = blocks.at(-1).match(/url\((https:[^)]+\.woff2)\)/);
  if (!match) throw new Error(`No font URL for ${family}`);
  const response = await fetch(match[1]);
  if (!response.ok) throw new Error(`Font download failed ${response.status}`);
  await writeFile(
    `public/fonts/${name}.woff2`,
    Buffer.from(await response.arrayBuffer()),
  );
  console.log(`Downloaded ${name} (SIL Open Font License)`);
}
