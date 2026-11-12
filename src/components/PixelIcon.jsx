// Hand-drawn pixel icons. Each icon is a grid of palette letters ('.' = transparent).
const PAL = {
  K: '#4a1236', // outline
  P: '#ff69b4', // pink
  L: '#ffc4e1', // light pink
  W: '#ffffff',
  Y: '#ffd84d',
  O: '#c98a00',
  G: '#c9b8c4',
  D: '#8a7083',
  B: '#9fc8ff',
  V: '#b48cff',
  R: '#ff4d6d'
};

const ICONS = {
  heart: [
    '.KK.KK.',
    'KPPKPPK',
    'KPWPPPK',
    'KPPPPPK',
    '.KPPPK.',
    '..KPK..',
    '...K...'
  ],
  star: [
    '....K....',
    '...KYK...',
    'KKKKYKKKK',
    'KYYYYYYYK',
    '.KYYWYYK.',
    '..KYYYK..',
    '.KYYKYYK.',
    '.KYK.KYK.',
    'KK.....KK'
  ],
  folder: [
    'KKKK........',
    'KYYYK.......',
    'KKKKKKKKKKKK',
    'KYWWWWWWWWYK',
    'KYYYYYYYYYYK',
    'KYYYYYYYYYYK',
    'KYYYYYYYYYYK',
    'KOYYYYYYYYOK',
    'KOOOOOOOOOOK',
    'KKKKKKKKKKKK'
  ],
  doc: [
    'KKKKKK....',
    'KWWWWKK...',
    'KWWWWKWK..',
    'KWWWWKKKK.',
    'KWWWWWWWK.',
    'KWPPPPPWK.',
    'KWWWWWWWK.',
    'KWGGGGGWK.',
    'KWWWWWWWK.',
    'KWGGGGWWK.',
    'KWWWWWWWK.',
    'KKKKKKKKK.'
  ],
  mail: [
    'KKKKKKKKKKKK',
    'KKWWWWWWWWKK',
    'KWKWWWWWWKWK',
    'KWWKWWWWKWWK',
    'KWWWKPPKWWWK',
    'KWWWWKKWWWWK',
    'KWWWWWWWWWWK',
    'KKKKKKKKKKKK'
  ],
  computer: [
    'KKKKKKKKKKK.',
    'KGGGGGGGGGK.',
    'KGPPPPPPPGK.',
    'KGPLLPPPPGK.',
    'KGPLPPPPPGK.',
    'KGPPPPPPPGK.',
    'KGGGGGGGGGK.',
    'KKKKKKKKKKK.',
    '....KGK.....',
    '..KKKKKKK...',
    '.KGGGGGGGK..',
    '.KKKKKKKKK..'
  ],
  trophy: [
    'KKKKKKKKKK',
    'KYYWYYYYYK',
    'KYYWYYYYYK',
    '.KYYYYYYK.',
    '..KYYYYK..',
    '...KYYK...',
    '....KK....',
    '....KK....',
    '..KKKKKK..',
    '..KOOOOK..',
    '..KKKKKK..'
  ],
  smiley: [
    '..KKKKK..',
    '.KYYYYYK.',
    'KYYKYKYYK',
    'KYYKYKYYK',
    'KYYYYYYYK',
    'KYKYYYKYK',
    'KYYKKKYYK',
    '.KYYYYYK.',
    '..KKKKK..'
  ],
  note: [
    '....KKKKK',
    '....KPPPK',
    '....KKKKK',
    '....K...K',
    '....K...K',
    '.KKKK.KKK',
    'KPPPKKPPK',
    'KPPPKKPPK',
    '.KKK..KK.'
  ],
  bubble: [
    '.KKKKKKKKK.',
    'KWWWWWWWWWK',
    'KWPWWPWWPWK',
    'KWWWWWWWWWK',
    'KWVVVVVVWWK',
    'KWWWWWWWWWK',
    '.KKKWKKKKK.',
    '...KWK.....',
    '...KK......'
  ],
  gear: [
    '..K.K.K..',
    '.KKKKKKK.',
    'KKGGGGGKK',
    '.KGGKGGK.',
    'KKGK.KGKK',
    '.KGGKGGK.',
    'KKGGGGGKK',
    '.KKKKKKK.',
    '..K.K.K..'
  ],
  chart: [
    'K.........',
    'K.......PP',
    'K.......PP',
    'K....VV.PP',
    'K....VV.PP',
    'K.BB.VV.PP',
    'K.BB.VV.PP',
    'KKKKKKKKKK'
  ],
  lock: [
    '..KKKKK..',
    '.K.....K.',
    '.K.....K.',
    'KKKKKKKKK',
    'KYYYYYYYK',
    'KYYYKYYYK',
    'KYYYKYYYK',
    'KYYYYYYYK',
    'KKKKKKKKK'
  ],
  phone: [
    '.KKKKK.',
    'KPPPPPK',
    'KPLLLPK',
    'KPLLLPK',
    'KPPPPPK',
    'KKKKKKK',
    'KPWPWPK',
    'KPPPPPK',
    'KPWPWPK',
    'KPPPPPK',
    '.KKKKK.'
  ],
  home: [
    '.....K.....',
    '....KPK....',
    '...KPPPK...',
    '..KPPPPPK..',
    '.KPPPPPPPK.',
    'KKKKKKKKKKK',
    '.KWWWWWWWK.',
    '.KWKKWWBBK.',
    '.KWKKWWBBK.',
    '.KKKKKKKKK.'
  ],
  user: [
    '...KKK...',
    '..KLLLK..',
    '..KLLLK..',
    '...KKK...',
    '..KPPPK..',
    '.KPPPPPK.',
    'KPPPPPPPK',
    'KKKKKKKKK'
  ],
  bin: [
    '.KKKKKKK.',
    'KGGGGGGGK',
    '.KKKKKKK.',
    '.KWGWGWK.',
    '.KWGWGWK.',
    '.KWGWGWK.',
    '.KWGWGWK.',
    '..KKKKK..'
  ],
  globe: [
    '..KKKKK..',
    '.KBBVBBK.',
    'KBVVVBBBK',
    'KBBVVVBBK',
    'KBBBVBBBK',
    'KBBBBVVBK',
    'KBBBBVBBK',
    '.KBBBBBK.',
    '..KKKKK..'
  ],
  hand: [
    '...KK.....',
    '..KWWK....',
    '..KWWK....',
    '..KWWKKK..',
    '..KWWKWWKK',
    'KKKWWWWWWK',
    'KWKWWWWWWK',
    'KWWWWWWWWK',
    '.KWWWWWWK.',
    '..KKKKKK..'
  ],
  sparkle: [
    '...K...',
    '...K...',
    '..KWK..',
    'KKWWWKK',
    '..KWK..',
    '...K...',
    '...K...'
  ]
};

export default function PixelIcon({ name, px = 2, className = '', title }) {
  const grid = ICONS[name] || ICONS.doc;
  const h = grid.length;
  const w = Math.max(...grid.map(r => r.length));
  const rects = [];
  grid.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (c !== '.' && PAL[c]) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={PAL[c]} />);
    })
  );
  return (
    <svg
      className={`px-icon ${className}`}
      viewBox={`0 0 ${w} ${h}`}
      width={w * px}
      height={h * px}
      shapeRendering="crispEdges"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {rects}
    </svg>
  );
}

export const catIcon = { ml: 'computer', llm: 'bubble', systems: 'gear', data: 'chart', web3: 'lock', apps: 'phone' };
