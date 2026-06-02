
const HOSPITALS = [
  {id:1, name:'올래성형외과',   nameJa:'オーレ整形外科',   url:'jp.oleps.co.kr',      plan:'Pro',      status:'active',   inq:23, expire:'2026-11-30', manager:'김운영', compliance:1, visitors:1847, revenue:890000,  aeo:19, lineRate:94, conv:34},
  {id:2, name:'강남뷰티클리닉', nameJa:'カンナムビューティ', url:'jp.kannambeauty.co.kr',plan:'Pro',      status:'active',   inq:18, expire:'2026-09-15', manager:'이수진', compliance:0, visitors:1320, revenue:890000,  aeo:12, lineRate:88, conv:28},
  {id:3, name:'청담미래성형외과',nameJa:'チョンダムミレ',    url:'jp.miraeclinic.co.kr', plan:'Enterprise',status:'active',  inq:31, expire:'2027-03-20', manager:'김운영', compliance:2, visitors:2140, revenue:1490000, aeo:24, lineRate:91, conv:41},
  {id:4, name:'압구정원성형외과',nameJa:'アックジョンウォン', url:'jp.wonclinic.co.kr',   plan:'Basic',    status:'active',   inq:9,  expire:'2026-06-30', manager:'이수진', compliance:0, visitors:780,  revenue:390000,  aeo:7,  lineRate:79, conv:22},
  {id:5, name:'신사라인성형외과',nameJa:'シンサライン',      url:'jp.sinsa-line.co.kr',  plan:'Pro',      status:'active',   inq:14, expire:'2026-12-10', manager:'김운영', compliance:1, visitors:1120, revenue:890000,  aeo:11, lineRate:85, conv:31},
  {id:6, name:'도곡세라성형외과',nameJa:'ドゴクセラ',        url:'jp.sera-ps.co.kr',     plan:'Pro',      status:'active',   inq:11, expire:'2026-08-25', manager:'이수진', compliance:0, visitors:950,  revenue:890000,  aeo:9,  lineRate:82, conv:27},
  {id:7, name:'반포미성형외과',  nameJa:'バンポミ',          url:'jp.banpomi.co.kr',     plan:'Basic',    status:'active',   inq:7,  expire:'2026-07-14', manager:'김운영', compliance:0, visitors:620,  revenue:390000,  aeo:5,  lineRate:76, conv:19},
  {id:8, name:'논현더플러스',    nameJa:'ノンヒョンザプラス', url:'jp.theplus-ps.co.kr',  plan:'Pro',      status:'active',   inq:16, expire:'2027-01-08', manager:'이수진', compliance:0, visitors:1050, revenue:890000,  aeo:14, lineRate:87, conv:33},
  {id:9, name:'역삼유나이티드', nameJa:'ヨクサムユナイテッド',url:'jp.united-ps.co.kr',   plan:'Basic',    status:'active',   inq:5,  expire:'2026-06-05', manager:'김운영', compliance:0, visitors:480,  revenue:390000,  aeo:4,  lineRate:71, conv:17},
  {id:10,name:'이수프리마',      nameJa:'イスプリマ',        url:'(온보딩 중)',           plan:'Pro',      status:'onboarding',inq:0, expire:'-',          manager:'김운영', compliance:0, visitors:0,    revenue:0,       aeo:0,  lineRate:0,  conv:0},
  {id:11,name:'사당뷰성형외과',  nameJa:'サダンビュー',      url:'(온보딩 중)',           plan:'Enterprise',status:'onboarding',inq:0,expire:'-',          manager:'이수진', compliance:0, visitors:0,    revenue:0,       aeo:0,  lineRate:0,  conv:0},
  {id:12,name:'방배탑성형외과',  nameJa:'バンベタップ',      url:'(온보딩 중)',           plan:'Basic',    status:'onboarding',inq:0,expire:'-',           manager:'김운영', compliance:0, visitors:0,    revenue:0,       aeo:0,  lineRate:0,  conv:0},
];

document.getElementById('today-date').textContent = new Date().toLocaleDateString('ko-KR',{month:'long',day:'numeric',weekday:'short'});

const urgents = [
  {icon:'⚠',color:'var(--red)',   title:'컴플라이언스 위반 3건', sub:'청담미래성형외과(2) · 올래성형외과(1)',   time:'방금',     link:'html/site_management.html'},
  {icon:'💳',color:'var(--red)',   title:'미납 청구 2건',          sub:'역삼유나이티드 · 압구정원',              time:'D+7',      link:'html/billing_management.html'},
  {icon:'📋',color:'var(--amber)', title:'계약 갱신 임박 2건',      sub:'역삼유나이티드(6/5) · 압구정원(6/30)',   time:'30일 이내', link:'html/contract_management.html'},
  {icon:'🎧',color:'var(--blue)',  title:'미처리 CS 7건',          sub:'긴급 2건 포함',                          time:'최대 4시간',link:'html/cs_management.html'},
];
const uEl = document.getElementById('urgent-list');
urgents.forEach(u => {
  uEl.innerHTML += `<div style="display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid var(--gray-100);cursor:pointer" onclick="location.href='${u.link}'">
    <div style="width:8px;height:8px;border-radius:50%;background:${u.color};margin-top:5px;flex-shrink:0"></div>
    <div style="flex:1"><div style="font-size:12px;font-weight:500;color:var(--gray-900)">${u.title}</div><div style="font-size:12px;color:var(--gray-500)">${u.sub}</div></div>
    <div style="font-size:10px;color:var(--gray-400)">${u.time}</div>
  </div>`;
});

const onboardings = HOSPITALS.filter(h => h.status === 'onboarding');
const steps = ['AI 풀 드래프트','크리에이티브','검수 게이트','연동 & SEO','게시'];
const stepNums = [2, 3, 4];
const obEl = document.getElementById('onboarding-list');
onboardings.forEach((h, i) => {
  const step = stepNums[i];
  const pct = Math.round(step/5*100);
  obEl.innerHTML += `<div style="padding:10px 0;border-bottom:1px solid var(--gray-100);cursor:pointer" onclick="location.href='html/onboarding_list.html'">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
      <span style="font-size:13px;font-weight:500;color:var(--gray-900)">${h.name}</span>
      <span style="font-size:12px;color:var(--gray-400)">STEP ${step}/5 · ${steps[step-1]}</span>
    </div>
    <div style="height:5px;background:var(--gray-100);border-radius:3px;overflow:hidden">
      <div style="height:100%;background:var(--teal);width:${pct}%;border-radius:3px"></div>
    </div>
    <div style="font-size:10px;color:var(--gray-400);margin-top:3px;text-align:right">${pct}%</div>
  </div>`;
});

const top5 = HOSPITALS.filter(h=>h.status==='active').sort((a,b)=>b.inq-a.inq).slice(0,5);
const cEl = document.getElementById('crm-list');
top5.forEach(h => {
  cEl.innerHTML += `<div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--gray-100);cursor:pointer" onclick="location.href='html/crm_management.html'">
    <span style="font-size:12px;color:var(--gray-700);flex:1">${h.name}</span>
    <div style="flex:2;height:5px;background:var(--gray-100);border-radius:3px;overflow:hidden">
      <div style="height:100%;background:var(--blue);width:${Math.round(h.inq/31*100)}%;border-radius:3px"></div>
    </div>
    <span style="font-size:12px;font-weight:600;color:var(--navy);min-width:30px;text-align:right">${h.inq}건</span>
  </div>`;
});

const recent = [...HOSPITALS].sort(()=>Math.random()-.5).slice(0,4);
const hEl = document.getElementById('hospital-list');
recent.forEach(h => {
  const sc = {active:'badge-green',onboarding:'badge-amber'}[h.status]||'badge-gray';
  const sl = {active:'운영 중',onboarding:'온보딩'}[h.status]||'-';
  hEl.innerHTML += `<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--gray-100);cursor:pointer" onclick="location.href='html/hospital_list.html'">
    <div style="width:32px;height:32px;border-radius:8px;background:var(--teal-l);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">🏥</div>
    <div style="flex:1"><div style="font-size:13px;font-weight:500;color:var(--gray-900)">${h.name}</div><div style="font-size:12px;color:var(--gray-400)">${h.plan} · ${h.manager}</div></div>
    <span class="badge ${sc}">${sl}</span>
  </div>`;
});

const renewals = HOSPITALS.filter(h=>h.status==='active').sort((a,b)=>a.expire.localeCompare(b.expire)).slice(0,4);
const contEl = document.getElementById('contract-list');
renewals.forEach(h => {
  const days = Math.round((new Date(h.expire)-new Date())/86400000);
  const urgentCls = days < 30 ? 'color:var(--red);font-weight:600' : 'color:var(--gray-400)';
  contEl.innerHTML += `<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--gray-100);cursor:pointer" onclick="location.href='html/contract_management.html'">
    <div style="flex:1"><div style="font-size:13px;font-weight:500;color:var(--gray-900)">${h.name}</div><div style="font-size:12px;color:var(--gray-400)">${h.plan}</div></div>
    <div style="text-align:right"><div style="font-size:12px;${urgentCls}">${h.expire}</div><div style="font-size:10px;color:var(--gray-400)">D-${days}</div></div>
  </div>`;
});

new Chart(document.getElementById('revenueChart'),{type:'bar',
  data:{labels:['1월','2월','3월','4월','5월'],
    datasets:[{label:'매출',data:[5200000,6100000,6800000,7500000,8400000],backgroundColor:'#0D9488',borderRadius:4}]},
  options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{font:{size:10},color:'#9CA3AF'}},y:{grid:{color:'#F3F4F6'},ticks:{font:{size:10},color:'#9CA3AF',callback:v=>'₩'+(v/10000).toFixed(0)+'만'}}}}
});
