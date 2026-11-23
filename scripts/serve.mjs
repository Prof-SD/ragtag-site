import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const settings=JSON.parse(await readFile(new URL('../vercel.json',import.meta.url),'utf8'));
const args=process.argv.slice(2),portArg=args.indexOf('--port');
const port=Number(portArg>=0?args[portArg+1]:process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.ttf':'font/ttf','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
const security=Object.fromEntries(settings.headers[0].headers.map(({key,value})=>[key,value.replace('; upgrade-insecure-requests','')]));
const server=http.createServer(async(req,res)=>{
  try{
    let urlPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(urlPath.includes('\0'))throw Error('Bad path');
    if(urlPath!=='/'&&urlPath.endsWith('/')){res.writeHead(308,{Location:urlPath.slice(0,-1)});res.end();return;}
    if(urlPath.endsWith('.html')&&urlPath!=='/404.html'){res.writeHead(308,{Location:urlPath==='/index.html'?'/':urlPath.slice(0,-5)});res.end();return;}
    const relative=urlPath==='/'?'index.html':urlPath.slice(1)+(path.extname(urlPath)?'':'.html');
    let target=path.resolve(root,relative),status=200;
    if(!target.startsWith(root))throw Error('Bad path');
    try{if(!(await stat(target)).isFile())throw Error('Not a file');}catch{target=path.join(root,'404.html');status=404;}
    const body=await readFile(target);res.writeHead(status,{...security,'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store','Content-Length':body.length});res.end(req.method==='HEAD'?undefined:body);
  }catch{res.writeHead(400,{'Content-Type':'text/plain'});res.end('Bad request');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
