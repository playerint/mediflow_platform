
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

const billingKpi = document.getElementById('billing-kpi');
const totalRev = HOSPITALS.reduce((s,h)=>s+h.revenue,0);
billingKpi.innerHTML = [
  {label:'이번 달 매출',val:'₩'+totalRev.toLocaleString(),cl:'green'},{label:'미납',val:'₩1,280,000',cl:'red'},
  {label:'납부 완료',val:'10건',cl:'teal'},{label:'청구 예정',val:'2건',cl:'amber'},
].map(k=>`<div class="kpi-card ${k.cl}"><div class="kpi-label">${k.label}</div><div class="kpi-value" style="font-size:18px">${k.val}</div></div>`).join('');

const planPrices = {Basic:390000, Pro:890000, Enterprise:1490000};
const tbody = document.getElementById('billing-tbody');
HOSPITALS.forEach(h=>{
  const paid = Math.random() > 0.15;
  const isOnboarding = h.status === 'onboarding';
  tbody.innerHTML += `<tr>
    <td style="font-weight:500">${h.name}</td>
    <td><span class="badge ${h.plan==='Enterprise'?'badge-purple':h.plan==='Pro'?'badge-blue':'badge-gray'}">${h.plan}</span></td>
    <td style="font-weight:600">₩${planPrices[h.plan].toLocaleString()}</td>
    <td style="font-size:12px;color:var(--gray-500)">${isOnboarding?'-':'2026-05-01'}</td>
    <td>${isOnboarding?'<span class="badge badge-gray">온보딩</span>':paid?'<span class="badge badge-green">납부 완료</span>':'<span class="badge badge-red">미납</span>'}</td>
    <td>${isOnboarding?'-':'<button class="btn" style="font-size:12px;padding:3px 9px">영수증</button>'}</td>
  </tr>`;
});

const unpaid = HOSPITALS.filter(h=>h.status==='active').slice(0,2);
const upEl = document.getElementById('unpaid-list');
upEl.innerHTML = unpaid.map(h=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--gray-100)">
  <div><div style="font-size:13px;font-weight:500;color:var(--gray-900)">${h.name}</div><div style="font-size:12px;color:var(--gray-400)">${h.plan} · D+7</div></div>
  <button class="btn btn-danger" style="font-size:12px;padding:4px 10px">납부 독촉</button>
</div>`).join('');

new Chart(document.getElementById('revenueChart'),{type:'line',
  data:{labels:['1월','2월','3월','4월','5월'],datasets:[{label:'매출',data:[5200000,6100000,6800000,7500000,totalRev],borderColor:'#0D9488',backgroundColor:'rgba(13,148,136,.08)',fill:true,tension:.4,pointBackgroundColor:'#0D9488',pointRadius:4}]},
  options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{font:{size:10},color:'#9CA3AF'}},y:{grid:{color:'#F3F4F6'},ticks:{font:{size:10},color:'#9CA3AF',callback:v=>'₩'+(v/10000).toFixed(0)+'만'}}}}
});
