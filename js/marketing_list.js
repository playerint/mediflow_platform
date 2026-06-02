
const HOSPITALS = [
  {id:1, name:'올래성형외과',   nameJa:'オーレ整形外科',    url:'jp.oleps.co.kr',       plan:'Pro',       status:'active',    inq:23,expire:'2026-11-30',manager:'김운영',compliance:1,visitors:1847,revenue:890000, aeo:19,lineRate:94,conv:34},
  {id:2, name:'강남뷰티클리닉', nameJa:'カンナムビューティ', url:'jp.kannambeauty.co.kr',plan:'Pro',       status:'active',    inq:18,expire:'2026-09-15',manager:'이수진',compliance:0,visitors:1320,revenue:890000, aeo:12,lineRate:88,conv:28},
  {id:3, name:'청담미래성형외과',nameJa:'チョンダムミレ',    url:'jp.miraeclinic.co.kr', plan:'Enterprise',status:'active',    inq:31,expire:'2027-03-20',manager:'김운영',compliance:2,visitors:2140,revenue:1490000,aeo:24,lineRate:91,conv:41},
  {id:4, name:'압구정원성형외과',nameJa:'アックジョンウォン',url:'jp.wonclinic.co.kr',   plan:'Basic',     status:'active',    inq:9, expire:'2026-06-30',manager:'이수진',compliance:0,visitors:780, revenue:390000, aeo:7, lineRate:79,conv:22},
  {id:5, name:'신사라인성형외과',nameJa:'シンサライン',      url:'jp.sinsa-line.co.kr',  plan:'Pro',       status:'active',    inq:14,expire:'2026-12-10',manager:'김운영',compliance:1,visitors:1120,revenue:890000, aeo:11,lineRate:85,conv:31},
  {id:10,name:'이수프리마',      nameJa:'イスプリマ',        url:'(온보딩 중)',           plan:'Pro',       status:'onboarding',inq:0, expire:'-',          manager:'김운영',compliance:0,visitors:0,   revenue:0,      aeo:0, lineRate:0, conv:0},
  {id:11,name:'사당뷰성형외과',  nameJa:'サダンビュー',      url:'(온보딩 중)',           plan:'Enterprise',status:'onboarding',inq:0, expire:'-',          manager:'이수진',compliance:0,visitors:0,   revenue:0,      aeo:0, lineRate:0, conv:0},
  {id:12,name:'방배탑성형외과',  nameJa:'バンベタップ',      url:'(온보딩 중)',           plan:'Basic',     status:'onboarding',inq:0, expire:'-',          manager:'김운영',compliance:0,visitors:0,   revenue:0,      aeo:0, lineRate:0, conv:0},
];

const mktKpi = document.getElementById('mkt-kpi');
mktKpi.innerHTML = [
  {label:'전체 방문자',val:HOSPITALS.reduce((s,h)=>s+h.visitors,0).toLocaleString(),cl:'blue'},
  {label:'AEO 총 인용',val:HOSPITALS.reduce((s,h)=>s+h.aeo,0)+'회',cl:'purple'},
  {label:'평균 전환율',val:'29%',cl:'green'},
  {label:'리타게팅 발송',val:'384건',cl:'amber'},
].map(k=>`<div class="kpi-card ${k.cl}"><div class="kpi-label">${k.label}</div><div class="kpi-value">${k.val}</div></div>`).join('');

const aeoEl = document.getElementById('aeo-list');
[...HOSPITALS].filter(h=>h.aeo>0).sort((a,b)=>b.aeo-a.aeo).forEach(h=>{
  aeoEl.innerHTML += `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--gray-100)">
    <span style="font-size:12px;min-width:120px">${h.name}</span>
    <div style="flex:1;height:5px;background:var(--gray-100);border-radius:3px;overflow:hidden"><div style="height:100%;background:var(--purple);width:${Math.round(h.aeo/24*100)}%"></div></div>
    <span style="font-size:12px;font-weight:600;min-width:30px;text-align:right">${h.aeo}회</span>
  </div>`;
});

const rtEl = document.getElementById('retarget-list');
[...HOSPITALS].filter(h=>h.status==='active').forEach(h=>{
  rtEl.innerHTML += `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--gray-100)">
    <span style="font-size:12px;min-width:120px">${h.name}</span>
    <span class="badge badge-blue" style="font-size:10px">D+3</span>
    <span class="badge badge-purple" style="font-size:10px">D+7</span>
    <span style="font-size:12px;color:var(--green);margin-left:auto">${Math.floor(Math.random()*20+30)}% 클릭</span>
  </div>`;
});

new Chart(document.getElementById('convChart'),{type:'bar',
  data:{labels:HOSPITALS.filter(h=>h.status==='active').map(h=>h.name.slice(0,4)),
    datasets:[
      {label:'방문자(백명)',data:HOSPITALS.filter(h=>h.status==='active').map(h=>Math.round(h.visitors/100)),backgroundColor:'rgba(37,99,235,.2)',borderColor:'#2563EB',borderWidth:1,borderRadius:4},
      {label:'전환율(%)',data:HOSPITALS.filter(h=>h.status==='active').map(h=>h.conv),backgroundColor:'rgba(13,148,136,.8)',borderRadius:4},
    ]},
  options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top',labels:{font:{size:10}}}},scales:{x:{grid:{display:false},ticks:{font:{size:9}}},y:{display:false}}}
});
