
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
HOSPITALS.forEach(h=>{
  tbody.innerHTML+=`<tr>
    <td style="font-weight:500">${h.name}</td>
    <td>${h.visitors.toLocaleString()}</td>
    <td>${h.inq}건</td>
    <td style="font-weight:600;color:${h.conv>30?'var(--green)':'var(--gray-700)'}">${h.conv}%</td>
    <td>${h.aeo}회</td>
    <td style="color:${h.line>85?'var(--green)':'var(--gray-700)'}">${h.line}%</td>
    <td style="font-weight:600">₩${h.revenue.toLocaleString()}</td>
    <td><button class="btn" style="font-size:12px;padding:3px 9px" onclick="alert('${h.name} 리포트 생성')">PDF</button></td>
  </tr>`;
});
