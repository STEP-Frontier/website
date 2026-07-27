import sharp from "sharp";

const width = 1200;
const height = 630;

const overlay = Buffer.from(`
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#020617" stop-opacity="0.92"/>
        <stop offset="50%" stop-color="#020617" stop-opacity="0.64"/>
        <stop offset="100%" stop-color="#020617" stop-opacity="0.12"/>
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#60a5fa"/>
        <stop offset="100%" stop-color="#c084fc"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#shade)"/>
    <rect x="64" y="248" width="78" height="5" rx="2.5" fill="url(#accent)"/>
    <text x="64" y="326" fill="#ffffff"
      font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700"
      letter-spacing="5">SPACE TECHNOLOGY</text>
    <text x="64" y="416" fill="#ffffff"
      font-family="Arial, Helvetica, sans-serif" font-size="88" font-weight="800"
      letter-spacing="3">PROJECT</text>
    <text x="67" y="472" fill="#cbd5e1"
      font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="500"
      letter-spacing="6">UNIVERSITY OF TSUKUBA</text>
    <text x="1136" y="574" fill="#e2e8f0" text-anchor="end"
      font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="600"
      letter-spacing="3">STEP</text>
  </svg>
`);

const logo = await sharp("src/assets/logo.png")
  .resize({ width: 280 })
  .png()
  .toBuffer();

await sharp("src/assets/hero.jpg")
  .resize(width, height, { fit: "cover", position: "centre" })
  .composite([
    { input: overlay, top: 0, left: 0 },
    { input: logo, top: 60, left: 64 },
  ])
  .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
  .toFile("public/ogp.jpg");
