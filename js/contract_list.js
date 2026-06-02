
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

const contractKpi = document.getElementById('contract-kpi');
contractKpi.innerHTML = [
  {label:'전체 계약',val:'12건',color:'teal'},{label:'자동 갱신',val:'8건',color:'green'},
  {label:'30일 내 만료',val:'2건',color:'red'},{label:'이번 달 신규',val:'2건',color:'blue'},
].map(k=>`<div style="background:#fff;border:1px solid var(--gray-200);border-radius:var(--r);padding:12px 16px;border-left:3px solid var(--${k.color})">
  <div style="font-size:12px;color:var(--gray-400);margin-bottom:4px">${k.label}</div>
  <div style="font-size:22px;font-weight:700;color:var(--navy)">${k.val}</div>
</div>`).join('');

const planPrices = {Basic:390000, Pro:890000, Enterprise:1490000};
const tbody = document.getElementById('contract-tbody');
HOSPITALS.forEach(h=>{
  const days = h.expire!=='-' ? Math.round((new Date(h.expire)-new Date())/86400000) : null;
  const expStyle = days && days<30 ? 'color:var(--red);font-weight:600' : 'color:var(--gray-500)';
  tbody.innerHTML += `<tr>
    <td><div style="font-weight:500">${h.name}</div><div style="font-size:12px;color:var(--gray-400)">${h.nameJa}</div></td>
    <td><span class="badge ${h.plan==='Enterprise'?'badge-purple':h.plan==='Pro'?'badge-blue':'badge-gray'}">${h.plan}</span></td>
    <td style="font-weight:600">₩${planPrices[h.plan].toLocaleString()}</td>
    <td style="font-size:12px;color:var(--gray-500)">${h.status==='onboarding'?'온보딩 중':'2025-'+h.expire.slice(5)}</td>
    <td style="${expStyle}">${h.expire}</td>
    <td><label class="toggle-wrap" style="width:32px;height:18px"><input type="checkbox" ${Math.random()>.3?'checked':''}><div class="toggle-track"></div><div class="toggle-thumb" style="width:12px;height:12px;top:3px;left:3px"></div></label></td>
    <td><span class="badge ${h.status==='active'?'badge-green':h.status==='onboarding'?'badge-amber':'badge-gray'}">${h.status==='active'?'활성':h.status==='onboarding'?'온보딩':'정지'}</span></td>
    <td><button class="btn" style="font-size:12px;padding:4px 10px" onclick="alert('${h.name} 계약 상세')">상세</button></td>
  </tr>`;
});
