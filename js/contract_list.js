
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
].map(k=>`<div style="background:#fff;border:1px solid var(--gray-200);border-radius:var(--r);padding:12px 16px">
  <div style="font-size:12px;color:var(--gray-400);margin-bottom:4px">${k.label}</div>
  <div style="font-size:22px;font-weight:700;color:var(--navy)">${k.val}</div>
</div>`).join('');

const planPrices = {Basic:390000, Pro:890000, Enterprise:1490000};
const planCls    = {Basic:'badge-gray', Pro:'badge-blue', Enterprise:'badge-purple'};
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
    <td><button class="btn" style="font-size:12px;padding:4px 10px" onclick="openContractDetail(${h.id})">상세</button></td>
  </tr>`;
});

/* ── 공통 유틸 ── */
function showToast(msg, type) {
  const e = document.getElementById('__toast'); if (e) e.remove();
  const bg = type==='success'?'#059669':type==='error'?'#DC2626':'#0F1E3C';
  const t = document.createElement('div');
  t.id='__toast'; t.style.cssText=`position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:${bg};color:#fff;padding:11px 22px;border-radius:10px;font-size:13px;font-weight:500;box-shadow:0 4px 20px rgba(0,0,0,.2);z-index:9999;white-space:nowrap`;
  t.textContent=msg; document.body.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(()=>t.remove(),300);},2500);
}
function closeModal(id='__modal') { const m=document.getElementById(id); if(m) m.remove(); }
function makeModal(id, content) {
  closeModal(id);
  const m = document.createElement('div');
  m.id = id;
  m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9000;display:flex;align-items:center;justify-content:center;padding:20px';
  m.innerHTML = `<div style="background:#fff;border-radius:16px;width:100%;max-width:520px;box-shadow:0 20px 60px rgba(0,0,0,.2);overflow:hidden">${content}</div>`;
  m.addEventListener('click', e=>{ if(e.target===m) closeModal(id); });
  document.body.appendChild(m);
}

/* ── 계약 등록 모달 ── */
function openContractRegister() {
  const today = new Date().toISOString().slice(0,10);
  const hospitalOptions = HOSPITALS.map(h=>`<option value="${h.id}">${h.name} (${h.nameJa})</option>`).join('');
  makeModal('__contract-reg', `
    <div style="padding:22px 26px;border-bottom:1px solid var(--gray-100)">
      <div style="font-size:16px;font-weight:700;color:var(--navy)">📄 신규 계약 등록</div>
    </div>
    <div style="padding:22px 26px;display:flex;flex-direction:column;gap:14px">
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--gray-600);margin-bottom:5px">병원 선택 <span style="color:var(--red)">*</span></div>
        <select id="cr-hospital" style="width:100%;padding:8px 12px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:13px;font-family:inherit">
          <option value="">병원을 선택하세요</option>${hospitalOptions}
        </select>
      </div>
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--gray-600);margin-bottom:5px">구독 플랜 <span style="color:var(--red)">*</span></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
          ${['Basic','Pro','Enterprise'].map(p=>`
            <div class="cr-plan-card" data-plan="${p}" onclick="selectCrPlan('${p}')"
              style="border:2px solid var(--gray-200);border-radius:8px;padding:10px;cursor:pointer;text-align:center;transition:all .15s">
              <div style="font-size:13px;font-weight:600">${p}</div>
              <div style="font-size:12px;color:var(--teal);font-weight:600">₩${planPrices[p].toLocaleString()}</div>
              <div style="font-size:10px;color:var(--gray-400)">/월</div>
            </div>`).join('')}
        </div>
        <input type="hidden" id="cr-plan" value="Pro">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <div style="font-size:12px;font-weight:600;color:var(--gray-600);margin-bottom:5px">계약 시작일</div>
          <input type="date" id="cr-start" value="${today}" style="width:100%;padding:8px 12px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:13px;font-family:inherit;box-sizing:border-box">
        </div>
        <div>
          <div style="font-size:12px;font-weight:600;color:var(--gray-600);margin-bottom:5px">계약 기간</div>
          <select id="cr-period" style="width:100%;padding:8px 12px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:13px;font-family:inherit">
            <option value="1">1년</option><option value="2">2년</option><option value="3">3년</option>
          </select>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <div style="font-size:12px;font-weight:600;color:var(--gray-600);margin-bottom:5px">결제 방법</div>
          <select id="cr-pay" style="width:100%;padding:8px 12px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:13px;font-family:inherit">
            <option>자동이체 (신한은행)</option><option>자동이체 (국민은행)</option><option>카드 결제</option><option>세금계산서</option>
          </select>
        </div>
        <div>
          <div style="font-size:12px;font-weight:600;color:var(--gray-600);margin-bottom:5px">담당 매니저</div>
          <select id="cr-manager" style="width:100%;padding:8px 12px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:13px;font-family:inherit">
            <option>김운영</option><option>이수진</option>
          </select>
        </div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--gray-50);border-radius:8px">
        <span style="font-size:13px;color:var(--gray-700)">자동 갱신</span>
        <label class="toggle-wrap" style="width:36px;height:20px"><input type="checkbox" id="cr-renew" checked><div class="toggle-track"></div><div class="toggle-thumb" style="width:14px;height:14px;top:3px;left:3px"></div></label>
      </div>
    </div>
    <div style="padding:16px 26px;background:var(--gray-50);display:flex;gap:8px;justify-content:flex-end">
      <button class="btn" onclick="closeModal('__contract-reg')">취소</button>
      <button class="btn btn-primary" onclick="submitContractRegister()">등록</button>
    </div>
  `);
  // 기본 Pro 선택 표시
  setTimeout(()=>selectCrPlan('Pro'), 0);
}

function selectCrPlan(plan) {
  document.getElementById('cr-plan').value = plan;
  document.querySelectorAll('.cr-plan-card').forEach(c=>{
    const sel = c.dataset.plan === plan;
    c.style.borderColor = sel ? 'var(--teal)' : 'var(--gray-200)';
    c.style.background  = sel ? 'rgba(13,148,136,.05)' : '#fff';
  });
}

function submitContractRegister() {
  const hospId  = document.getElementById('cr-hospital').value;
  const plan    = document.getElementById('cr-plan').value;
  const start   = document.getElementById('cr-start').value;
  const period  = parseInt(document.getElementById('cr-period').value);
  if (!hospId) { showToast('병원을 선택해주세요.', 'error'); return; }
  if (!plan)   { showToast('플랜을 선택해주세요.', 'error'); return; }

  const hosp   = HOSPITALS.find(h=>h.id===parseInt(hospId));
  const expire = new Date(start);
  expire.setFullYear(expire.getFullYear() + period);
  hosp.plan    = plan;
  hosp.expire  = expire.toISOString().slice(0,10);
  hosp.status  = 'active';

  closeModal('__contract-reg');
  showToast(`✓ ${hosp.name} 계약이 등록되었습니다.`, 'success');

  // 테이블 행 업데이트
  setTimeout(()=>location.reload(), 1500);
}

/* ── 계약 상세 모달 ── */
function openContractDetail(id) {
  const h = HOSPITALS.find(x=>x.id===id);
  if (!h) return;
  const days = h.expire!=='-' ? Math.round((new Date(h.expire)-new Date())/86400000) : null;
  const expStyle = days && days<30 ? 'color:var(--red);font-weight:600' : 'color:var(--gray-700)';
  const rows = [
    ['병원명', `${h.name} (${h.nameJa})`],
    ['구독 플랜', `<span class="badge ${planCls[h.plan]}">${h.plan}</span>`],
    ['월 이용료', `₩${planPrices[h.plan].toLocaleString()}`],
    ['계약 상태', `<span class="badge ${h.status==='active'?'badge-green':'badge-amber'}">${h.status==='active'?'활성':'온보딩'}</span>`],
    ['계약 만료', `<span style="${expStyle}">${h.expire}${days&&days<30?' (D-'+days+')':''}</span>`],
    ['자동 갱신', '설정됨'],
    ['결제 방법', '자동이체 (신한은행)'],
    ['담당 매니저', h.manager],
  ];
  makeModal('__contract-detail', `
    <div style="padding:22px 26px;border-bottom:1px solid var(--gray-100);display:flex;align-items:center;justify-content:space-between">
      <div style="font-size:16px;font-weight:700;color:var(--navy)">📄 계약 상세</div>
      <button onclick="closeModal('__contract-detail')" style="background:none;border:none;font-size:20px;cursor:pointer;color:var(--gray-400)">✕</button>
    </div>
    <div style="padding:22px 26px">
      ${rows.map(([l,v])=>`<div style="display:flex;padding:9px 0;border-bottom:1px solid var(--gray-100)">
        <div style="width:120px;font-size:12px;color:var(--gray-400);flex-shrink:0;padding-top:2px">${l}</div>
        <div style="font-size:13px;color:var(--gray-700)">${v}</div>
      </div>`).join('')}
    </div>
    <div style="padding:16px 26px;background:var(--gray-50);display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn" onclick="openContractEdit(${h.id})">✏ 수정</button>
      <button class="btn" onclick="printContractDoc(${h.id})">📄 계약서 출력</button>
      <button class="btn btn-danger" style="margin-left:auto" onclick="terminateContract(${h.id})">⛔ 계약 해지</button>
    </div>
  `);
}

/* ── 계약 수정 ── */
function openContractEdit(id) {
  closeModal('__contract-detail');
  const h = HOSPITALS.find(x=>x.id===id);
  makeModal('__contract-edit', `
    <div style="padding:22px 26px;border-bottom:1px solid var(--gray-100)">
      <div style="font-size:16px;font-weight:700;color:var(--navy)">✏ 계약 수정 — ${h.name}</div>
    </div>
    <div style="padding:22px 26px;display:flex;flex-direction:column;gap:14px">
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--gray-600);margin-bottom:5px">플랜</div>
        <select id="ce-plan" style="width:100%;padding:8px 12px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:13px;font-family:inherit">
          ${['Basic','Pro','Enterprise'].map(p=>`<option ${h.plan===p?'selected':''}>${p} — ₩${planPrices[p].toLocaleString()}/월</option>`).join('')}
        </select>
      </div>
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--gray-600);margin-bottom:5px">계약 만료일</div>
        <input type="date" id="ce-expire" value="${h.expire!=='-'?h.expire:''}" style="width:100%;padding:8px 12px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:13px;font-family:inherit;box-sizing:border-box">
      </div>
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--gray-600);margin-bottom:5px">결제 방법</div>
        <select id="ce-pay" style="width:100%;padding:8px 12px;border:1.5px solid var(--gray-200);border-radius:8px;font-size:13px;font-family:inherit">
          <option selected>자동이체 (신한은행)</option><option>자동이체 (국민은행)</option><option>카드 결제</option><option>세금계산서</option>
        </select>
      </div>
    </div>
    <div style="padding:16px 26px;background:var(--gray-50);display:flex;gap:8px;justify-content:flex-end">
      <button class="btn" onclick="closeModal('__contract-edit')">취소</button>
      <button class="btn btn-primary" onclick="saveContractEdit(${h.id})">저장</button>
    </div>
  `);
}

function saveContractEdit(id) {
  const h = HOSPITALS.find(x=>x.id===id);
  h.plan   = document.getElementById('ce-plan').value.split(' ')[0];
  const exp = document.getElementById('ce-expire').value;
  if (exp) h.expire = exp;
  closeModal('__contract-edit');
  showToast('✓ 계약 정보가 수정되었습니다.', 'success');
  setTimeout(()=>location.reload(), 1500);
}

/* ── 계약 해지 ── */
function terminateContract(id) {
  const h = HOSPITALS.find(x=>x.id===id);
  openModal('⚠ 계약 해지', `<strong>${h.name}</strong> 계약을 해지하시겠습니까?<br><span style="font-size:12px;color:#9CA3AF">해지 후에는 서비스 접근이 중단됩니다.</span>`, function() {
    closeModal('__contract-detail');
    showToast(`${h.name} 계약이 해지되었습니다.`, '');
  }, '해지', 'btn-danger');
}

function openModal(title,body,onConfirm,confirmLabel,confirmCls){var e=document.getElementById('__modal');if(e)e.remove();var m=document.createElement('div');m.id='__modal';m.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9000;display:flex;align-items:center;justify-content:center';m.innerHTML='<div style="background:#fff;border-radius:16px;padding:28px 32px;width:100%;max-width:440px;box-shadow:0 20px 60px rgba(0,0,0,.2)"><div style="font-size:15px;font-weight:700;color:#0F1E3C;margin-bottom:10px">'+title+'</div><div style="font-size:13px;color:#374151;line-height:1.7;margin-bottom:20px">'+body+'</div><div style="display:flex;gap:8px;justify-content:flex-end"><button onclick="document.getElementById(\'__modal\').remove()" style="padding:8px 16px;border-radius:8px;border:1px solid #E5E7EB;background:#fff;font-size:13px;font-family:inherit;cursor:pointer">취소</button><button id="__modal-ok" style="padding:8px 16px;border-radius:8px;border:none;font-size:13px;font-family:inherit;cursor:pointer;font-weight:500;'+(confirmCls==='btn-danger'?'background:#DC2626;color:#fff':'background:#0F1E3C;color:#fff')+'">'+(confirmLabel||'확인')+'</button></div></div>';m.addEventListener('click',function(e){if(e.target===m)m.remove();});document.body.appendChild(m);document.getElementById('__modal-ok').addEventListener('click',function(){m.remove();if(typeof onConfirm==='function')onConfirm();});}

/* ── 계약서 출력 ── */
function printContractDoc(id) {
  const h = HOSPITALS.find(x=>x.id===id);
  const w = window.open('','_blank');
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>계약서 — ${h.name}</title>
  <style>body{font-family:sans-serif;padding:50px;color:#111;max-width:700px;margin:0 auto}h1{font-size:22px;text-align:center;margin-bottom:4px}h2{font-size:13px;text-align:center;color:#6B7280;font-weight:400;margin-bottom:36px}table{width:100%;border-collapse:collapse}td{padding:12px 16px;border-bottom:1px solid #E5E7EB;font-size:14px}td:first-child{color:#6B7280;width:160px;font-weight:500}.sig{margin-top:60px;display:flex;justify-content:space-between;font-size:13px;color:#374151}footer{margin-top:40px;text-align:center;font-size:11px;color:#9CA3AF}@media print{button{display:none}}</style>
  </head><body>
  <h1>MEDIFLOW 서비스 이용 계약서</h1>
  <h2>글로벌 메디컬 플로우 플랫폼 서비스 계약</h2>
  <table>
    <tr><td>병원명</td><td>${h.name} (${h.nameJa})</td></tr>
    <tr><td>사이트 URL</td><td>${h.url}</td></tr>
    <tr><td>구독 플랜</td><td>${h.plan} — ₩${planPrices[h.plan].toLocaleString()}/월</td></tr>
    <tr><td>계약 만료일</td><td>${h.expire!=='-'?h.expire:'온보딩 완료 후 자동 설정'}</td></tr>
    <tr><td>자동 갱신</td><td>매년 자동 갱신</td></tr>
    <tr><td>결제 방법</td><td>자동이체 (신한은행)</td></tr>
    <tr><td>담당 매니저</td><td>${h.manager}</td></tr>
    <tr><td>계약일</td><td>${new Date().toLocaleDateString('ko-KR')}</td></tr>
  </table>
  <div class="sig">
    <div>계약자: ${h.name} 대표원장<br><br>서명: ___________________</div>
    <div>서비스 제공자: MEDIFLOW<br><br>서명: ___________________</div>
  </div>
  <footer>본 계약서는 MEDIFLOW 글로벌 메디컬 플로우 플랫폼 서비스 이용에 관한 계약입니다.</footer>
  <script>window.onload=()=>window.print()<\/script>
  </body></html>`);
  w.document.close();
}
