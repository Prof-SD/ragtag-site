// Hand-authored stroke paths from the game's original artwork system. No font is used.
export const letters = {
 A:'M2 54 19 3Q21-1 23 4L40 54M9 36H33', B:'M3 54V3H19C44 3 43 27 20 27H4M20 27C48 27 46 54 20 54H3',
 C:'M38 8C4-10-7 27 7 47Q20 63 39 48', D:'M3 54V3H15C48 3 49 54 15 54Z', E:'M38 3H3V54H39M4 27H31', F:'M3 54V3H39M4 27H30',
 G:'M38 8C6-9-8 27 8 47Q23 62 39 47V29H25', H:'M3 3V54M38 3V54M4 28H37', I:'M7 3H34M21 4V53M7 54H34',
 J:'M9 3H38V40C38 60 6 62 3 44', K:'M3 3V54M37 3 4 30M17 23 39 54', L:'M3 3V54H39', M:'M2 54V3L21 31 40 3V54',
 N:'M3 54V3L38 54V3', O:'M21 2C-6 2-6 55 21 55S48 2 21 2Z', P:'M3 54V3H21C47 3 46 30 21 30H4',
 Q:'M21 2C-6 2-6 54 21 54S48 2 21 2ZM26 41 42 57', R:'M3 54V3H20C46 3 47 29 20 29H4M21 30 40 54',
 S:'M37 8C14-10-12 16 15 26L26 30C54 40 26 68 3 48', T:'M1 3H41M21 4V54', U:'M3 3V36C3 62 38 62 38 36V3',
 V:'M2 3 20 54Q21 57 23 52L40 3', W:'M0 3 8 54 21 27 34 54 43 3', X:'M3 3 39 54M38 3 3 54',
 Y:'M2 3 21 29 40 3M21 29V54', Z:'M3 3H39L3 54H40', '!':'M20 3V35M20 52V53', '.':'M20 52V53',
 '?':'M4 11C7-7 38-1 38 15S20 25 20 36M20 52V53', "'":'M20 1 16 11', ',':'M21 49 16 58', '-':'M8 29H32',
 '&':'M39 54 9 24C-7 5 25-10 28 10S-6 29 4 47C15 65 37 52 40 30'
};
const advance = c => c === ' ' ? 30 : ".,'!".includes(c) ? 27 : 59;
export function lettering(rows, light = false) {
  const widths = rows.map(r=>[...r.toUpperCase()].reduce((n,c)=>n+advance(c),0));
  const width = Math.max(...widths)+24, height=rows.length*87+8;
  let paths='';
  rows.forEach((row,y)=>{ let x=12;
    [...row.toUpperCase()].forEach((c,i)=>{
      if (c !== ' ') {
        if(!letters[c]) throw Error('Missing artwork letter '+c);
        const d=letters[c];
        paths+=`<g transform="translate(${x} ${y*87+16+(i%3-1)*1.4}) rotate(${i%3-1} 20 28)"><path d="${d}" stroke="${light?'#143d42':'#ffefd0'}" stroke-width="21"/><path d="${d}" stroke="${light?'#fff0c6':'#225954'}" stroke-width="16"/><path d="${d}" stroke="${light?'#bc863a':'#e5c990'}" stroke-width="1.2" stroke-dasharray="2.5 5.5"/></g>`;
      } x+=advance(c);
    });
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" fill="none" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}
