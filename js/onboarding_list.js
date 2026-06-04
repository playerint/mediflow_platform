
const HOSPITALS = [
  {id:1, name:'올래성형외과',   nameJa:'オーレ整形外科',    url:'jp.oleps.co.kr',       plan:'Pro',       status:'active',    inq:23,expire:'2026-11-30',manager:'김운영',compliance:1,visitors:1847,revenue:890000, aeo:19,lineRate:94,conv:34},
  {id:2, name:'강남뷰티클리닉', nameJa:'カンナムビューティ', url:'jp.kannambeauty.co.kr',plan:'Pro',       status:'active',    inq:18,expire:'2026-09-15',manager:'이수진',compliance:0,visitors:1320,revenue:890000, aeo:12,lineRate:88,conv:28},
  {id:3, name:'청담미래성형외과',nameJa:'チョンダムミレ',    url:'jp.miraeclinic.co.kr', plan:'Enterprise',status:'active',    inq:31,expire:'2027-03-20',manager:'김운영',compliance:2,visitors:2140,revenue:1490000,aeo:24,lineRate:91,conv:41},
  {id:4, name:'압구정원성형외과',nameJa:'アックジョンウォン',url:'jp.wonclinic.co.kr',   plan:'Basic',     status:'active',    inq:9, expire:'2026-06-30',manager:'이수진',compliance:0,visitors:780, revenue:390000, aeo:7, lineRate:79,conv:22},
  {id:5, name:'신사라인성형외과',nameJa:'シンサライン',       url:'jp.sinsa-line.co.kr',  plan:'Pro',       status:'active',    inq:14,expire:'2026-12-10',manager:'김운영',compliance:1,visitors:1120,revenue:890000, aeo:11,lineRate:85,conv:31},
  {id:6, name:'도곡세라성형외과',nameJa:'ドゴクセラ',         url:'jp.sera-ps.co.kr',     plan:'Pro',       status:'active',    inq:11,expire:'2026-08-25',manager:'이수진',compliance:0,visitors:950, revenue:890000, aeo:9, lineRate:82,conv:27},
  {id:7, name:'반포미성형외과',  nameJa:'バンポミ',           url:'jp.banpomi.co.kr',     plan:'Basic',     status:'active',    inq:7, expire:'2026-07-14',manager:'김운영',compliance:0,visitors:620, revenue:390000, aeo:5, lineRate:76,conv:19},
  {id:8, name:'논현더플러스',    nameJa:'ノンヒョンザプラス', url:'jp.theplus-ps.co.kr',  plan:'Pro',       status:'active',    inq:16,expire:'2027-01-08',manager:'이수진',compliance:0,visitors:1050,revenue:890000, aeo:14,lineRate:87,conv:33},
  {id:9, name:'역삼유나이티드',  nameJa:'ヨクサムユナイテッド',url:'jp.united-ps.co.kr',  plan:'Basic',     status:'active',    inq:5, expire:'2026-06-05',manager:'김운영',compliance:0,visitors:480, revenue:390000, aeo:4, lineRate:71,conv:17},
  {id:10,name:'이수프리마',      nameJa:'イスプリマ',        url:'(온보딩 중)',           plan:'Pro',       status:'onboarding',inq:0, expire:'-',          manager:'김운영',compliance:0,visitors:0,   revenue:0,      aeo:0, lineRate:0, conv:0},
  {id:11,name:'사당뷰성형외과',  nameJa:'サダンビュー',      url:'(온보딩 중)',           plan:'Enterprise',status:'onboarding',inq:0, expire:'-',          manager:'이수진',compliance:0,visitors:0,   revenue:0,      aeo:0, lineRate:0, conv:0},
  {id:12,name:'방배탑성형외과',  nameJa:'バンベタップ',      url:'(온보딩 중)',           plan:'Basic',     status:'onboarding',inq:0, expire:'-',          manager:'김운영',compliance:0,visitors:0,   revenue:0,      aeo:0, lineRate:0, conv:0},
];

const OB_STEPS = ['자동 분석','전략 산출','디자인','자산','카피 검수','컴플라이언스','퍼널 연결','SEO·AEO','미리보기·게시'];
const OB_DETAILS = [
  {id:10, step:2, started:'5/19', days:2},
  {id:11, step:5, started:'5/15', days:6},
  {id:12, step:7, started:'5/10', days:11},
];
const DONE_HOSPITALS = [
  {name:'올래성형외과',    completed:'5/10', days:4},
  {name:'강남뷰티클리닉',  completed:'4/28', days:5},
  {name:'청담미래성형외과', completed:'4/15', days:3},
  {name:'압구정원성형외과', completed:'3/30', days:6},
  {name:'신사라인성형외과', completed:'3/12', days:4},
  {name:'도곡세라성형외과', completed:'2/20', days:5},
  {name:'반포미성형외과',  completed:'2/05', days:3},
  {name:'논현더플러스',    completed:'1/18', days:4},
  {name:'역삼유나이티드',  completed:'12/30', days:6},
];

// KPI
const obKpi = document.getElementById('ob-kpi');
obKpi.innerHTML = [
  {label:'진행 중',val:'3건',color:'amber'},{label:'완료',val:'9건',color:'green'},
  {label:'평균 소요일',val:'4.2일',color:'teal'},{label:'이번 달 완료',val:'2건',color:'blue'},
].map(k=>`<div style="background:#fff;border:1px solid var(--gray-200);border-radius:var(--r);padding:12px 16px;border-left:3px solid var(--${k.color})">
  <div style="font-size:12px;color:var(--gray-400);margin-bottom:4px">${k.label}</div>
  <div style="font-size:22px;font-weight:700;color:var(--navy)">${k.val}</div>
</div>`).join('');

// 진행 중
const obActive = document.getElementById('ob-active');
OB_DETAILS.forEach(ob => {
  const h = HOSPITALS.find(x=>x.id===ob.id);
  const pct = Math.round(ob.step/9*100);
  obActive.innerHTML += `<div class="card fade" style="margin-bottom:10px;cursor:pointer" onclick="location.href='onboarding_detail.html?id=${ob.id}'">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <div><div style="font-size:13px;font-weight:600;color:var(--navy)">${h.name}</div><div style="font-size:12px;color:var(--gray-400)">${h.nameJa} · ${h.plan} · ${h.manager}</div></div>
      <span class="badge badge-amber">진행 중</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
      <div style="flex:1;height:6px;background:var(--gray-100);border-radius:3px;overflow:hidden"><div style="height:100%;background:var(--teal);width:${pct}%"></div></div>
      <span style="font-size:12px;color:var(--gray-400)">${pct}%</span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(9,1fr);gap:3px">
      ${OB_STEPS.map((s,i)=>`<div style="text-align:center">
        <div style="width:20px;height:20px;border-radius:50%;background:${i<ob.step?'var(--teal)':i===ob.step-1?'var(--teal)':'var(--gray-200)'};color:${i<ob.step?'#fff':'#9CA3AF'};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600;margin:0 auto">${i+1}</div>
      </div>`).join('')}
    </div>
    <div style="font-size:10px;color:var(--gray-500);margin-top:4px">STEP ${ob.step}/9 · ${OB_STEPS[ob.step-1]}</div>
    <div style="display:flex;justify-content:space-between;margin-top:10px">
      <span style="font-size:12px;color:var(--gray-400)">시작: ${ob.started} · ${ob.days}일 경과</span>
      <button class="btn btn-primary" style="font-size:12px;padding:4px 12px" onclick="event.stopPropagation();location.href='onboarding_detail.html?id=${ob.id}'">이어서 진행 →</button>
    </div>
  </div>`;
});

// 완료
const obDone = document.getElementById('ob-done');
DONE_HOSPITALS.forEach(h => {
  obDone.innerHTML += `<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:#fff;border:1px solid var(--gray-200);border-radius:var(--r);margin-bottom:6px">
    <div style="flex:1"><div style="font-size:13px;font-weight:500;color:var(--gray-900)">${h.name}</div><div style="font-size:12px;color:var(--gray-400)">완료일: ${h.completed} · ${h.days}일 소요</div></div>
    <span class="badge badge-green">완료</span>
  </div>`;
});
