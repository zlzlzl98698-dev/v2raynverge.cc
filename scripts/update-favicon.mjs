import fs from 'node:fs';

const pngBuf = fs.readFileSync('public/images/logo.png');
const base64 = pngBuf.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" width="64" height="64">
  <image width="64" height="64" href="data:image/png;base64,${base64}"/>
</svg>
`;

fs.writeFileSync('public/favicon.svg', svg);
fs.writeFileSync('dist/favicon.svg', svg);
fs.writeFileSync('public/favicon.ico', pngBuf);
fs.writeFileSync('dist/favicon.ico', pngBuf);
console.log('Favicon SVG and ICO updated with new v2rayN logo!');
