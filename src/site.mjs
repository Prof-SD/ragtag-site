import {readFileSync} from 'node:fs';
export const config = JSON.parse(readFileSync(new URL('../site.config.json',import.meta.url),'utf8'));
export const e = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const assetSizes = JSON.parse(readFileSync(new URL('./assets.json',import.meta.url),'utf8'));
export const artwork = new Map();
export function heading(id, lines, {level=2,light=false,cls=''}={}) {
  artwork.set(id,{lines,light});
  return `<h${level} class="art-heading ${cls}"><img src="/assets/type-${id}.svg" alt="${e(lines.join(' '))}" width="${Math.max(...lines.map(l=>[...l].reduce((n,c)=>n+(c===' '?30:".,'!".includes(c)?27:59),0)))+24}" height="${lines.length*87+8}" loading="${level===1?'eager':'lazy'}"></h${level}>`;
}
export const img = (name,alt,cls='',eager=false)=>`<img src="/assets/${name}.webp" alt="${e(alt)}" class="${cls}" width="${assetSizes[name].width}" height="${assetSizes[name].height}" loading="${eager?'eager':'lazy'}" decoding="async">`;
export const button=(text,href,cls='')=>`<a class="button ${cls}" href="${e(href)}">${e(text)}</a>`;
export const faq = (q,a)=>`<details class="faq"><summary>${e(q)}<span aria-hidden="true">+</span></summary><div>${a}</div></details>`;
const available=config.launchStatus==='available' && config.appStoreUrl;
export const availability=available?'Available for iPhone & iPad':'Coming soon to iPhone & iPad';
export const download = ()=>available?button('Download on the App Store',config.appStoreUrl,'button-gold'):button('Explore the adventures','/#adventures','button-gold');
export function contactLink(label='Email the Ragtag team') {
  return config.supportEmail?`<a href="mailto:${e(config.supportEmail)}">${e(label)}</a>`:'<span>Our public contact details will be added before release.</span>';
}
export function layout({title,description,path='/',body,cls=''}) {
  const url=config.siteUrl?config.siteUrl.replace(/\/$/,'')+path:'';
  const nav=[['The adventure','/#adventures','Explore'],['A little kindness','/#kindness','Kindness'],['For grown-ups','/grown-ups','Grown-ups'],['Support','/support','Support']];
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(title)} | Ragtag</title><meta name="description" content="${e(description)}"><meta name="theme-color" content="#173f43"><meta name="color-scheme" content="light">${url?`<link rel="canonical" href="${e(url)}">`:''}<meta property="og:type" content="website"><meta property="og:site_name" content="Ragtag"><meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}">${url?`<meta property="og:url" content="${e(url)}"><meta property="og:image" content="${e(config.siteUrl.replace(/\/$/,'')+'/assets/social.jpg')}">`:''}<meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/png" href="/assets/favicon.png"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png"><link rel="preload" href="/fonts/nunito-variable.ttf" as="font" type="font/ttf" crossorigin><link rel="stylesheet" href="/styles.css"><script type="module" src="/site.js"></script>${!config.contentReviewed||path==='/404'?'<meta name="robots" content="noindex, nofollow">':''}</head><body class="${cls}">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header"><div class="nav-wrap"><a class="brand" href="/" aria-label="Ragtag home">${img('logo','Ragtag','',true)}</a><nav aria-label="Main navigation">${nav.map(([label,href,short])=>`<a href="${href}" ${path===href?'aria-current="page"':''}><span class="nav-long">${label}</span><span class="nav-short">${short}</span></a>`).join('')}</nav><a class="header-note" href="/#get-ragtag">${available?'Get Ragtag':'Coming soon'}</a></div></header>
  <main id="main" tabindex="-1">${body}</main>
  <footer class="site-footer"><div class="footer-top"><div><a href="/" aria-label="Ragtag home">${img('logo','Ragtag','footer-logo')}</a><p>Small stitches. Kind adventures.</p></div><nav aria-label="Footer navigation"><a href="/grown-ups">For grown-ups</a><a href="/support">Support</a><a href="/privacy">Privacy policy</a><a href="/grown-ups#accessibility">Ways to play</a></nav><div class="footer-note"><strong>${availability}</strong><p>Designed for ages 6–9.<br>Kindness has no age limit.</p></div></div><div class="footer-bottom"><span>© ${new Date().getUTCFullYear()} ${e(config.publisherName||'Ragtag')}. All rights reserved.</span><span>${config.contentReviewed?'':'Pre-release website · '}Apple and App Store are trademarks of Apple Inc.</span></div></footer>
  </body></html>`;
}
