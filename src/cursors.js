// Classic pixel-art mouse cursors (arrow, link hand, hourglass), drawn from bitmaps
// at 2x and exposed as CSS custom properties: --cur-arrow, --cur-hand, --cur-wait.
const ARROW = [
  'B..........',
  'BB.........',
  'BWB........',
  'BWWB.......',
  'BWWWB......',
  'BWWWWB.....',
  'BWWWWWB....',
  'BWWWWWWB...',
  'BWWWWWWWB..',
  'BWWWWWWWWB.',
  'BWWWWWBBBBB',
  'BWWBWWB....',
  'BWB.BWWB...',
  'BB..BWWB...',
  'B....BWWB..',
  '.....BWWB..',
  '......BB...'
];
const HAND = [
  '.....BB.........',
  '....BWWB........',
  '....BWWB........',
  '....BWWB........',
  '....BWWBBB......',
  '....BWWBWWBBB...',
  '....BWWBWWBWWBB.',
  '.BB.BWWBWWBWWBWB',
  'BWWBBWWWWWWWWBWB',
  'BWWWBWWWWWWWWWWB',
  '.BWWWWWWWWWWWWWB',
  '..BWWWWWWWWWWWWB',
  '..BWWWWWWWWWWWB.',
  '...BWWWWWWWWWWB.',
  '...BWWWWWWWWWB..',
  '....BWWWWWWWWB..',
  '....BWWWWWWWWB..',
  '....BBBBBBBBBB..'
];
const WAIT = [
  'BBBBBBBBBBB',
  'BWWWWWWWWWB',
  '.BWPPPPPWB.',
  '.BWWPPPWWB.',
  '..BWWPWWB..',
  '...BWPWB...',
  '...BWPWB...',
  '..BWWWWWB..',
  '.BWWWPWWWB.',
  '.BWWPPPWWB.',
  'BWPPPPPPPWB',
  'BBBBBBBBBBB'
];
const COLORS = { B: '#000', W: '#fff', P: '#ff69b4' };

function toUrl(bitmap, scale = 2) {
  const w = bitmap[0].length, h = bitmap.length;
  let rects = '';
  bitmap.forEach((row, y) => [...row].forEach((c, x) => {
    if (COLORS[c]) rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${COLORS[c]}"/>`;
  }));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w * scale}" height="${h * scale}" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">${rects}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const root = document.documentElement.style;
root.setProperty('--cur-arrow', `${toUrl(ARROW)} 1 1, auto`);
root.setProperty('--cur-hand', `${toUrl(HAND)} 11 1, pointer`);
root.setProperty('--cur-wait', `${toUrl(WAIT)} 11 12, wait`);
