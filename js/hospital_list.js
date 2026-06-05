
const HOSPITALS = [
  {id:1, name:'올래성형외과',   nameJa:'オーレ整形外科',   url:'jp.oleps.co.kr',      plan:'Pro',      status:'active',   inq:23, expire:'2026-11-30', manager:'김운영', compliance:1, visitors:1847, revenue:890000,  aeo:19, lineRate:94, conv:34, clinicType:'성형외과', specialty:'쌍꺼풀·눈성형'},
  {id:2, name:'강남뷰티클리닉', nameJa:'カンナムビューティ', url:'jp.kannambeauty.co.kr',plan:'Pro',      status:'active',   inq:18, expire:'2026-09-15', manager:'이수진', compliance:0, visitors:1320, revenue:890000,  aeo:12, lineRate:88, conv:28, clinicType:'피부과',   specialty:'보톡스·필러'},
  {id:3, name:'청담미래성형외과',nameJa:'チョンダムミレ',    url:'jp.miraeclinic.co.kr', plan:'Enterprise',status:'active',  inq:31, expire:'2027-03-20', manager:'김운영', compliance:2, visitors:2140, revenue:1490000, aeo:24, lineRate:91, conv:41, clinicType:'성형외과', specialty:'안면윤곽'},
  {id:4, name:'압구정원성형외과',nameJa:'アックジョンウォン', url:'jp.wonclinic.co.kr',   plan:'Basic',    status:'active',   inq:9,  expire:'2026-06-30', manager:'이수진', compliance:0, visitors:780,  revenue:390000,  aeo:7,  lineRate:79, conv:22, clinicType:'성형외과', specialty:'코성형'},
  {id:5, name:'신사라인성형외과',nameJa:'シンサライン',      url:'jp.sinsa-line.co.kr',  plan:'Pro',      status:'active',   inq:14, expire:'2026-12-10', manager:'김운영', compliance:1, visitors:1120, revenue:890000,  aeo:11, lineRate:85, conv:31, clinicType:'성형외과', specialty:'지방흡입'},
  {id:6, name:'도곡세라성형외과',nameJa:'ドゴクセラ',        url:'jp.sera-ps.co.kr',     plan:'Pro',      status:'active',   inq:11, expire:'2026-08-25', manager:'이수진', compliance:0, visitors:950,  revenue:890000,  aeo:9,  lineRate:82, conv:27, clinicType:'성형외과', specialty:'가슴성형'},
  {id:7, name:'반포미성형외과',  nameJa:'バンポミ',          url:'jp.banpomi.co.kr',     plan:'Basic',    status:'active',   inq:7,  expire:'2026-07-14', manager:'김운영', compliance:0, visitors:620,  revenue:390000,  aeo:5,  lineRate:76, conv:19, clinicType:'성형외과', specialty:'눈·코 복합'},
  {id:8, name:'논현더플러스',    nameJa:'ノンヒョンザプラス', url:'jp.theplus-ps.co.kr',  plan:'Pro',      status:'active',   inq:16, expire:'2027-01-08', manager:'이수진', compliance:0, visitors:1050, revenue:890000,  aeo:14, lineRate:87, conv:33, clinicType:'성형외과', specialty:'피부·리프팅'},
  {id:9, name:'역삼유나이티드', nameJa:'ヨクサムユナイテッド',url:'jp.united-ps.co.kr',   plan:'Basic',    status:'active',   inq:5,  expire:'2026-06-05', manager:'김운영', compliance:0, visitors:480,  revenue:390000,  aeo:4,  lineRate:71, conv:17, clinicType:'성형외과', specialty:'기타'},
  {id:10,name:'이수프리마',      nameJa:'イスプリマ',        url:'(온보딩 중)',           plan:'Pro',      status:'onboarding',inq:0, expire:'-',          manager:'김운영', compliance:0, visitors:0,    revenue:0,       aeo:0,  lineRate:0,  conv:0,  clinicType:'성형외과', specialty:'눈·코 복합'},
  {id:11,name:'사당뷰성형외과',  nameJa:'サダンビュー',      url:'(온보딩 중)',           plan:'Enterprise',status:'onboarding',inq:0,expire:'-',          manager:'이수진', compliance:0, visitors:0,    revenue:0,       aeo:0,  lineRate:0,  conv:0,  clinicType:'성형외과', specialty:'쌍꺼풀·눈성형'},
  {id:12,name:'방배탑성형외과',  nameJa:'バンベタップ',      url:'(온보딩 중)',           plan:'Basic',    status:'onboarding',inq:0,expire:'-',           manager:'김운영', compliance:0, visitors:0,    revenue:0,       aeo:0,  lineRate:0,  conv:0,  clinicType:'성형외과', specialty:'안면윤곽'},
];

let currentFilter = 'all';

const planColors = {Pro:'badge-blue', Enterprise:'badge-purple', Basic:'badge-gray'};
const statusColors = {active:'badge-green', onboarding:'badge-amber', paused:'badge-red'};
const statusLabels = {active:'운영 중', onboarding:'온보딩', paused:'일시정지'};

function renderKPI() {
  const el = document.getElementById('summary-kpi');
  const active = HOSPITALS.filter(h=>h.status==='active').length;
  const ob = HOSPITALS.filter(h=>h.status==='onboarding').length;
  const totalRev = HOSPITALS.reduce((s,h)=>s+h.revenue,0);
  const totalInq = HOSPITALS.reduce((s,h)=>s+h.inq,0);
  const kpis = [
    {label:'전체 병원',val:HOSPITALS.length+'개',color:'teal'},
    {label:'운영 중',val:active+'개',color:'green'},
    {label:'온보딩',val:ob+'개',color:'amber'},
    {label:'이번 달 총 문의',val:totalInq+'건',color:'blue'},
  ];
  el.innerHTML = kpis.map(k=>`<div style="background:#fff;border:1px solid var(--gray-200);border-radius:var(--r);padding:12px 16px">
    <div style="font-size:12px;color:var(--gray-400);margin-bottom:4px">${k.label}</div>
    <div style="font-size:22px;font-weight:700;color:var(--navy)">${k.val}</div>
  </div>`).join('');
}

function renderTable(filter, search='') {
  const tbody = document.getElementById('hospital-tbody');
  const filtered = HOSPITALS.filter(h => {
    const mf = filter==='all' || h.status===filter;
    const ms = !search || h.name.includes(search) || h.nameJa.includes(search);
    return mf && ms;
  });
  tbody.innerHTML = filtered.map(h=>`
    <tr onclick="location.href='hospital_detail.html?id=${h.id}'" style="${h.isNew ? 'background:var(--teal-l)' : ''}">
      <td><div style="font-size:13px;font-weight:500;color:var(--gray-900)">${h.name}</div><div style="font-size:12px;color:var(--gray-400)">${h.nameJa}</div></td>
      <td><span class="badge ${planColors[h.plan]}">${h.plan}</span></td>
      <td><span class="badge ${statusColors[h.status]}">${statusLabels[h.status]}</span></td>
      <td style="font-size:12px;color:var(--teal);font-family:monospace">${h.url}</td>
      <td style="font-weight:500">${h.inq>0?h.inq+'건':'-'}</td>
      <td style="${h.expire!=='-'&&new Date(h.expire)<new Date(Date.now()+30*86400000)?'color:var(--red);font-weight:600':'color:var(--gray-500)'}">${h.expire}</td>
      <td>${h.manager}</td>
      <td><button class="btn" style="font-size:12px;padding:4px 10px" onclick="event.stopPropagation();location.href='hospital_detail.html?id=${h.id}'">상세 →</button></td>
    </tr>`).join('');
}

function setFilter(f, btn) {
  currentFilter = f;
  document.querySelectorAll('.pill').forEach(p=>p.classList.remove('on'));
  btn.classList.add('on');
  renderTable(f, document.getElementById('search').value);
}
function filterHospitals(v) { renderTable(currentFilter, v); }

// 신규 등록 병원 병합
if (typeof window.__mergeNewHospitals === 'function') window.__mergeNewHospitals();

// 필터 카운트 업데이트
(function() {
  const active = HOSPITALS.filter(h=>h.status==='active').length;
  const ob     = HOSPITALS.filter(h=>h.status==='onboarding').length;
  const paused = HOSPITALS.filter(h=>h.status==='paused').length;
  const pills  = document.querySelectorAll('.pill');
  if (pills.length >= 4) {
    pills[0].textContent = '전체 ' + HOSPITALS.length;
    pills[1].textContent = '운영 중 ' + active;
    pills[2].textContent = '온보딩 ' + ob;
    pills[3].textContent = '일시정지 ' + paused;
  }
})();

renderKPI();
renderTable('all');
