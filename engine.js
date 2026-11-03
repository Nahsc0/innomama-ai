export const components={sba:'Skilled birth attendant',bpKit:'Blood pressure machine',fetal:'Fetal stethoscope',thermometer:'Thermometer',partograph:'Blank partographs',urineKit:'Urine testing kit',oxytocin:'Oxytocin',ergometrine:'Ergometrine (historical indicator)',water:'Clean running water',soap:'Soap',gloves:'Disposable gloves',disinfectant:'Disinfectant',cutter:'Sterile cord cutter',tie:'Cord tie',misoprostol:'Quality-assured misoprostol',magnesium:'Magnesium sulphate',antibiotics:'Parenteral antibiotics',transport:'Referral transport',resuscitation:'Newborn resuscitation equipment'};
export const functions=[{name:'Labour monitoring',keys:['sba','bpKit','fetal','thermometer','partograph','urineKit','uterotonic']},{name:'Third-stage care',keys:['sba','uterotonic']},{name:'Infection prevention',keys:['sba','water','soap','gloves','disinfectant']},{name:'Clean cord care',keys:['sba','cutter','tie']}];
export function readiness(f){return functions.map(sf=>{const missing=sf.keys.filter(k=>k==='uterotonic'?!(f.oxytocin===true||f.ergometrine===true):f[k]!==true);return {...sf,ready:missing.length===0,missing:missing.map(k=>k==='uterotonic'?'Oxytocin or ergometrine (2020 definition)':components[k])};});}
export function assess(p,f){const urgent=[],review=[],unknown=[];const num=k=>p[k]!==null&&p[k]!==''&&Number.isFinite(Number(p[k]));for(const k of ['sbp','dbp','pulse','resp','spo2','temp'])if(!num(k))unknown.push(k);
if(num('sbp')&&(p.sbp>=160||p.sbp<90))urgent.push('Systolic blood pressure outside demo trigger range');
if(num('dbp')&&p.dbp>=110)urgent.push('Severe diastolic blood pressure trigger');
if(num('pulse')&&(p.pulse>120||p.pulse<50))urgent.push('Abnormal pulse trigger');
if(num('resp')&&(p.resp>30||p.resp<10))urgent.push('Abnormal respiratory rate trigger');
if(num('spo2')&&p.spo2<95)urgent.push('Low oxygen saturation trigger');
if(p.bleeding)urgent.push('Bleeding reported');if(p.seizure)urgent.push('Seizure reported');if(p.breathless)urgent.push('Breathlessness reported');
if(num('temp')&&(p.temp>=38||p.temp<36))review.push('Temperature requires review');
if(num('sbp')&&p.sbp>=140&&p.sbp<160)review.push('Raised systolic blood pressure');
if(num('dbp')&&p.dbp>=90&&p.dbp<110)review.push('Raised diastolic blood pressure');
if(p.headache)review.push('Headache / visual disturbance reported');if(p.prior)review.push('Previous obstetric complication');
if(num('hb')&&p.hb<11)review.push('Low haemoglobin recorded');if(!num('hb'))unknown.push('hb');
if(!num('anc'))unknown.push('anc');else if(p.weeks>=36&&p.anc<8)review.push('ANC follow-up: fewer than eight contacts near term');
const signals=readiness(f),gaps=signals.filter(s=>!s.ready);if(gaps.length)review.push(`${gaps.length} routine-care signal functions incomplete`);
if(f.transport!==true)review.push('Referral transport not confirmed');
return {level:urgent.length?'Urgent':unknown.length?'Incomplete':review.length?'Review':'No triggers',urgent,review,unknown,signals};}
