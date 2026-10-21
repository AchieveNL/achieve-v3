const fs=require('fs'),path=require('path');
const dir=process.argv[2], out=process.argv[3];
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.dc.html'))){
  const s=fs.readFileSync(path.join(dir,f),'utf8');
  const i=s.indexOf('this._i18n = {'); if(i<0) continue;
  const j=i+'this._i18n = '.length; const end=s.indexOf('\n}; }',j);
  const obj=eval('('+s.slice(j,end+2)+')');
  const page=f.replace('.dc.html','');
  for(const [L,v] of Object.entries(obj)){
    const d=path.join(out,L.toLowerCase()); fs.mkdirSync(d,{recursive:true});
    fs.writeFileSync(path.join(d,page+'.json'),JSON.stringify({D:v.D||{},A:v.A||{},P:(v.P||[]).map(([re,rep])=>[re.source,re.flags,rep])}));
  }
  console.log(page, Object.keys(obj.EN.D).length);
}
