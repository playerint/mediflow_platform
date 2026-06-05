
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

const siteKpi = document.getElementById('site-kpi');
siteKpi.innerHTML = [
  {label:'전체 사이트',val:'12개',color:'teal'},{label:'게시 중',val:'9개',color:'green'},
  {label:'컴플라이언스 위반',val:'3건',color:'red'},{label:'검수 대기',val:'2건',color:'amber'},
].map(k=>`<div style="background:#fff;border:1px solid var(--gray-200);border-radius:var(--r);padding:12px 16px">
  <div style="font-size:12px;color:var(--gray-400);margin-bottom:4px">${k.label}</div>
  <div style="font-size:22px;font-weight:700;color:var(--navy)">${k.val}</div>
</div>`).join('');

const tbody = document.getElementById('site-tbody');
const active = HOSPITALS.filter(h=>h.status==='active');
active.forEach(h=>{
  const compBadge = h.compliance>0 ? `<span class="badge badge-red">위반 ${h.compliance}건</span>` : `<span class="badge badge-green">정상</span>`;
  tbody.innerHTML += `<tr onclick="location.href='hospital_detail.html?id=${h.id}'" style="cursor:pointer">
    <td><div style="font-size:13px;font-weight:500">${h.name}</div><div style="font-size:12px;color:var(--gray-400)">${h.nameJa}</div></td>
    <td style="font-size:12px;color:var(--teal);font-family:monospace">${h.url}</td>
    <td><span class="badge badge-green">게시 중</span></td>
    <td>${compBadge}</td>
    <td style="font-size:12px;color:var(--gray-500)">오늘 14:23</td>
    <td><span class="badge badge-green">98점</span></td>
    <td><button class="btn" style="font-size:12px;padding:4px 10px" onclick="event.stopPropagation();location.href='hospital_detail.html?id=${h.id}'">관리 →</button></td>
  </tr>`;
});
let currentFilter='all';
function setFilter(f,btn){currentFilter=f;document.querySelectorAll('.pill').forEach(p=>p.classList.remove('on'));btn.classList.add('on');}
