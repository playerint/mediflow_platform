
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
    <td>${isOnboarding?'-':`<button class="btn" style="font-size:12px;padding:3px 9px" onclick="printReceipt('${h.name}','${h.plan}')">영수증</button>`}</td>
  </tr>`;
});

const unpaid = HOSPITALS.filter(h=>h.status==='active').slice(0,2);
const upEl = document.getElementById('unpaid-list');
upEl.innerHTML = unpaid.map(h=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--gray-100)">
  <div><div style="font-size:13px;font-weight:500;color:var(--gray-900)">${h.name}</div><div style="font-size:12px;color:var(--gray-400)">${h.plan} · D+7</div></div>
  <button class="btn btn-danger" style="font-size:12px;padding:4px 10px" onclick="sendPaymentReminder('${h.name}')">납부 독촉</button>
</div>`).join('');

new Chart(document.getElementById('revenueChart'),{type:'line',
  data:{labels:['1월','2월','3월','4월','5월'],datasets:[{label:'매출',data:[5200000,6100000,6800000,7500000,totalRev],borderColor:'#0D9488',backgroundColor:'rgba(13,148,136,.08)',fill:true,tension:.4,pointBackgroundColor:'#0D9488',pointRadius:4}]},
  options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{font:{size:10},color:'#9CA3AF'}},y:{grid:{color:'#F3F4F6'},ticks:{font:{size:10},color:'#9CA3AF',callback:v=>'₩'+(v/10000).toFixed(0)+'만'}}}}
});

/* ── 유틸 ── */
function showToast(msg, type) {
  const e = document.getElementById('__toast'); if(e) e.remove();
  const bg = type==='success'?'#059669':type==='error'?'#DC2626':'#0F1E3C';
  const t = document.createElement('div');
  t.id='__toast'; t.style.cssText=`position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:${bg};color:#fff;padding:11px 22px;border-radius:10px;font-size:13px;font-weight:500;box-shadow:0 4px 20px rgba(0,0,0,.2);z-index:9999;white-space:nowrap`;
  t.textContent=msg; document.body.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(()=>t.remove(),300);},2500);
}
function exportCsv(headers, rows, filename) {
  const content = [headers, ...rows].map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob(['﻿'+content], {type:'text/csv;charset=utf-8'});
  const url = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href=url; a.download=filename; a.click(); URL.revokeObjectURL(url);
}

/* ── 정산 리포트 CSV ── */
function exportBillingCsv() {
  const month = document.querySelector('select').value || '2026년 5월';
  const headers = ['병원명', '플랜', '월 금액', '청구일', '납부 상태'];
  const rows = HOSPITALS.map(h => [
    h.name, h.plan,
    '₩' + planPrices[h.plan].toLocaleString(),
    h.status==='onboarding' ? '-' : '2026-05-01',
    h.status==='onboarding' ? '온보딩' : '납부 완료'
  ]);
  exportCsv(headers, rows, `정산리포트_${month.replace(/ /g,'')}.csv`);
  showToast('정산 리포트 CSV가 다운로드되었습니다.', 'success');
}

/* ── 영수증 프린트 ── */
function printReceipt(name, plan) {
  const price = planPrices[plan];
  const today = new Date().toLocaleDateString('ko-KR');
  const w = window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>영수증 — ${name}</title>
  <style>body{font-family:sans-serif;padding:50px;max-width:400px;margin:0 auto;color:#111}h1{font-size:18px;text-align:center;margin-bottom:4px}.sub{text-align:center;font-size:12px;color:#6B7280;margin-bottom:28px}.divider{border:none;border-top:2px solid #111;margin:12px 0}.row{display:flex;justify-content:space-between;padding:7px 0;font-size:13px;border-bottom:1px solid #E5E7EB}.row.total{font-weight:700;font-size:15px;border-top:2px solid #111;border-bottom:none;margin-top:4px}footer{text-align:center;margin-top:32px;font-size:11px;color:#9CA3AF}@media print{button{display:none}}</style>
  </head><body>
  <h1>영 수 증</h1>
  <div class="sub">MEDIFLOW 글로벌 메디컬 플로우</div>
  <div class="row"><span>병원명</span><span>${name}</span></div>
  <div class="row"><span>구독 플랜</span><span>${plan}</span></div>
  <div class="row"><span>청구 기간</span><span>2026년 5월</span></div>
  <div class="row"><span>청구일</span><span>${today}</span></div>
  <div class="row"><span>서비스 금액</span><span>₩${price.toLocaleString()}</span></div>
  <div class="row"><span>부가세 (10%)</span><span>₩${Math.round(price*0.1).toLocaleString()}</span></div>
  <div class="row total"><span>합계</span><span>₩${Math.round(price*1.1).toLocaleString()}</span></div>
  <footer>본 영수증은 MEDIFLOW 플랫폼 서비스 이용 영수증입니다.</footer>
  <script>window.onload=()=>window.print()<\/script>
  </body></html>`);
  w.document.close();
}

/* ── 납부 독촉 ── */
function sendPaymentReminder(name) {
  if (!confirm(`"${name}"에 납부 독촉 메시지를 발송하시겠습니까?`)) return;
  showToast(`${name}에 납부 독촉 메시지가 발송되었습니다.`, 'success');
}
