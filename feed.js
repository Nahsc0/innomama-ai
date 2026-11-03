import {decodeSnapshot} from './pipeline/schema.js';
export function freshness(generatedAt,now=Date.now()){if(!generatedAt)return 'Awaiting first sync';return now-Date.parse(generatedAt)>15*60*1000?'Delayed feed':'Recent snapshot';}
export function startFeed(onUpdate){let info={data:null,loading:false,error:null,lastChecked:null,lastSuccess:null,cached:false};const cacheKey='innomama-feed-v1';
try{const cached=JSON.parse(localStorage.getItem(cacheKey));if(cached)info={...info,data:decodeSnapshot(cached),cached:true};}catch{}
onUpdate(info);
async function refresh(){if(info.loading)return;info={...info,loading:true};onUpdate(info);try{const r=await fetch(`pipeline/snapshot.json?t=${Date.now()}`,{cache:'no-store',signal:AbortSignal.timeout(12000)});if(!r.ok)throw Error(`HTTP ${r.status}`);const snapshot=await r.json(),data=decodeSnapshot(snapshot);info={data,loading:false,error:null,lastChecked:new Date().toISOString(),lastSuccess:new Date().toISOString(),cached:false};try{localStorage.setItem(cacheKey,JSON.stringify(snapshot));}catch{}onUpdate(info);}catch(e){info={...info,loading:false,error:e.message,lastChecked:new Date().toISOString()};onUpdate(info);}}
refresh();const timer=setInterval(refresh,60000);return {refresh,stop:()=>clearInterval(timer)};
}
