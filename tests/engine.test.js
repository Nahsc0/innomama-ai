import test from 'node:test';import assert from 'node:assert/strict';import {readiness,assess} from '../engine.js';import {facilities,mothers} from '../data.js';
const f=facilities[2],p=mothers[2];
test('all four functions require every component',()=>{assert.equal(readiness(f).filter(s=>s.ready).length,4);assert.equal(readiness({...f,sba:false}).filter(s=>s.ready).length,0);assert.equal(readiness({...f,water:null})[2].ready,false);});
test('uterotonic alternatives preserve historical rule, misoprostol is separate',()=>{assert.equal(readiness({...f,oxytocin:false,ergometrine:true})[1].ready,true);assert.equal(readiness({...f,oxytocin:false,ergometrine:false,misoprostol:true})[1].ready,false);});
test('red flags override incomplete records and readiness',()=>{assert.equal(assess({...p,sbp:160,spo2:null},f).level,'Urgent');assert.equal(assess({...p,bleeding:true},f).level,'Urgent');assert.equal(assess({...p,dbp:110},f).level,'Urgent');});
test('missing measurements never produce reassurance',()=>{for(const v of [null,'',undefined])assert.equal(assess({...p,spo2:v},f).level,'Incomplete');assert.equal(assess({...p,anc:null},f).level,'Incomplete');});
test('ANC contextual trigger applies near term, not early pregnancy',()=>{assert.equal(assess({...p,weeks:20,anc:2},f).level,'No triggers');assert.equal(assess({...p,weeks:38,anc:2},f).level,'Review');});
test('readiness gaps trigger review without a mortality probability',()=>{const r=assess(p,{...f,sba:false});assert.equal(r.level,'Review');assert.equal(r.probability,undefined);});
test('physiological boundary values are explicit',()=>{assert.equal(assess({...p,sbp:159},f).level,'Review');assert.equal(assess({...p,spo2:95},f).level,'No triggers');assert.equal(assess({...p,spo2:94},f).level,'Urgent');});
