
const HOSPITALS=[
  {name:'올래성형외과',   visitors:1847,inq:23,conv:34,aeo:19,line:94,revenue:890000},
  {name:'강남뷰티클리닉', visitors:1320,inq:18,conv:28,aeo:12,line:88,revenue:890000},
  {name:'청담미래성형외과',visitors:2140,inq:31,conv:41,aeo:24,line:91,revenue:1490000},
  {name:'압구정원성형외과',visitors:780, inq:9, conv:22,aeo:7, line:79,revenue:390000},
  {name:'신사라인성형외과',visitors:1120,inq:14,conv:31,aeo:11,line:85,revenue:890000},
  {name:'도곡세라성형외과',visitors:950, inq:11,conv:27,aeo:9, line:82,revenue:890000},
  {name:'반포미성형외과',  visitors:620, inq:7, conv:19,aeo:5, line:76,revenue:390000},
  {name:'논현더플러스',    visitors:1050,inq:16,conv:33,aeo:14,line:87,revenue:890000},
  {name:'역삼유나이티드',  visitors:480, inq:5, conv:17,aeo:4, line:71,revenue:390000},
];

const rKpi = document.getElementById('report-kpi');
rKpi.innerHTML = [
  {label:'전체 방문자',val:HOSPITALS.reduce((s,h)=>s+h.visitors,0).toLocaleString(),cl:'blue'},
  {label:'전체 문의',val:HOSPITALS.reduce((s,h)=>s+h.inq,0)+'건',cl:'teal'},
  {label:'평균 전환율',val:Math.round(HOSPITALS.reduce((s,h)=>s+h.conv,0)/HOSPITALS.length)+'%',cl:'green'},
  {label:'총 매출',val:'₩'+HOSPITALS.reduce((s,h)=>s+h.revenue,0).toLocaleString(),cl:'purple'},
].map(k=>`<div class="kpi-card ${k.cl}"><div class="kpi-label">${k.label}</div><div class="kpi-value" style="font-size:20px">${k.val}</div></div>`).join('');

new Chart(document.getElementById('visitorChart'),{type:'bar',
  data:{labels:HOSPITALS.map(h=>h.name.slice(0,4)),datasets:[{label:'방문자',data:HOSPITALS.map(h=>h.visitors),backgroundColor:'#3B82F6',borderRadius:4}]},
  options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{font:{size:9}}},y:{grid:{color:'#F3F4F6'},ticks:{font:{size:9}}}}}
});
new Chart(document.getElementById('revenueChart'),{type:'doughnut',
  data:{labels:HOSPITALS.map(h=>h.name.slice(0,4)),datasets:[{data:HOSPITALS.map(h=>h.revenue),backgroundColor:['#0D9488','#2563EB','#6D28D9','#D97706','#059669','#EA580C','#DC2626','#7C3AED','#0891B2'],borderWidth:2,borderColor:'#fff'}]},
  options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{font:{size:9},boxWidth:10}}},cutout:'50%'}
});

const tbody = document.getElementById('report-tbody');
HOSPITALS.forEach((h, i)=>{
  tbody.innerHTML+=`<tr>
    <td style="font-weight:500">${h.name}</td>
    <td>${h.visitors.toLocaleString()}</td>
    <td>${h.inq}건</td>
    <td style="font-weight:600;color:${h.conv>30?'var(--green)':'var(--gray-700)'}">${h.conv}%</td>
    <td>${h.aeo}회</td>
    <td style="color:${h.line>85?'var(--green)':'var(--gray-700)'}">${h.line}%</td>
    <td style="font-weight:600">₩${h.revenue.toLocaleString()}</td>
    <td><button class="btn" style="font-size:12px;padding:3px 9px" onclick="printHospitalReport(${i})">PDF</button></td>
  </tr>`;
});

function showToast(msg,type){const e=document.getElementById('__toast');if(e)e.remove();const bg=type==='success'?'#059669':type==='error'?'#DC2626':'#0F1E3C';const t=document.createElement('div');t.id='__toast';t.style.cssText=`position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:${bg};color:#fff;padding:11px 22px;border-radius:10px;font-size:13px;font-weight:500;box-shadow:0 4px 20px rgba(0,0,0,.2);z-index:9999;white-space:nowrap`;t.textContent=msg;document.body.appendChild(t);setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(()=>t.remove(),300);},2500);}

function printAllReports() {
  const month = document.querySelector('select').value || '2026년 5월';
  const w = window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>통합 리포트 — ${month}</title>
  <style>body{font-family:sans-serif;padding:40px;color:#111;max-width:900px;margin:0 auto}h1{font-size:20px;color:#0D1B3E;margin-bottom:4px}h2{font-size:13px;color:#6B7280;font-weight:400;margin-bottom:28px}table{width:100%;border-collapse:collapse;font-size:13px}th{background:#F9FAFB;padding:8px 12px;border-bottom:2px solid #E5E7EB;text-align:left;font-size:11px;text-transform:uppercase;color:#6B7280}td{padding:10px 12px;border-bottom:1px solid #E5E7EB}.good{color:#059669;font-weight:600}footer{margin-top:40px;font-size:11px;color:#9CA3AF;text-align:center}@media print{button{display:none}}</style>
  </head><body>
  <h1>📊 병원별 종합 성과 리포트</h1>
  <h2>MEDIFLOW 플랫폼 · ${month}</h2>
  <table><thead><tr><th>병원명</th><th>방문자</th><th>문의</th><th>전환율</th><th>AEO</th><th>LINE</th><th>매출</th></tr></thead><tbody>
  ${HOSPITALS.map(h=>`<tr>
    <td style="font-weight:500">${h.name}</td>
    <td>${h.visitors.toLocaleString()}</td>
    <td>${h.inq}건</td>
    <td class="${h.conv>30?'good':''}">${h.conv}%</td>
    <td>${h.aeo}회</td>
    <td class="${h.line>85?'good':''}">${h.line}%</td>
    <td style="font-weight:600">₩${h.revenue.toLocaleString()}</td>
  </tr>`).join('')}
  </tbody></table>
  <footer>생성일: ${new Date().toLocaleDateString('ko-KR')} | MEDIFLOW 글로벌 메디컬 플로우</footer>
  <script>window.onload=()=>window.print()<\/script>
  </body></html>`);
  w.document.close();
}

function printHospitalReport(idx) {
  const h = HOSPITALS[idx];
  const month = document.querySelector('select').value || '2026년 5월';
  const w = window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>리포트 — ${h.name}</title>
  <style>body{font-family:sans-serif;padding:50px;color:#111;max-width:600px;margin:0 auto}h1{font-size:20px;color:#0D1B3E;margin-bottom:4px}h2{font-size:13px;color:#6B7280;font-weight:400;margin-bottom:28px}.row{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #E5E7EB;font-size:13px}.row-label{color:#6B7280}.row-val{font-weight:600;color:#111}.good{color:#059669}.stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px}.stat{background:#F9FAFB;border-radius:8px;padding:14px 16px}.stat-val{font-size:22px;font-weight:700;color:#0D1B3E;margin-bottom:2px}.stat-lbl{font-size:11px;color:#6B7280}footer{margin-top:40px;font-size:11px;color:#9CA3AF;text-align:center}@media print{button{display:none}}</style>
  </head><body>
  <h1>📋 ${h.name} 성과 리포트</h1>
  <h2>MEDIFLOW · ${month}</h2>
  <div class="stat-grid">
    <div class="stat"><div class="stat-val">${h.visitors.toLocaleString()}</div><div class="stat-lbl">방문자</div></div>
    <div class="stat"><div class="stat-val">${h.inq}건</div><div class="stat-lbl">문의</div></div>
    <div class="stat"><div class="stat-val ${h.conv>30?'good':''}">${h.conv}%</div><div class="stat-lbl">전환율</div></div>
    <div class="stat"><div class="stat-val">₩${(h.revenue/10000).toFixed(0)}만</div><div class="stat-lbl">매출</div></div>
  </div>
  <div class="row"><span class="row-label">AEO 인용</span><span class="row-val">${h.aeo}회</span></div>
  <div class="row"><span class="row-label">LINE 해결률</span><span class="row-val ${h.line>85?'good':''}">${h.line}%</span></div>
  <div class="row"><span class="row-label">월 매출</span><span class="row-val">₩${h.revenue.toLocaleString()}</span></div>
  <footer>생성일: ${new Date().toLocaleDateString('ko-KR')} | MEDIFLOW 글로벌 메디컬 플로우</footer>
  <script>window.onload=()=>window.print()<\/script>
  </body></html>`);
  w.document.close();
}
