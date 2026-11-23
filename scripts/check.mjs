import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const dist=path.join(root,'dist');
const config=JSON.parse(await readFile(path.join(root,'site.config.json'),'utf8'));
const routeFile = route => path.join(dist,route==='/'?'index.html':route.replace(/^\//,'')+(path.extname(route)?'':'.html'));
const pages=new Map();let links=0,assets=0;
for(const file of (await readdir(dist)).filter(f=>f.endsWith('.html'))){
 const html=await readFile(path.join(dist,file),'utf8');
 pages.set(file,{html,ids:[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1])});
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`${file}: exactly one h1`);
 assert(html.includes('lang="en"'),`${file}: page language`);
 assert(html.includes('name="viewport"'),`${file}: responsive viewport`);
 assert(html.includes('name="description"'),`${file}: metadata`);
 assert(!/<script[^>]+src="https?:/i.test(html),`${file}: no third-party JS`);
 assert(!/<form\b/i.test(html),`${file}: no accidental collection forms`);
 assert(!/mailto:(?:undefined|null|.*example\.)/.test(html),`${file}: no fake mailboxes`);
 assert(!/\b(?:undefined|NaN)\b/.test(html),`${file}: no template errors`);
 const ids=pages.get(file).ids;assert.equal(new Set(ids).size,ids.length,`${file}: unique IDs`);
 for(const match of html.matchAll(/<img\b[^>]*>/g))assert(/\balt="[^"]*"/.test(match[0]),`${file}: image alt text`);
}
for(const [file,{html}] of pages){
 for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const value=m[1].replaceAll('&amp;','&');if(/^(https?:|mailto:)/.test(value))continue;
  const target=new URL(value,'https://test.invalid/'+(file==='index.html'?'':file.replace('.html','')));
  const targetFile=routeFile(target.pathname);
  assert((await stat(targetFile)).isFile(),`${file}: missing ${value}`);assets++;
  if(target.hash){const dest=pages.get(path.basename(targetFile));assert(dest?.ids.includes(decodeURIComponent(target.hash.slice(1))),`${file}: missing anchor ${value}`);}links++;
 }
}
const css=await readFile(path.join(dist,'styles.css'),'utf8');
for(const m of css.matchAll(/url\(['"]?(\/[^)'"\s]+)/g))assert((await stat(path.join(dist,m[1]))).isFile(),'CSS asset '+m[1]);
const js=await readFile(path.join(dist,'site.js'),'utf8');
assert(!/localStorage|sessionStorage|document\.cookie|fetch\(/.test(js),'No browser tracking or storage');
const privacy=pages.get('privacy.html').html;
assert(privacy.includes('Vercel')&&privacy.includes('support messages'),'Privacy covers website hosting and support');
assert(privacy.includes('Apple')&&privacy.includes('locally'),'Privacy covers Apple commerce and local saves');
assert(pages.get('support.html').html.includes('Toss'),'Support reflects current controls');
assert(!pages.get('support.html').html.includes('tap Help'),'No obsolete action button');
assert(pages.get('index.html').html.includes('24 more main adventures'),'Accurate paid offer');
assert(pages.get('index.html').html.includes('Seven extra Toybox Trails'),'Accurate bonus offer');
const vercel=JSON.parse(await readFile(path.join(root,'vercel.json'),'utf8'));
assert.equal(vercel.outputDirectory,'dist');assert.equal(vercel.framework,null);assert.equal(vercel.cleanUrls,true);
if(!config.contentReviewed){
 for(const [file,{html}] of pages)assert(html.includes('noindex, nofollow'),`${file}: preview must not be indexed`);
 assert((await readFile(path.join(dist,'robots.txt'),'utf8')).includes('Disallow: /'));
}
console.log(`PASS: ${pages.size} pages, ${links} local links/anchors/assets, CSS resources, privacy coverage, honest purchase copy, current controls, metadata and Vercel configuration.`);
if(process.argv.includes('--release')){
 const missing=[];
 if(!config.publisherName)missing.push('publisherName');
 if(!config.supportEmail)missing.push('supportEmail');
 if(!config.siteUrl)missing.push('siteUrl');
 if(!config.contentReviewed)missing.push('contentReviewed (confirm policy, retention and product copy)');
 if(config.launchStatus==='available'&&!config.appStoreUrl)missing.push('appStoreUrl');
 if(missing.length){console.error('Public-release details still needed: '+missing.join(', '));process.exitCode=1;}
 else console.log('PASS: Public website configuration is complete.');
}
