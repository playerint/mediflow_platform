
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

const crmKpi = document.getElementById('crm-kpi');
const totalInq = HOSPITALS.reduce((s,h)=>s+h.inq,0);
crmKpi.innerHTML = [
  {label:'전체 문의',val:totalInq+'건',cl:'teal'},{label:'미확인',val:'5건',cl:'red'},
  {label:'평균 전환율',val:'29%',cl:'blue'},{label:'AI 자동 해결',val:'68%',cl:'green'},
].map(k=>`<div class="kpi-card ${k.cl}"><div class="kpi-label">${k.label}</div><div class="kpi-value">${k.val}</div></div>`).join('');

const hList = document.getElementById('crm-hospital-list');
HOSPITALS.filter(h=>h.status==='active').sort((a,b)=>b.inq-a.inq).forEach(h=>{
  hList.innerHTML += `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--gray-100);cursor:pointer">
    <span style="font-size:13px;color:var(--gray-900);min-width:130px">${h.name}</span>
    <div style="flex:1;height:6px;background:var(--gray-100);border-radius:3px;overflow:hidden"><div style="height:100%;background:var(--blue);width:${Math.round(h.inq/31*100)}%"></div></div>
    <span style="font-size:12px;font-weight:600;color:var(--navy);min-width:30px;text-align:right">${h.inq}건</span>
    <span class="up" style="font-size:12px;min-width:34px;text-align:right">${h.conv}%</span>
  </div>`;
});

new Chart(document.getElementById('channelChart'),{type:'doughnut',
  data:{labels:['LINE','Instagram'],datasets:[{data:[57,43],backgroundColor:['#0D9488','#E1306C'],borderWidth:2,borderColor:'#fff'}]},
  options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{font:{size:11}}}},cutout:'60%'}
});

const unread = [
  {hospital:'올래성형외과',patient:'야마다 사오리',ch:'LINE',msg:'二重整形について',elapsed:'2시간',status:'미확인'},
  {hospital:'청담미래성형외과',patient:'스즈키 미카',ch:'LINE',msg:'鼻整形の費用は？',elapsed:'1시간',status:'미확인'},
  {hospital:'강남뷰티클리닉',patient:'사토 하루카',ch:'LINE',msg:'初回カウンセリング',elapsed:'3시간',status:'상담중'},
];
const tb = document.getElementById('crm-tbody');
unread.forEach(u=>{
  tb.innerHTML += `<tr><td><span class="badge badge-teal" style="font-size:10px">${u.hospital}</span></td><td>${u.patient}</td><td>${u.ch}</td><td style="font-size:12px;color:var(--gray-500)">${u.msg}</td><td style="color:var(--red);font-size:12px">${u.elapsed}</td><td><span class="badge badge-${u.status==='미확인'?'red':'amber'}">${u.status}</span></td><td><button class="btn" style="font-size:12px;padding:3px 9px">답변</button></td></tr>`;
});
