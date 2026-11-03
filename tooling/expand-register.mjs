import fs from 'node:fs/promises';import {regions} from '../regions.js';import {maternalHeaders,facilityHeaders,normalizeRows} from '../pipeline/schema.js';import {components} from '../engine.js';
const existing=JSON.parse(await fs.readFile('outputs/nhmis/v12-existing.json','utf8'));
const keys=Object.keys(components),t=new Date().toISOString();
const facilities=existing.facilities.slice(1).map((r,i)=>[...Array.from({length:25},(_,j)=>r[j]??null),'Gombe',10.28+(i-1)*.05,11.17+(i-1)*.05]);
const maternal=existing.maternal.slice(1).map(r=>Array.from({length:21},(_,j)=>r[j]??null));
let fi=4,mi=9;
for(const [i,region]of regions.entries()){if(region.name==='Gombe')continue;for(let j=0;j<2;j++){
const id='f'+fi++;const stocks=keys.map((k,n)=>((i+j+n)%11!==0));if((i+j)%4===0){stocks[keys.indexOf('oxytocin')]=false;stocks[keys.indexOf('ergometrine')]=false;}if((i+j)%7===0)stocks[keys.indexOf('sba')]=false;
facilities.push([id,`${region.name} ${j?'Community':'Central'} PHC · Demo`,`${region.name} district ${j+1}`,60+(i*17+j*31)%180,t,...stocks,true,region.name,region.lat+(j?-.06:.06),region.lon+(j?.06:-.06)]);
for(let k=0;k<4;k++){const n=i*8+j*4+k,urgent=n%5===0,incomplete=n%9===0;maternal.push(['IM-'+String(mi++).padStart(3,'0'),id,t,20+n%18,26+n%15,n%10,urgent?164+n%9:110+n%25,urgent?112:70+n%17,75+n%30,16+n%6,incomplete?null:97+n%3,36.4+(n%5)/10,n%6===0?9.4:11.7,n%17===0,n%29===0,false,n%11===0,n%13===0,n%5,n%7===0?'1+':'Negative',true]);}
}}
const raw={maternal:[maternalHeaders,...maternal],facilities:[facilityHeaders,...facilities]};const normalized=normalizeRows(raw.maternal,raw.facilities);
await fs.writeFile('outputs/nhmis/v12-expanded.json',JSON.stringify(raw,null,2));
console.log(`${normalized.mothers.length} mothers, ${normalized.facilities.length} facilities, ${new Set(normalized.facilities.map(f=>f.state)).size} states / FCT`);
