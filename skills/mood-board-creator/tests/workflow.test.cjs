// Tests the actual legacy Workflow graph with observable asynchronous role controls.
// Creative quality and native execution are covered by the separate paired trials.
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=process.env.MOOD_SKILL_ROOT||path.resolve(__dirname,'..');
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
const workflow=name=>new AsyncFunction('args','agent','parallel','phase','log',fs.readFileSync(path.join(root,'workflows',name+'.js'),'utf8').replace('export const meta','const meta'));
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const parallel=jobs=>Promise.all(jobs.map(f=>f()));
const variants=()=>Array.from({length:6},(_,i)=>({id:String(i+1).padStart(2,'0'),name:'Direction '+(i+1),group:['A','B','C'][Math.floor(i/2)]}));
const args=()=>({product:'Controlled fixture',task:'/process',skill:'/skill',scratch:'/scratch',sources:'/requirements',shots:'/shots',screens:[{n:'1',name:'Home'}],flow:'1',variants:variants(),target:{kind:'standalone',out:'/out',roundJson:'/round.json'},maxBuilders:3,onVariantReady:async()=>{}});
const built={summary:'Controlled returned artifact',files:['/fixture/artifact'],final_shots:['/fixture/shot'],known_issues:[]};
const round=(vs,repair)=>({complete:true,screenshots:['/fixture/comparison'],verdicts:vs.map(v=>({id:v.id,verdict:'checked',must_fix:v.id===repair?['Required content is clipped']:[]}))});
async function buildScenario(failed=false){
 let active=0,maximum=0,publishing=0,maxPublishing=0,settled=false;
 const starts=[],after=[],publications=[],returned=new Set();let readyValid=true;const a=args();
 a.onVariantReady=async p=>{readyValid=readyValid&&p.readyIds.includes(p.id)&&p.readyIds.every(id=>returned.has(id));if(settled)after.push('publish:'+p.id);publishing++;maxPublishing=Math.max(maxPublishing,publishing);await delay(3);publications.push(p.id);publishing--;};
 const agent=async(_,o)=>{
  if(settled)after.push(o.label);starts.push(o.label);
  if(o.label.startsWith('build:')||o.label.startsWith('refine:')){
   active++;maximum=Math.max(maximum,active);await delay(failed&&o.label==='build:v01'?5:25);active--;
   if(failed&&o.label==='build:v01')throw Error('controlled writer failure');
   returned.add(o.label.split(':v')[1]);return built;
  }
  if(o.label==='round-critique')return round(a.variants,'02');
  throw Error('Unexpected stage '+o.label);
 };
 let result,error;
 try{result=await workflow('build')(a,agent,parallel,()=>{},()=>{});}catch(e){error=e;}
 settled=true;const activeAtSettlement=active;await delay(80);
 return{result,error,starts,after,publications,activeAtSettlement,maximum,maxPublishing,readyValid};
}
test('successful round limits writers, serializes publication and repairs only the substantive finding',async()=>{
 const r=await buildScenario();assert.ifError(r.error);assert.equal(r.result.length,6);assert.equal(r.maximum,3);assert.equal(r.maxPublishing,1);assert.equal(r.readyValid,true);assert.deepEqual(r.starts.filter(x=>x.startsWith('refine:')),['refine:v02']);assert.deepEqual(r.after,[]);
});
test('failed writer stops queued assignments and joins active work before returning failure',async()=>{
 const r=await buildScenario(true);assert.match(r.error.message,/controlled writer failure/);assert.deepEqual(r.starts,['build:v01','build:v02','build:v03']);assert.equal(r.activeAtSettlement,0);assert.equal(r.readyValid,true);assert.deepEqual(r.after,[]);assert.deepEqual(r.publications.sort(),['02','03']);
});
test('optional preparation failure waits for other owned preparation calls',async()=>{
 const a=args();a.preBuild=[{group:'A',prompt:'a'},{group:'B',prompt:'b'}];a.variants=[{id:'01',name:'One',group:'A'}];let active=0,builders=0;
 await assert.rejects(workflow('build')(a,async(_,o)=>{
  if(!o.label.startsWith('prebuild:')){builders++;return built;}
  active++;await delay(o.label==='prebuild:A'?5:35);active--;if(o.label==='prebuild:A')throw Error('prep failure');return{summary:'done'};
 },parallel,()=>{},()=>{}),/prep failure/);assert.equal(active,0);assert.equal(builders,0);
});
test('conflicting writer assignments refuse before any dispatch',async()=>{
 for(const bad of [['01','01'],['../01','02'],['','02'],[1,'02']]){const a=args();a.variants=bad.map(id=>({id,name:'One',group:'A'}));let calls=0;await assert.rejects(workflow('build')(a,async()=>{calls++;return built;},parallel,()=>{},()=>{}),/distinct numeric/);assert.equal(calls,0);}
 const a=args();a.preBuild=[{group:'A',prompt:'first'},{group:'A',prompt:'second'}];let calls=0;await assert.rejects(workflow('build')(a,async()=>{calls++;return built;},parallel,()=>{},()=>{}),/one preparation owner/);assert.equal(calls,0);
});
test('both preparation modes preserve unique selection and explicit group quotas',async()=>{
 for(const mode of ['normal','thorough'])for(const kind of ['valid','duplicate','quota']){
  const a={...args(),mode,groups:[{key:'A',label:'Ritual',kind:'original',want:2},{key:'B',label:'Materials',kind:'original',want:2},{key:'C',label:'Systems',kind:'original',want:2}]};const selected=variants().map(v=>({vid:v.id,name:v.name,group:v.group,mode:'light'}));if(kind==='duplicate')selected[1].vid=selected[0].vid;if(kind==='quota')selected[0].group='B';const labels=[];
  const promise=workflow('foundations')(a,async(_,o)=>{labels.push(o.label);if(o.label.includes('propose'))return{candidates:[{name:'idea',group:'A',card:'product-specific'}]};if(o.label.includes('select')||o.label==='directions:critic')return{selected,photo_needs:[]};if(o.label.includes('critic'))return{verdict:'sound',findings:[]};return{file:'/note',key_findings:['source'],lenses:['Task hierarchy','Reading rhythm','Product materials']};},parallel,()=>{},()=>{});
  if(kind==='valid'){const r=await promise;assert.equal(r.selection.selected.length,6);assert.equal(labels.length,10);}else await assert.rejects(promise,kind==='duplicate'?/distinct numeric/:/group quotas/);
 }
});
test('round handoff accepts an exact V prefix while rejecting duplicate, missing and unknown reviews',async()=>{
 for(const kind of ['prefixed','duplicate','missing','unknown']){
  const a=args();const review=round(a.variants);review.verdicts.forEach(r=>{r.id='V'+r.id;});
  if(kind==='duplicate')review.verdicts[1].id='01';
  if(kind==='missing')review.verdicts.pop();
  if(kind==='unknown')review.verdicts[0].id='V1'; // no guessing zero padding
  const promise=workflow('build')(a,async(_,o)=>o.label==='round-critique'?review:structuredClone(built),parallel,()=>{},()=>{});
  if(kind==='prefixed'){const results=await promise;assert.ok(results.every(r=>r.ok));}
  else await assert.rejects(promise,/Round critique/);
 }
});
test('selection preserves exact unique group-label correspondence without accepting changed or ambiguous quotas',async()=>{
 for(const mode of ['normal','thorough'])for(const kind of ['labels','prefixed-labels','unknown','ambiguous','quota','wrong-prefix']){
  const a={...args(),mode,groups:[{key:'A',label:'Product ritual',kind:'original',want:2},{key:'B',label:'Physical world',kind:'original',want:2},{key:'C',label:'Information systems',kind:'original',want:2}]};
  if(kind==='ambiguous')a.groups[1].label=a.groups[0].label;
  const selected=variants().map(v=>({vid:v.id,name:v.name,group:a.groups.find(g=>g.key===v.group).label,mode:'light'}));
  if(kind==='prefixed-labels')selected.forEach((v,i)=>{v.group=a.groups[Math.floor(i/2)].key+' · '+v.group;});
  if(kind==='wrong-prefix')selected[0].group='B · Product ritual';
  if(kind==='unknown')selected[0].group='Unrequested group';
  if(kind==='quota')selected[0].group='Physical world';
  const promise=workflow('foundations')(a,async(_,o)=>{
   if(o.label.includes('propose'))return{candidates:[{name:'idea',group:'A',card:'product-specific'}]};
   if(o.label.includes('select')||o.label==='directions:critic')return{selected,photo_needs:[]};
   if(o.label.includes('critic'))return{verdict:'sound',findings:[]};
   return{file:'/note',key_findings:['source'],lenses:['Hierarchy','Reading','Materials']};
  },parallel,()=>{},()=>{});
  if(kind==='labels'||kind==='prefixed-labels'){const r=await promise;assert.deepEqual(r.selection.selected.map(x=>x.group),['A','A','B','B','C','C']);}
  else await assert.rejects(promise,/group quotas/);
 }
});
test('selected canvas and batched checks reach builders; unresolved material findings still block completion',async()=>{
 for(const [width,height,platform] of [[390,844,'mobile'],[428,926,'mobile'],[1366,900,'desktop']]){
  const a={...args(),viewport:{width,height},platform};const prompts=[];
  const result=await workflow('build')(a,async(p,o)=>{
   if(o.label==='round-critique')return round(a.variants);
   prompts.push(p);return{...built,known_issues:['Required content remains clipped']};
  },parallel,()=>{},()=>{});
  assert.ok(result.every(r=>r.ok===false&&r.status==='incomplete'));
  assert.equal(prompts.length,6);
  for(const p of prompts){assert.ok(p.includes(`--width ${width} --height ${height}`));assert.ok(p.includes('--batch <jobs.json>'));assert.ok(p.includes('authorized prototype limitations'));if(platform==='desktop')assert.ok(p.includes('native-looking desktop'));else assert.ok(p.includes(`${width} × ${height}`));}
 }
});

test('publication excludes queued, active and failed repairs until verified return, including thorough review',async()=>{
 for(const mode of ['normal','thorough'])for(const fail of [false,true]){
  const a={...args(),mode};const finished=new Set();let invalid=false;const publications=[];
  a.onVariantReady=async packet=>{
   if(packet.stage==='repaired'){
    publications.push(packet.id);const snapshot=[...packet.readyIds];
    invalid ||= snapshot.some(id=>!finished.has(id));await delay(15);
    invalid ||= snapshot.some(id=>!finished.has(id));
   }
  };
  const promise=workflow('build')(a,async(_,o)=>{
   if(o.label.startsWith('build:'))return structuredClone(built);
   if(o.label==='round-critique'){const r=round(a.variants);r.verdicts.forEach(v=>v.must_fix=mode==='normal'?['Required content clipped']:[]);return r;}
   if(o.label.startsWith('critique:')){await delay(4);return{must_fix:[{screen:'1',where:'body',problem:'Required content clipped',fix:'Restore content'}],push_further:[]};}
   if(o.label.startsWith('refine:')){const id=o.label.split(':v')[1];await delay(id==='01'?3:35);if(fail&&id==='02')throw Error('controlled repair failure');finished.add(id);return structuredClone(built);}
   throw Error('Unexpected stage '+o.label);
  },parallel,()=>{},()=>{});
  if(fail)await assert.rejects(promise,/controlled repair failure/);else assert.equal((await promise).length,6);
  assert.equal(invalid,false);assert.ok(publications.length>0);if(fail)assert.ok(!finished.has('02'));
 }
});

test('omitted groups permit six appropriate directions without genre quotas and preserve complementary proposals',async()=>{
 for(const mode of ['normal','thorough']){
  const a={...args(),mode};const labels=[],prompts=[];
  const selected=variants().map(v=>({vid:v.id,name:v.name,group:'A',mode:'light'}));
  const r=await workflow('foundations')(a,async(p,o)=>{
   labels.push(o.label);prompts.push(p);
   if(o.label.includes('propose'))return{candidates:[{name:'Product approach',group:'A',card:'Content-derived hierarchy without physical metaphor'}]};
   if(o.label.includes('select')||o.label==='directions:critic')return{selected,photo_needs:[]};
   if(o.label.includes('critic'))return{verdict:'sound',findings:[]};
   return{file:'/note',key_findings:['source'],lenses:['Operator scan','Decision context','Change confirmation']};
  },parallel,()=>{},()=>{});
  assert.equal(r.selection.selected.length,6);assert.equal(labels.filter(l=>l.includes('propose')).length,3);assert.equal(labels.length,10);
  assert.ok(prompts.every(p=>!p.includes('each grounded in one real-world vernacular')));
 }
});


test('unreleased lite mode refuses before any agent dispatch in both workflows',async()=>{
 for(const name of ['foundations','build']){
  let calls=0;
  await assert.rejects(workflow(name)({...args(),mode:'lite'},async()=>{calls++;return built;},parallel,()=>{},()=>{}),/Lite is not released/);
  assert.equal(calls,0);
 }
});
